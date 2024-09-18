from typing import Dict, List, Optional, Literal
from elasticsearch import AsyncElasticsearch
from elasticsearch.exceptions import NotFoundError
import chainlit.data as cl_data
from chainlit.step import StepDict
from literalai.helper import utc_now
import chainlit as cl
from ssl import SSLContext, PROTOCOL_TLS_CLIENT, CERT_REQUIRED
import logging
now = utc_now()
logger = logging.getLogger(__name__)
from _cred import *

timeout = 60
# SSL context for Elasticsearch
ssl_context = SSLContext(PROTOCOL_TLS_CLIENT)
ssl_context.verify_mode = CERT_REQUIRED
ssl_context.load_verify_locations(cafile=ES_CERT_IO_BUNDLE)

class Feedback:
    forId: str
    value: Literal[0, 1]
    threadId: Optional[str] = None
    id: Optional[str] = None
    comment: Optional[str] = None

# Initialize Elasticsearch client
es = AsyncElasticsearch(
    hosts=ES_HOSTS,
    http_auth=(ES_OMN_USER, ES_OMN_PASSWORD),
    ssl_context=ssl_context,
    request_timeout=timeout
)

# Define index names
INDEX_NAME = "temp_combined"

class ElasticsearchDataLayer(cl_data.BaseDataLayer):    
    async def get_user(self, identifier: str):
        # Implement user retrieval if needed
        return cl.PersistedUser(id="test", createdAt=now, identifier=identifier)

    async def create_user(self, user: cl.User):
        # Implement user creation if needed
        return cl.PersistedUser(id="test", createdAt=now, identifier=user.identifier)
    


    async def upsert_feedback(
            self,
            feedback: cl_data.Feedback,
        ) -> str:
        """
        Upserts feedback into the appropriate step of a thread.
        
        :param feedback: The feedback object to upsert.
        :return: The ID of the updated or created feedback entry.
        """
        # Extract feedback details
        feedback_id = feedback.id or feedback.forId  # Use forId as ID if feedback_id is not provided
        thread_id = feedback.threadId
        step_id = feedback.forId
        feedback_value = feedback.value
        feedback_comment = feedback.comment

        # Prepare the feedback document
        feedback_doc = {
            "value": feedback_value,
            "comment": feedback_comment
        }

        try:
            # Update the specific step within the thread
            response = await es.update(
                index=INDEX_NAME,
                id=thread_id,
                body={
                    "script": {
                        "source": """
                            if (ctx._source.steps != null) {
                                for (step in ctx._source.steps) {
                                    if (step.id == params.step_id) {
                                        if (step.feedbacks == null) {
                                            step.feedbacks = new HashMap();
                                        }
                                        // Ensure feedback ID is unique
                                        step.feedbacks[params.feedback_id] = params.feedback_doc;
                                    }
                                }
                            }
                        """,
                        "params": {
                            "step_id": step_id,
                            "feedback_id": feedback_id,
                            "feedback_doc": feedback_doc
                        }
                    }
                }
            )

            # Return feedback ID or a success message
            return feedback_id or "Feedback successfully updated."

        except Exception as e:
            # Handle errors (e.g., log or re-raise the exception)
            raise RuntimeError(f"Error updating feedback: {e}")


    
    
    async def update_thread(
        self,
        thread_id: str,
        name: Optional[str] = None,
        user_id: Optional[str] = None,
        metadata: Optional[Dict] = None,
        tags: Optional[List[str]] = None,
    ):
        update_doc = {"doc": {}}
        if name:
            update_doc["doc"]["name"] = name
        if metadata:
            update_doc["doc"]["metadata"] = metadata
        if tags:
            update_doc["doc"]["tags"] = tags
        
        if update_doc["doc"]:
            try:
                await es.update(index=INDEX_NAME, id=thread_id, body=update_doc)
            except NotFoundError:
                # If thread does not exist, create it
                await es.index(index=INDEX_NAME, id=thread_id, document={
                    "id": thread_id,
                    "type": "thread",
                    "name": name,
                    "metadata": metadata,
                    "tags": tags,
                    "createdAt": utc_now(),
                    "userId": user_id,
                    "userIdentifier": "admin",
                    "steps": [],  # Initialize steps as an empty list
                })
        else:
            await es.index(index=INDEX_NAME, id=thread_id, document={
                "id": thread_id,
                "type": "thread",
                "name": name,
                "metadata": metadata,
                "tags": tags,
                "createdAt": utc_now(),
                "userId": user_id,
                "userIdentifier": "admin",
                "steps": [],  # Initialize steps as an empty list
            })

    @cl_data.queue_until_user_message()
    async def create_step(self, step_dict: StepDict):
        global create_step_counter
        create_step_counter += 1

        # Extract thread ID and step details
        thread_id = step_dict.get("threadId")
        step = step_dict

        # Ensure the step is stored
        try:
            # Modify disableFeedback to ensure it is set to false
            if step.get("disableFeedback") is None or step.get("disableFeedback") is True:
                step["disableFeedback"] = False
            
            # If the step is the first one, it should be used to set or update the thread's name
            if step.get("name") and step.get("createdAt"):
                # Fetch the existing thread to update its name
                thread = await self.get_thread(thread_id)
                if thread:
                    # Check if the thread name is empty and update it
                    if not thread.get("name"):
                        await self.update_thread(
                            thread_id=thread_id,
                            name=step.get("name")
                        )
                    
                    # Add the step to the thread
                    await es.update(
                        index=INDEX_NAME,
                        id=thread_id,
                        body={
                            "script": {
                                "source": "ctx._source.steps.add(params.step)",
                                "params": {"step": step}
                            }
                        }
                    )
        except NotFoundError:
            # Handle case where thread is not found
            pass


    
    async def get_thread_author(self, thread_id: str):
        try:
            result = await es.get(index=INDEX_NAME, id=thread_id)
            thread_author = result['_source'].get('userIdentifier')
            logger.info(f"[ElasticSearch-DataLayer] Got thread author: '{thread_author}'")
            return thread_author
        except NotFoundError:
            return None
        
    async def get_thread(self, thread_id: str):
        try:
            response = await es.get(index=INDEX_NAME, id=thread_id)
            logger.info(f"Elasticsearch response: {response}")

            if "_source" in response:
                thread = response["_source"]

                # Ensure the document type is 'thread'
                if thread.get("type") == "thread":
                    # Sort steps by creation date
                    thread["steps"] = sorted(thread.get("steps", []), key=lambda x: x.get("createdAt", ""))
                    return thread

                logger.warning(f"Document found but type is not 'thread': {thread.get('type')}")
                return None

            logger.error(f"Document with ID {thread_id} not found in response")
            return None
        except NotFoundError:
            logger.error(f"Thread with ID {thread_id} not found")
            return None
        except Exception as e:
            logger.error(f"Error fetching thread with ID {thread_id}: {e}")
            return None

    async def list_threads(
        self, pagination: cl_data.Pagination, filters: cl_data.ThreadFilter
    ) -> cl_data.PaginatedResponse[cl_data.ThreadDict]:
        query = {"query": {"term": {"type": "thread"}}}

        response = await es.search(index=INDEX_NAME, body=query)
        threads = [hit["_source"] for hit in response["hits"]["hits"]]
        return cl_data.PaginatedResponse(
            data=threads,
            pageInfo=cl_data.PageInfo(
                hasNextPage=False,
                startCursor=None,
                endCursor=None
            ),
        )

    async def delete_thread(self, thread_id: str):
        try:
            await es.delete(index=INDEX_NAME, id=thread_id)
        except NotFoundError:
            # Handle case where thread is not found
            pass


