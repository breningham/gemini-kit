# hello_project/greetings.py

def hello():
    """
    Prints a friendly greeting message to the console.
    This is a basic function that simply outputs a fixed greeting.
    """
    print("Hello from the hello function!")

def hello_name(name="World"):
    """
    Prints a personalized greeting message.

    Args:
        name (str, optional): The name to include in the greeting.
                              Defaults to "World" if no name is provided.
    """
    print(f"Hello, {name}!")