from typing import Dict, List, Optional
from elasticsearch import AsyncElasticsearch
from elasticsearch.exceptions import NotFoundError
import chainlit.data as cl_data
from chainlit.step import StepDict
from literalai.helper import utc_now
import chainlit as cl
from ssl import SSLContext, PROTOCOL_TLS_CLIENT, CERT_REQUIRED

now = utc_now()

# Elasticsearch configuration
ES_HOST_1 = 'https://ai-es01-dev.avrioc.io:9200'
ES_HOST_2 = 'https://ai-es02-dev.avrioc.io:9200'
ES_HOST_3 = 'https://ai-es03-dev.avrioc.io:9200'
ES_CERT_IO_BUNDLE = '/Users/ahmed.soliman/workspace/ahmed/certs/avrioc.iobundle.crt'
ES_OMN_USER = 'ahmed.soliman@avrioc.com'
ES_OMN_PASSWORD = 'SolimanRW$120'
timeout = 60
create_step_counter = 0

# SSL context for Elasticsearch
ssl_context = SSLContext(PROTOCOL_TLS_CLIENT)
ssl_context.verify_mode = CERT_REQUIRED
ssl_context.load_verify_locations(cafile=ES_CERT_IO_BUNDLE)

hosts = [ES_HOST_1, ES_HOST_2, ES_HOST_3]

# Initialize Elasticsearch client
es = AsyncElasticsearch(
    hosts=hosts,
    http_auth=(ES_OMN_USER, ES_OMN_PASSWORD),
    ssl_context=ssl_context,
    request_timeout=timeout
)

# Define index names
THREAD_INDEX = "temp_threads"
STEP_INDEX = "temp_steps"

class ElasticsearchDataLayer(cl_data.BaseDataLayer):
    async def get_user(self, identifier: str):
        # Implement user retrieval if needed
        return cl.PersistedUser(id="test", createdAt=now, identifier=identifier)

    async def create_user(self, user: cl.User):
        # Implement user creation if needed
        return cl.PersistedUser(id="test", createdAt=now, identifier=user.identifier)

    async def update_thread(
        self,
        thread_id: str,
        name: Optional[str] = None,
        user_id: Optional[str] = None,
        metadata: Optional[Dict] = None,
        tags: Optional[List[str]] = None,
    ):
        doc = {"doc": {}}
        if name:
            doc["doc"]["name"] = name
        if metadata:
            doc["doc"]["metadata"] = metadata
        if tags:
            doc["doc"]["tags"] = tags
        
        if doc["doc"]:
            try:
                await es.update(index=THREAD_INDEX, id=thread_id, body=doc)
            except NotFoundError:
                # If thread does not exist, create it
                doc = {
                    "id": thread_id,
                    "name": name,
                    "metadata": metadata,
                    "tags": tags,
                    "createdAt": utc_now(),
                    "userId": user_id,
                    "userIdentifier": "admin",
                    "steps": [],
                }
                await es.index(index=THREAD_INDEX, id=thread_id, document=doc)
        else:
            doc = {
                "id": thread_id,
                "name": name,
                "metadata": metadata,
                "tags": tags,
                "createdAt": utc_now(),
                "userId": user_id,
                "userIdentifier": "admin",
                "steps": [],
            }
            await es.index(index=THREAD_INDEX, id=thread_id, document=doc)

    @cl_data.queue_until_user_message()
    async def create_step(self, step_dict: StepDict):
        global create_step_counter
        create_step_counter += 1

        # Add step to Elasticsearch
        await es.index(index=STEP_INDEX, id=step_dict.get("id"), document=step_dict)

        # Update thread with new step
        try:
            await es.update(
                index=THREAD_INDEX,
                id=step_dict.get("threadId"),
                body={"script": {"source": "ctx._source.steps.add(params.step)", "params": {"step": step_dict}}}
            )
        except NotFoundError:
            # Handle case where thread is not found
            pass

    async def get_thread_author(self, thread_id: str):
        return "admin"

    async def list_threads(
        self, pagination: cl_data.Pagination, filters: cl_data.ThreadFilter
    ) -> cl_data.PaginatedResponse[cl_data.ThreadDict]:
        query = {"query": {"match_all": {}}}

        response = await es.search(index=THREAD_INDEX, body=query)
        threads = [hit["_source"] for hit in response["hits"]["hits"]]
        return cl_data.PaginatedResponse(
            data=threads,
            pageInfo=cl_data.PageInfo(
                hasNextPage=False,
                startCursor=None,
                endCursor=None
            ),
        )

    async def get_thread(self, thread_id: str):
        try:
            response = await es.get(index=THREAD_INDEX, id=thread_id)
            thread = response["_source"]
            thread["steps"] = sorted(thread["steps"], key=lambda x: x["createdAt"])
            return thread
        except NotFoundError:
            return None

    async def delete_thread(self, thread_id: str):
        try:
            await es.delete(index=THREAD_INDEX, id=thread_id)
        except NotFoundError:
            # Handle case where thread is not found
            pass

cl_data._data_layer = ElasticsearchDataLayer()

# Define the Chainlit application logic
async def send_count():
    await cl.Message(f"Create step counter: {create_step_counter}").send()

@cl.on_chat_start
async def main():
    await cl.Message("Hello, send me a message!").send()
    await send_count()

@cl.on_message
async def handle_message():
    await cl.sleep(2)
    await send_count()
    async with cl.Step(type="tool", name="thinking") as step:
        step.output = "Thinking..."
    await cl.Message("Ok!").send()
    await send_count()

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
