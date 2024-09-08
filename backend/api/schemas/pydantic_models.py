from pydantic import BaseModel, ConfigDict


class BaseToDo(BaseModel):
    title: str
    description: str


class PartialUpdateToDo(BaseModel):
    title: str | None
    description: str | None


class CreateToDo(BaseToDo):
    pass


class ToDo(BaseToDo):
    model_config = ConfigDict(from_attributes=True)
    id: int
