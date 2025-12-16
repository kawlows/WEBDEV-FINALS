from typing import Optional
from sqlmodel import SQLModel, Field


class BookBase(SQLModel):
    title: str
    author: str


class Book(BookBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)


class BookCreate(BookBase):
    pass    