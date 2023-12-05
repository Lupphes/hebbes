from db.database import SessionLocal

blacklisted_tokens = set()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
