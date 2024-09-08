from typing import Annotated
from fastapi import Depends, HTTPException, Path, status
from sqlalchemy.ext.asyncio import AsyncSession

from api.models.todos import Todo
from core.models.db_helper import db_helper


async def get_todo_dependency(
    todo_id: Annotated[int, Path],
    session: AsyncSession = Depends(db_helper.get_db_session),
) -> Todo:
    result: Todo | None = await session.get(Todo, todo_id)
    if result:
        return result
    else:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"todo with id: {todo_id} not found",
        )
