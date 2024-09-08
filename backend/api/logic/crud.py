from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import Result
from sqlalchemy import select
from api.models.todos import Todo
from api.schemas.pydantic_models import CreateToDo, PartialUpdateToDo


async def get_todos(session: AsyncSession) -> list[Todo]:
    stmt = select(Todo).order_by(Todo.id)
    result: Result = await session.execute(stmt)
    todos = result.scalars().all()
    return list(todos)


async def create_todo(session: AsyncSession, todo_in: CreateToDo) -> Todo:
    new_todo = Todo(**todo_in.model_dump())
    session.add(new_todo)
    await session.commit()
    await session.refresh(new_todo)  # Указываем, что обновляем
    return new_todo


async def partial_update_todo(
    session: AsyncSession,
    todo_in: PartialUpdateToDo,
    cur_todo: Todo,
) -> Todo:
    for name, value in todo_in.model_dump(exclude_none=True).items():
        setattr(cur_todo, name, value)

    await session.commit()
    await session.refresh(cur_todo)
    return cur_todo


async def delete_todo(session: AsyncSession, todo: Todo) -> dict:
    try:
        await session.delete(todo)
        await session.commit()
        return {"status": "successful"}
    except Exception as err:
        return {
            "status": f"{HTTPException(status_code=status.HTTP_400_BAD_REQUEST)}, err: {err}"
        }
