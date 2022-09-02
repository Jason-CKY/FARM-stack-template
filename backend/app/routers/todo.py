import logging
from fastapi import APIRouter, HTTPException, Request, Body, status
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
from app.schemas.Todo import TodoModel

logger = logging.getLogger(settings.app_name)
router = APIRouter()

@router.post("/todo", response_model=TodoModel, response_description="Add new Todo")
async def post_todo(todo: TodoModel = Body(...)):
    todo = jsonable_encoder(todo)
    response = await create_todo(todo)
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=response)


@router.get("/todo", response_model=List[TodoModel])
async def get_all_todo():
    response = await fetch_all_todos()
    return response
 

@router.get("/todo/{id}", response_model=TodoModel)
async def get_todo_by_id(id: str):
    response = await fetch_one_todo(id)
    if response:
        return response
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Todo id={id} not found")

@router.put("/todo/{id}", response_model=TodoModel)
async def put_todo(id: str, description: str):
    response = await update_todo(id, description)
    if response:
        return response
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Something went wrong")


@router.delete("/todo/{id}")
async def remove_todo(id: str):
    response = await delete_todo(id)
    if response:
        return "Successfully deleted todo item!"
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Something went wrong")
