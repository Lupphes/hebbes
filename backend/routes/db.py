from typing import List, Optional

from fastapi import Depends, APIRouter, Query
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session, joinedload


from schemas import StoreSchema, CategorySchema, ResponseSchema

from crud.crud_items import populate_tables, get_items
from crud.crud_category import get_subcategories
from utils.helpers import get_db
from models import Store, Category

router = APIRouter()

MAX_ITEM_LIMIT = 100
MAX_DEPTH_LIMIT = 5


@router.get("/populate")
def populate_items(db: Session = Depends(get_db)):
    """
    Populates the database with initial seed data, essential for setting up the application with a predefined data set.

    This endpoint is particularly important for initializing the database with default data, commonly used during the
    application's initial setup or for resetting the database to a known state with sample data for development and testing.

    Usage:
        - In development and testing environments, it facilitates consistent and predictable testing scenarios.
        - In production, it can be used for initial setup or restoring default data sets, with caution.

    Returns:
        - True: Indicates successful database population.
        - Internal Server Error: Occurs in case of a failure during the population process.

    Note:
        This endpoint should be used cautiously, especially in production environments, as it may overwrite existing data.
        It is recommended to ensure database backups and proper checks before using this endpoint in such scenarios.
    """
    try:
        populate_tables(db=db)
        return ResponseSchema.success_response(
            message="Database populated successfully."
        )
    except Exception as e:
        return ResponseSchema.error_response(message=f"Error: {str(e)}")


@router.get("/items", response_model=ResponseSchema)
def read_items(
    id: Optional[List[int]] = Query(None),
    category_id: Optional[List[int]] = Query(None),
    store_id: Optional[List[int]] = Query(None),
    skip: int = 0,
    limit: int = 50,
    db: Session = Depends(get_db),
):
    """
    Retrieves a list of items from the database with optional filters for specific item IDs, category IDs, and store IDs.
    This endpoint is particularly useful for fetching items based on multiple criteria, allowing users to refine their search.

    Parameters:
        id (Optional[List[int]]): List of item IDs to filter by. Multiple item IDs can be provided.
        category_id (Optional[List[int]]): List of category IDs to filter by. Supports multiple category IDs.
        store_id (Optional[List[int]]): List of store IDs to filter by. Enables filtering by multiple store IDs.
        skip (int): Number of items to skip for pagination purposes.
        limit (int): Maximum number of items to return, capped at 50 for performance.

    Returns:
        List[ItemSchema]: A list of items that meet the specified filter criteria. Includes detailed information for each item.

    Note:
        The ability to specify multiple IDs for items, categories, and stores makes this endpoint versatile for various search and filter use cases.
    """
    limit = min(limit, 50)

    response = get_items(
        db,
        id=id,
        category_id=category_id,
        store_id=store_id,
        skip=skip,
        limit=limit,
    )

    return response


@router.get("/search", response_model=ResponseSchema)
def search_database(
    query: str,
    id: Optional[List[int]] = Query(None),
    category_id: Optional[List[int]] = Query(None),
    store_id: Optional[List[int]] = Query(None),
    skip: int = 0,
    limit: int = 20,
    db: Session = Depends(get_db),
):
    """
    Performs a full-text search across the items in the database, along with optional filtering by specific criteria.

    Parameters:
        query (str): Full-text search query string.
        id (Optional[List[int]]): List of item IDs to further refine the search.
        category_id (Optional[List[int]]): List of category IDs to filter the search results.
        store_id (Optional[List[int]]): List of store IDs to narrow down the search results.
        skip (int): Number of records to skip for pagination.
        limit (int): Maximum number of search results to return. Capped at 20 for performance.

    Returns:
        ResponseSchema: A structured response containing a list of items matching the search criteria.

    Note:
        This endpoint provides a powerful search experience by combining full-text search with additional filters.
    """
    limit = min(limit, 20)

    response = get_items(
        db=db,
        query=query,
        id=id,
        category_id=category_id,
        store_id=store_id,
        skip=skip,
        limit=limit,
    )

    if response.success and response.data:
        return ResponseSchema.success_response(
            data=response.data, message="Search results retrieved successfully."
        )
    else:
        return ResponseSchema.error_response(
            message="No items found matching the search criteria."
        )


@router.get("/categories", response_model=ResponseSchema)
def read_categories(
    skip: int = 0,
    limit: int = 20,
    depth: Optional[int] = 0,
    db: Session = Depends(get_db),
):
    """
    Retrieves a list of top-level categories along with their nested subcategories from the database.

    Parameters:
        skip (int): The number of records to skip (for pagination).
        limit (int): The maximum number of top-level categories to return.
        depth (Optional[int]): The depth of nested subcategories to include.

    Returns:
        ResponseSchema: A structured response containing a list of categories.
    """
    try:
        if skip < 0 or limit < 1:
            raise ValueError(
                "Skip must be a non-negative integer and limit must be a positive integer."
            )
    except ValueError as e:
        return ResponseSchema.error_response(message=str(e))

    limit = min(limit, 25)
    actual_depth = min(depth if depth is not None else 0, MAX_DEPTH_LIMIT)

    query = (
        db.query(Category)
        .filter(Category.parent_id == None)
        .options(joinedload(Category.pictures))
    )
    top_level_categories = query.offset(skip).limit(limit).all()

    for category in top_level_categories:
        category.subcategories = get_subcategories(db, category.id, actual_depth)

    json_compatible_data = jsonable_encoder(top_level_categories)
    validated_items = [
        CategorySchema.model_validate(item) for item in json_compatible_data
    ]

    if not validated_items:
        return ResponseSchema.success_response(
            data=[], message="No top-level categories found."
        )

    return ResponseSchema.success_response(
        data=validated_items,
        message="Top-level categories retrieved successfully.",
    )


@router.get("/subcategories/{parent_id}", response_model=ResponseSchema)
def read_subcategories(
    parent_id: int,
    depth: Optional[int] = 1,
    db: Session = Depends(get_db),
):
    """
    Retrieves a list of top-level categories along with their nested subcategories from the database.

    This endpoint is designed to fetch categories that have no parent categories (top-level categories),
    making it an entry point to explore the entire category hierarchy. It also provides the functionality
    to include nested subcategories up to a specified depth, enabling a comprehensive view of the category
    structure.

    Parameters:
        skip (int): The number of records to skip (for pagination). Defaults to 0.
        limit (int): The maximum number of top-level categories to return. Defaults to 100.
        depth (Optional[int]): The depth of nested subcategories to include.
                               A depth of 1 includes only immediate subcategories,
                               while higher values retrieve further levels. Defaults to 3.

    Returns:
        List[CategorySchema]: A list of top-level categories, each with their nested subcategories
                              up to the specified depth. The list adheres to the pagination parameters
                              set by 'skip' and 'limit'.

    Note:
        The depth parameter allows flexible control over how much of the category hierarchy is returned,
        which can be useful to avoid overly large responses when only a top-level view is required.

    Raises:
        HTTPException: If 'id', 'skip', or 'limit' are not valid.
    """
    actual_depth = min(depth if depth is not None else 1, MAX_DEPTH_LIMIT)

    if depth is not None and depth < 1:
        return ResponseSchema.error_response(
            message="Depth must be a positive integer greater than 0."
        )

    parent_category = db.query(Category).filter(Category.id == parent_id).first()

    if not parent_category:
        return ResponseSchema.error_response(
            message=f"Category with ID {parent_id} not found."
        )

    subcategories = get_subcategories(db, parent_id, actual_depth)

    json_compatible_data = jsonable_encoder(subcategories)
    validated_subcategories = [
        CategorySchema.model_validate(subcategory)
        for subcategory in json_compatible_data
    ]

    if not validated_subcategories:
        return ResponseSchema.success_response(
            data=[], message="No subcategories found for the specified parent category."
        )

    return ResponseSchema.success_response(
        data=validated_subcategories, message="Subcategories retrieved successfully."
    )


@router.get("/stores", response_model=ResponseSchema)
def read_stores(
    id: Optional[int] = None,
    skip: int = 0,
    limit: int = 20,
    db: Session = Depends(get_db),
):
    """
    Retrieves a list of stores from the database.
    Allows filtering by a specific store ID and supports pagination.

    Parameters:
        id (Optional[int]): Filter by a specific store ID.
        skip (int): Number of records to skip for pagination.
        limit (int): Maximum number of records to return.

    Returns:
        ResponseSchema: A structured response containing a list of stores.

    Raises:
        HTTPException: If 'id', 'skip', or 'limit' are not valid.
    """
    try:
        if id is not None and id < 0:
            raise ValueError("Store ID must be a positive integer.")

        if skip < 0 or limit < 1:
            raise ValueError(
                "Skip must be a non-negative integer and limit must be a positive integer."
            )
    except ValueError as e:
        return ResponseSchema.error_response(message=str(e))

    limit = min(limit, 20)

    if id is not None:
        stores = db.query(Store).filter(Store.id == id).offset(skip).limit(limit).all()
    else:
        stores = db.query(Store).offset(skip).limit(limit).all()

    if not stores:
        return ResponseSchema.success_response(data=[], message="No stores found.")

    store_data = [StoreSchema.model_validate(store) for store in stores]
    return ResponseSchema.success_response(
        data=store_data, message="Stores retrieved successfully."
    )


@router.get("/basket", response_model=ResponseSchema)
def read_basket(
    ids: Optional[List[int]] = Query(None),
    db: Session = Depends(get_db),
):
    """
    Retrieves a list of items in the user's basket.

    Parameters:
        ids (Optional[List[int]]): List of item IDs to be fetched. If no IDs are provided, an empty list is returned.

    Returns:
        ResponseSchema: A structured response containing detailed information about each item corresponding to the provided IDs.

    Note:
        This endpoint is particularly useful for shopping basket functionality, where a user needs to view details of selected items. It is capped at a maximum of 100 items per request.
    """
    if ids is None or len(ids) == 0:
        return ResponseSchema.success_response(data=[], message="No items in basket.")

    if len(ids) > MAX_ITEM_LIMIT:
        return ResponseSchema.error_response(
            message=f"Maximum of {MAX_ITEM_LIMIT} items are allowed per request."
        )

    items_response = get_items(db, id=ids)

    if items_response.success:
        return items_response
    else:
        return ResponseSchema.error_response(message="Failed to retrieve basket items.")
