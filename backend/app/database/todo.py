from app.schemas.Todo import TodoModel, UpdateTodoModel
from app.core.database import todo_collection as collection


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


async def update_todo(id: str, todo: UpdateTodoModel):
    todo = {k: v for k, v in todo.dict().items() if v is not None}

    if len(todo) >= 1:
        update_result = await collection.update_one({
            "_id": id
        }, {"$set": todo})
        if update_result.modified_count == 1:
            updated_todo = await collection.find_one({"_id": id})
            if updated_todo:
                return updated_todo

    existing_todo = await collection.find_one({"_id": id})
    if existing_todo:
        return existing_todo

    return None


async def delete_todo(id: str):
    delete_result = await collection.delete_one({"_id": id})
    return delete_result
