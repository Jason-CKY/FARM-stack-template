import logging
from fastapi import APIRouter, HTTPException, Body, status
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from typing import List
from app.core.settings import settings
from app.core.database import (
    fetch_one_todo,
    fetch_all_todos,
    create_todo,
    update_todo,
    delete_todo
)
from app.schemas.Todo import TodoModel, UpdateTodoModel

logger = logging.getLogger(settings.app_name)
router = APIRouter()

@router.post("/todo", response_model=TodoModel, response_description="Add new Todo")
async def post_todo(todo: TodoModel = Body(...)):
    todo = jsonable_encoder(todo)
    response = await create_todo(todo)
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=response)


@router.get("/todo", response_model=List[TodoModel], response_description="List all Todos")
async def get_all_todo():
    # The list_tasks router is overly simplistic. In a real-world application, you are at the very least going to need to include pagination
    response = await fetch_all_todos()
    return response
 

@router.get("/todo/{id}", response_model=TodoModel)
async def get_todo_by_id(id: str):
    response = await fetch_one_todo(id)
    if response:
        return response
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Todo id={id} not found")

@router.put("/todo/{id}", response_model=TodoModel, response_description="Update a Todo")
async def put_todo(id: str, todo: UpdateTodoModel = Body(...)):
    response = await update_todo(id, todo)
    if response:
        return response
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Todo id={id} not found")


@router.delete("/todo/{id}")
async def remove_todo(id: str):
    response = await delete_todo(id)
    if response.deleted_count == 1:
        return JSONResponse(status_code=status.HTTP_204_NO_CONTENT)
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Todo id={id} not found")
