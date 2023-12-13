from typing import List
from sqlalchemy.orm import Session, joinedload

from models import Category


def get_all_subcategories(db: Session, parent_id: int) -> List[Category]:
    """
    Recursively retrieves all subcategories of a given category.

    Args:
        db (Session): The database session used for querying.
        parent_id (int): The ID of the parent category.

    Returns:
        List[Category]: A list of all subcategories under the given parent category.
    """
    categories = (
        db.query(Category)
        .filter(Category.parent_id == parent_id)
        .options(joinedload(Category.pictures))
        .all()
    )
    all_subcategories = []

    for category in categories:
        all_subcategories.append(category)
        # Recursively get all subcategories for each category
        subcategories = get_all_subcategories(db, category.id)
        all_subcategories.extend(subcategories)

    return all_subcategories


def get_subcategories(db: Session, parent_id: int, depth: int) -> List[Category]:
    """
    Retrieves subcategories of a given category up to a specified depth.

    Args:
        db (Session): The database session used for querying.
        parent_id (int): The ID of the parent category.
        depth (int): How deep in the category hierarchy to retrieve. For example, a depth of 1 will only retrieve immediate subcategories.

    Returns:
        List[Category]: A list of subcategories under the given parent category, up to the specified depth.
    """
    if depth <= 0:
        return []

    subcategories = (
        db.query(Category)
        .filter(Category.parent_id == parent_id)
        .options(joinedload(Category.pictures))
        .all()
    )

    for category in subcategories:
        # Recursively get subcategories if the depth is greater than 1
        if depth > 1:
            category.subcategories = get_subcategories(db, category.id, depth - 1)
        else:
            category.subcategories = []

    return subcategories
