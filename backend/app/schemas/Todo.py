from pydantic import BaseModel, Field
from typing import Optional
from app.schemas.Base import PyObjectId
from bson import ObjectId
from datetime import datetime
from beanie import Document


class ReadTodo(BaseModel):
    id: PyObjectId
    title: str = Field(...)
    description: str = Field(...)
    completed: bool = False
    created_at: datetime = Field(default_factory=datetime.now)

    class Config:
        orm_mode = True
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "title": "Morning task",
                "description": "Walk the dog",
                "completed": True,
                "created_at": "2022-09-23T09:02:18.212127",
            }
        }


class Todo(Document):
    title: str = Field(...)
    description: str = Field(...)
    completed: bool = False
    created_at: datetime = Field(default_factory=datetime.now)


class CreateTodo(BaseModel):
    title: str = Field(...)
    description: str = Field(...)
    completed: bool = False
    created_at: datetime = Field(default_factory=datetime.now)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "title": "Morning task",
                "description": "Walk the dog",
                "completed": True
            }
        }


class UpdateTodo(BaseModel):
    title: Optional[str]
    description: Optional[str]
    completed: Optional[bool]

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "title": "Morning task",
                "description": "Walk the dog",
                "completed": True
            }
        }
