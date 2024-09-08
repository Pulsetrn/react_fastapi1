from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
from core.config import settings


class DataBase_helper:
    def __init__(self, db_url: str, db_echo: bool) -> None:
        self.engine = create_async_engine(
            url=db_url,
            echo=db_echo,
        )
        self.session = async_sessionmaker(
            bind=self.engine,
            autoflush=False,
            autocommit=False,
        )

    async def get_db_session(self):
        async with self.session() as session:
            yield session


db_helper = DataBase_helper(
    db_url=settings.db_url,
    db_echo=settings.db_echo,
)
