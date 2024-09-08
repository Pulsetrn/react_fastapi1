import datetime

from sqlalchemy import DateTime
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.sql import func

from core.models.base import Base


class Todo(Base):
    __tablename__ = "todos"

    title: Mapped[str]
    description: Mapped[str]
    # created_date: Mapped[datetime.datetime] = mapped_column(
    #     DateTime(timezone=True), server_default=func.now()
    # )
