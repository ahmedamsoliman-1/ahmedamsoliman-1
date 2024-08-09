import bcrypt
from typing import Dict, List, Any, Optional, TypedDict
from datetime import datetime
from elasticsearch.exceptions import NotFoundError, ConflictError
from elasticsearch import AsyncElasticsearch
from ssl import SSLContext, PROTOCOL_TLS_CLIENT, CERT_REQUIRED
from pydantic import BaseModel
from _cred import *
import chainlit as cl
import chainlit.data as cl_data
from utils import StreamLogger
stream_logger = StreamLogger()

pwd_context = bcrypt



class StepDict(TypedDict):
    id: str
    name: str
    createdAt: Optional[str]
    type: str
    output: Optional[str]
    threadId: str
    userId: str  # Added userId field
# Create an SSL context
ssl_context = SSLContext(PROTOCOL_TLS_CLIENT)
ssl_context.verify_mode = CERT_REQUIRED
ssl_context.load_verify_locations(cafile=bundle)

# Elasticsearch client configuration
es = AsyncElasticsearch(
    hosts=[host_1, host_2, host_3],
    http_auth=(es_user, es_password),
    ssl_context=ssl_context,
    request_timeout=60
)


class Pagination(BaseModel):
    limit: int
    offset: int

class Filters(BaseModel):
    # Define known filter fields
    name: Optional[str] = None
    user_id: Optional[str] = None

class ElasticsearchDataLayer(cl_data.BaseDataLayer):
    index_user = "aams_users"
    index_thread = "aams_threads"
    index_step = "aams_steps"

    async def get_user(self, identifier: str) -> Optional[cl.PersistedUser]:
        try:
            result = await es.get(index=self.index_user, id=identifier)
            user = result['_source']
            return cl.PersistedUser(
                id=identifier,
                createdAt='',  # Assuming you don't have this field in the response
                identifier=user.get('username', '')  # Using 'username' from _source as identifier
            )
        except NotFoundError:
            print(f"User with identifier {identifier} not found.")
            return None
        except Exception as e:
            print(f"An error occurred: {e}")
            return None

    async def create_user(self, user: cl.User):
        doc = {
            'identifier': user.identifier,
            'hashed_password': pwd_context.hash(user.password),
            'created_at': datetime.utcnow().isoformat()
        }
        try:
            await es.index(index=self.index_user, id=user.identifier, document=doc)
            return cl.PersistedUser(id=user.identifier, createdAt=datetime.utcnow(), identifier=user.identifier)
        except ConflictError:
            return None

    async def authenticate_user(self, identifier: str, password: str):
        user = await self.get_user(identifier)
        if user and pwd_context.verify(password, user.hashed_password):
            return cl.User(identifier=user.identifier)
        return None

    async def update_thread(
        self,
        thread_id: str,
        name: Optional[str] = None,
        user_id: Optional[str] = None,
        metadata: Optional[Dict] = None,
        tags: Optional[List[str]] = None,
    ):
        doc = {}
        if name:
            doc['name'] = name
        if metadata:
            doc['metadata'] = metadata
        if tags:
            doc['tags'] = tags
        if user_id:
            doc['user_id'] = user_id
        try:
            await es.update(index=self.index_thread, id=thread_id, doc=doc)
        except NotFoundError:
            doc.update({
                'id': thread_id,
                'name': name,
                'user_id': user_id,
                'created_at': datetime.utcnow().isoformat()
            })
            await es.index(index=self.index_thread, id=thread_id, document=doc)

    @cl_data.queue_until_user_message()
    async def create_step(self, step_dict: 'StepDict'):
        doc = {
            'id': step_dict.get("id"),
            'name': step_dict.get("name"),
            'created_at': step_dict.get("createdAt", datetime.utcnow().isoformat()),
            'type': step_dict.get("type"),
            'output': step_dict.get("output"),
            'thread_id': step_dict.get("threadId"),
            'user_id': step_dict.get("userId")  # Ensure that userId is included
        }
        try:
            await es.index(index=self.index_step, id=doc['id'], document=doc)
        except ConflictError:
            pass

    async def get_thread_author(self, thread_id: str):
        try:
            result = await es.get(index=self.index_thread, id=thread_id)
            return result['_source'].get('user_id')
        except NotFoundError:
            return None
        

    async def list_threads(
        self,
        pagination: Optional[Pagination] = None,  # Add pagination parameter
        filters: Optional[Any] = None  # Accept any type but will convert if necessary
    ) -> cl_data.PaginatedResponse[cl_data.ThreadDict]:
        
        # Default query to match all documents
        query = {"match_all": {}}  
        
        if filters:
            # Convert filters to a dictionary if it's a Pydantic model or similar
            if isinstance(filters, BaseModel):
                filters = filters.dict(exclude_unset=True)
            elif not isinstance(filters, dict):
                raise TypeError("Filters should be a dictionary or Pydantic model.")
            
            # Convert filters to Elasticsearch query format
            query = {
                "bool": {
                    "must": [
                        {"match": {key: value}} for key, value in filters.items() if value is not None
                    ]
                }
            }

        # Set pagination parameters if provided
        size = pagination.limit if pagination and hasattr(pagination, 'limit') else 10000  # Default size if pagination is not used
        from_ = pagination.offset if pagination and hasattr(pagination, 'offset') else 0  # Default offset if pagination is not used

        stream_logger.stream_logger.warning("Warning")
        
        result = await es.search(
            index=self.index_thread,
            query=query,
            size=size,
            from_=from_
        )

        threads = result['hits']['hits']

        return cl_data.PaginatedResponse(
            data=[{
                "id": thread['_source']['id'],
                "name": thread['_source']['name'],
                "createdAt": thread['_source']['created_at'],
                "userId": thread['_source'].get('user_id'),
                "steps": []  # Implement steps based on your data model
            } for thread in threads],
            pageInfo=cl_data.PageInfo(
                hasNextPage=len(threads) == size,  # Adjust if needed
                startCursor=None,
                endCursor=None
            ),
        )



    async def save_thread(self, identifier: str, thread_data: dict) -> bool:
        try:
            # Assuming 'thread_data' contains the necessary information for a thread
            await es.index(index='aams_threads', id=identifier, body=thread_data)
            return True
        except Exception as e:
            print(f"An error occurred while saving the thread: {e}")
            return False

    async def save_step(self, identifier: str, step_data: dict) -> bool:
        try:
            # Assuming 'step_data' contains the necessary information for a step
            await es.index(index='aams_steps', id=identifier, body=step_data)
            return True
        except Exception as e:
            print(f"An error occurred while saving the step: {e}")
            return False

    async def get_thread(self, thread_id: str):
        try:
            result = await es.get(index=self.index_thread, id=thread_id)
            thread = result['_source']
            return {
                "id": thread['id'],
                "name": thread['name'],
                "createdAt": thread['created_at'],
                "userId": thread.get('user_id'),
                "steps": []  # You might need to implement this based on how you store steps
            }
        except NotFoundError:
            return None

    async def delete_thread(self, thread_id: str):
        try:
            await es.delete(index=self.index_thread, id=thread_id)
        except NotFoundError:
            pass

    async def list_threads_for_user(self, user_id: str):
        query = {
            "term": {
                "user_id": user_id
            }
        }
        result = await es.search(index=self.index_thread, query=query)
        return [thread['_source'] for thread in result['hits']['hits']]

    async def list_steps_for_user(self, user_id: str):
        query = {
            "term": {
                "user_id": user_id
            }
        }
        result = await es.search(index=self.index_step, query=query)
        return [step['_source'] for step in result['hits']['hits']]