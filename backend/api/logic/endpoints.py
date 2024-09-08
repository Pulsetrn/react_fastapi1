from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from api.logic import crud
from api.logic.dependencies import get_todo_dependency
from api.models.todos import Todo
from api.schemas.pydantic_models import CreateToDo, PartialUpdateToDo, ToDo
from core.models.db_helper import db_helper


router = APIRouter(tags=["todos"], prefix="/todos")


@router.get("/get_all_todos/", response_model=list[ToDo])
async def get_todos(session: AsyncSession = Depends(db_helper.get_db_session)):
    return await crud.get_todos(session=session)


@router.get("/get_all_todo/{todo_id}/", response_model=ToDo)
async def get_todo(todo: Todo = Depends(get_todo_dependency)):
    return todo


@router.post("/create_todo/", response_model=ToDo)
async def create_todo(
    todo_in: CreateToDo,
    session: AsyncSession = Depends(db_helper.get_db_session),
):
    return await crud.create_todo(session=session, todo_in=todo_in)


@router.patch("/update_todo/{todo_id}/", response_model=ToDo)
async def partial_update_todo(
    todo_in: PartialUpdateToDo,
    cur_todo: Todo = Depends(get_todo_dependency),
    session: AsyncSession = Depends(db_helper.get_db_session),
):
    return await crud.partial_update_todo(
        cur_todo=cur_todo,
        session=session,
        todo_in=todo_in,
    )


@router.delete("/delete_todo/{todo_id}/")
async def delete_todo(
    session: AsyncSession = Depends(db_helper.get_db_session),
    todo: Todo = Depends(get_todo_dependency),
) -> dict:
    return await crud.delete_todo(todo=todo, session=session)
