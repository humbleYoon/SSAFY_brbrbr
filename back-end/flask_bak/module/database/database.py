from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_sessioin, sessionmaker
from sqlalchemy.ext.declarative import declarative_base

from config import DB_URL

engine = create_engine(DB_URL, convert_unicode=True, echo=True)
session = scoped_sessioin(sessionmaker(autocommit=False,
                                       autoFlush=False, bind=engine))

Base = declarative_base()



class Database():
    def __init__(self):
        self.db = pymysql.connect()
