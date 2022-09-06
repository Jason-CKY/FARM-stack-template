from app.core.settings import settings
import motor.motor_asyncio

client = motor.motor_asyncio.AsyncIOMotorClient(
    settings.mongodb_uri, uuidRepresentation="standard"
)
database: motor.motor_asyncio.AsyncIOMotorDatabase = client.database
todo_collection: motor.motor_asyncio.AsyncIOMotorCollection = database.todo
