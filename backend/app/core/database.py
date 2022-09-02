from app.schemas.Todo import TodoModel
from app.core.settings import settings
from motor import motor_asyncio

client = motor_asyncio.AsyncIOMotorClient(settings.mongodb_uri)
database: motor_asyncio.AsyncIOMotorDatabase = client.TodoList
collection: motor_asyncio.AsyncIOMotorCollection = database.todo


async def fetch_one_todo(id: str):
    document = await collection.find_one({"_id": id})
    return document


async def fetch_all_todos():
    documents = []
    cursor = collection.find()
    async for document in cursor:
        documents.append(TodoModel(**document))
    return documents


async def create_todo(todo: TodoModel):
    document = todo
    new_todo = await collection.insert_one(document)
    created_todo = await collection.find_one({"_id": new_todo.inserted_id})
    return created_todo


async def update_todo(id: str, desc: str):
    await collection.update_one({
        "_id": id
    }, {"$set": {
        'description': desc
    }})
    document = await collection.find_one({"_id": id})
    return document


async def delete_todo(id: str):
    await collection.delete_one({"_id": id})
    return True
