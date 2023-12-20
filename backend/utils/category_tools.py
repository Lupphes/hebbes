from typing import List
from sqlalchemy.orm import Session

from models import Category


def get_all_subcategories(db: Session, parent_id: int) -> List[Category]:
    categories = db.query(Category).filter(Category.parent_id == parent_id).all()
    all_subcategories = []

    for category in categories:
        all_subcategories.append(category)
        subcategories = get_all_subcategories(db, category.id)
        all_subcategories.extend(subcategories)

    return all_subcategories


def get_subcategories(db: Session, parent_id: int, depth: int) -> List[Category]:
    if depth <= 0:
        return []
    subcategories = db.query(Category).filter(Category.parent_id == parent_id).all()
    all_subcategories = []

    for category in subcategories:
        all_subcategories.append(category)
        if depth > 1:
            sub_subcategories = get_subcategories(db, category.id, depth - 1)
            all_subcategories.extend(sub_subcategories)

    return all_subcategories
