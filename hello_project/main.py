# hello_project/main.py

# Import the hello and hello_name functions from our greetings module.
# This allows us to use these functions directly in this script.
from greetings import hello, hello_name

if __name__ == "__main__":
    """
    This block ensures that the code inside it only runs when the script
    is executed directly (not when imported as a module).
    It demonstrates how to call the greeting functions.
    """
    print("--- Calling the simple hello function ---")
    # Call the basic hello function which prints a generic greeting.
    hello()

    print("\n--- Calling the personalized hello_name function ---")
    # Call hello_name with a specific name, "Alice".
    hello_name("Alice")
    # Call hello_name without an argument, using its default name "World".
    hello_name()