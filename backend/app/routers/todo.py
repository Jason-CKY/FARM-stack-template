import logging
from fastapi import APIRouter, HTTPException, Body, status, Depends, Response
from app.schemas.Users import UserRead
from app.core.auth import current_active_user
from typing import List
from beanie import PydanticObjectId
from app.core.settings import settings
from app.database.todo import (
    fetch_one_todo, fetch_all_todos, create_todo, update_todo, delete_todo
)
from app.schemas.Todo import UpdateTodo, ReadTodo, CreateTodo

logger = logging.getLogger(settings.app_name)
router = APIRouter()


@router.post(
    "/todo",
    response_model=ReadTodo,
    response_description="Add new Todo",
    status_code=status.HTTP_201_CREATED
)
async def post_todo(
    todo: CreateTodo = Body(...),
    user: UserRead = Depends(current_active_user)
):
    response = await create_todo(todo)
    return ReadTodo.from_orm(response)


@router.get(
    "/todo",
    response_model=List[ReadTodo],
    response_description="List all Todos"
)
async def get_all_todo(user: UserRead = Depends(current_active_user)):
    # The list_tasks router is overly simplistic. In a real-world application, you are at the very least going to need to include pagination
    response = await fetch_all_todos()
    return [ReadTodo.from_orm(r) for r in response]


@router.get("/todo/{id}", response_model=ReadTodo)
async def get_todo_by_id(
    id: PydanticObjectId, user: UserRead = Depends(current_active_user)
):
    response = await fetch_one_todo(id)
    if response:
        return ReadTodo.from_orm(response)
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"task id={id} not found"
    )


@router.put(
    "/todo/{id}",
    response_model=ReadTodo,
    response_description="Update a Todo"
)
async def put_todo(
    id: PydanticObjectId,
    todo: UpdateTodo = Body(...),
    user: UserRead = Depends(current_active_user)
):
    response = await update_todo(id, todo)
    if response:
        return ReadTodo.from_orm(response)
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"task id={id} not found"
    )


@router.delete("/todo/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def remove_todo(
    id: PydanticObjectId, user: UserRead = Depends(current_active_user)
):
    response = await delete_todo(id)
    if response.deleted_count == 1:
        return Response(status_code=status.HTTP_204_NO_CONTENT)
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Todo id={id} not found"
    )
