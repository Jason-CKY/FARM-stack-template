from pydantic import BaseModel, Field
from typing import Optional
from app.schemas.Base import PyObjectId
from bson import ObjectId

class TodoModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    title: str = Field(...)
    description: str = Field(...)
    completed: bool = False

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


class UpdateTodoModel(BaseModel):
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
