from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from .settings import settings
from sqlalchemy_searchable import make_searchable

engine = create_engine(settings.postgres_connection_string, echo=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
make_searchable(metadata=Base.metadata)
