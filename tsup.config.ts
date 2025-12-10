import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/cli/index.ts'],
    format: ['esm'],
    target: 'node20',
    dts: false, // Disabled temporarily
    sourcemap: true,
    clean: true,
    splitting: false,
    shims: true,
    banner: {
        js: '#!/usr/bin/env node',
    },
});

