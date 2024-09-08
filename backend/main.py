from contextlib import asynccontextmanager
from fastapi import FastAPI
import uvicorn
from core.models.db_helper import db_helper
from core.models.base import Base
from api.logic.endpoints import router as todo_router
from fastapi.middleware.cors import CORSMiddleware


@asynccontextmanager
async def lifespan(app: FastAPI):
    async with db_helper.engine.begin() as connect:
        await connect.run_sync(Base.metadata.create_all)
    yield


app = FastAPI(lifespan=lifespan)
app.include_router(todo_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == "__main__":
    uvicorn.run("main:app", reload=True)
