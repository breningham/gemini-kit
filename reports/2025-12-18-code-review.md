# Code Review Report for `gemini-kit`

## 📊 Summary

| Category | Count |
|----------|-------|
| 🔴 Critical | 1 |
| 🟠 High | 0 |
| 🟡 Medium | 2 |
| 🟢 Low | 3 |

**Verdict:** ⚠️ Fix Recommended (Critical Logic Flaw Detected)

## 🔴 CRITICAL (Must Fix)

### Issue 1: Broken Context Propagation in Workflows
- **File:** `src/tools/orchestrator.ts`
- **Function:** `runWorkflow`
- **Problem:** The `runWorkflow` function generates prompts for *all* workflow steps at the moment the workflow is initialized (t=0). This means steps 2, 3, etc., are generated using the *initial* context and will **not** contain the results/context produced by step 1.
- **Impact:** The "Chain of Thought" or "Handoff" between agents is broken. For example, in a `cook` workflow, the `coder` agent's prompt will be generated before the `scout` agent has run, so the `coder` will not know which files to edit.
- **Fix Recommendation:**
  Do not pre-calculate prompts for future steps. `kit_run_workflow` should only return the static plan description. A new mechanism (or tool like `kit_execute_next_step`) is needed to generate the prompt for the *current* step just-in-time, using the latest `session.context`.

## 🟡 MEDIUM (Recommended)

### Issue 1: Race Condition in State Persistence
- **File:** `src/tools/team-state.ts`
- **Function:** `saveSession` / `debouncedSave`
- **Problem:** The session state is saved to a JSON file with a 500ms debounce. If the process terminates unexpectedly (crash, SIGINT) before the timer fires, the last state update is lost. Additionally, there is no file locking, so if multiple tool calls happen in parallel (conceptually), they could overwrite each other's changes to the JSON file.
- **Fix:** Implement a robust write-ahead log or use a proper database (SQLite) if concurrency increases. For now, ensure `process.on('exit')` hooks force a synchronous save, and consider a simple lockfile mechanism.

### Issue 2: Fragile Regex Parsing
- **File:** `src/tools/knowledge.ts`
- **Function:** `kit_index_codebase`
- **Problem:** The tool uses Regular Expressions to detect functions and classes. As noted in the code comments (`TODO [MEDIUM 5]`), this is fragile and will miss complex cases or produce false positives.
- **Fix:** Replace regex parsing with a proper AST parser (like `typescript` compiler API or `tree-sitter`) for reliable code indexing.

## 🟢 LOW (Optional)

### Issue 1: Sanitize Function Approach
- **File:** `src/tools/security.ts`
- **Function:** `sanitize`
- **Problem:** The `sanitize` function removes specific characters (`deny-list` approach). While `safeGit` correctly uses `execFileSync` (which is safe), relying on string sanitization as a fallback is less robust than avoiding shell execution entirely.
- **Fix:** Continue prioritizing `execFileSync` / `execFile` everywhere.

### Issue 2: Hardcoded Timeouts
- **File:** `src/tools/security.ts`
- **Problem:** Timeouts for Git/GitHub operations are hardcoded (30s/60s).
- **Fix:** Allow these to be configured via environment variables or a config file for slower connections/large repos.

### Issue 3: Missing `kit_execute_step` Tool
- **Problem:** The workflow engine has `runWorkflow` (plan) but no obvious tool for an agent to *execute* the next step and get the *next* prompt. The user is expected to manually bridge this gap, which is error-prone given Critical Issue #1.

## Security Audit (OWASP)

| Check | Status | Details |
|-------|--------|---------|
| Injection | ✅ Pass | Uses `execFileSync` to avoid shell injection. |
| Path Traversal | ✅ Pass | `validatePath` in `knowledge.ts` prevents directory escape. |
| DoS | ✅ Pass | `kit_index_codebase` limits file size and uses batching. |
| Secrets | ❓ Manual | No secret scanning detected in code (relies on user). |

## Architecture & Code Quality

- **Modular Design:** The project is well-structured with clear separation of concerns (`tools/`, `agents/`, `workflows/`).
- **Type Safety:** High. TypeScript and Zod schemas are used effectively throughout.
- **Error Handling:** Global try-catch blocks in tool definitions prevent server crashes.
- **Extensibility:** Adding new agents or workflows is data-driven and straightforward.

## Next Steps

1.  **Refactor `orchestrator.ts`:** Change `runWorkflow` to not return pre-filled prompts, or add a `kit_get_step_prompt` tool.
2.  **Harden `team-state.ts`:** Add file locking or atomic writes.
