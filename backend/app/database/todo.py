from app.schemas.Todo import Todo, UpdateTodo, CreateTodo
from app.core.database import todo_collection as collection
from fastapi.encoders import jsonable_encoder
from beanie import PydanticObjectId

async def fetch_one_todo(id: str):
    return await Todo.find_one(Todo.id == id)


async def fetch_all_todos():
    return await Todo.find().to_list()

async def create_todo(create_todo: CreateTodo):
    document = jsonable_encoder(create_todo)
    todo = Todo(**document)
    new_todo = await todo.insert()
    return new_todo

async def update_todo(id: PydanticObjectId, update_todo: UpdateTodo):
	todo = {
		getattr(Todo, k): v
		for k, v in update_todo.dict().items() if v is not None
	}
	if len(todo) >= 1:
		update_result = await Todo.find_one(Todo.id == id).update({
			"$set":
			todo
		})
		if update_result.modified_count == 1:
			updated_todo = await Todo.find_one(Todo.id == id)
			if updated_todo:
				return updated_todo

	existing_todo = await Todo.find_one(Todo.id == id)
	if existing_todo:
		return existing_todo

	return None

async def delete_todo(id: PydanticObjectId):
    
	delete_result = await Todo.find_one(Todo.id == id).delete()
	return delete_result
