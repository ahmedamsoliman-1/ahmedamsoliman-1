from typing import Dict, List, Optional, Literal
import chainlit.data as cl_data
import chainlit as cl
from Layer import ElasticsearchDataLayer

create_step_counter = 0

cl_data._data_layer = ElasticsearchDataLayer()

# Define the Chainlit application logic
async def send_count():
    print(f"Create step counter: {create_step_counter}")

@cl.on_chat_start
async def main():
    await cl.Message("Hello, send me a message!").send()
    await send_count()

@cl.on_message
async def handle_message():
    await cl.sleep(2)
    async with cl.Step(type="tool", name="thinking") as step:
        step.output = "Thinking..."
    await cl.Message("Ok!").send()

@cl.password_auth_callback
def auth_callback(username: str, password: str) -> Optional[cl.User]:
    if (username, password) == ("admin", "admin"):
        return cl.User(identifier="admin")
    else:
        return None

@cl.on_chat_resume
async def on_chat_resume(thread: cl_data.ThreadDict):
    await cl.Message(f"Welcome back to {thread['name']}").send()
    if "metadata" in thread:
        await cl.Message(thread["metadata"], author="metadata", language="json").send()
    if "tags" in thread:
        await cl.Message(thread["tags"], author="tags", language="json").send()
