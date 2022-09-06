import uuid
from pydantic import BaseModel, Field
from typing import Optional

class UserModel(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    email: str = Field(...)
    
    description: str = Field(...)
    completed: bool = False

    class Config:
        allow_population_by_field_name = True
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
        schema_extra = {
            "example": {
                "title": "Morning task",
                "description": "Walk the dog",
                "completed": True
            }
        }

