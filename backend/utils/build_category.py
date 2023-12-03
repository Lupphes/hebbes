from models.category import Category
from models.item import PictureLink


UNCATEGORIZED_ID = 9999  # Assuming 9999 as the ID for 'Uncategorized'


def create_category(cat_id, category_tree, db):
    cat_data = category_tree.get(cat_id, {})
    if not cat_data:
        # If no category data is found, return None.
        return None

    category = db.query(Category).filter_by(id=cat_id).first()
    if category:
        return category
    else:
        new_cat = Category(id=cat_data.get("id"), name=cat_data.get("name"))
        for pic in cat_data.get("images", []):
            new_pic = PictureLink(
                width=pic.get("width"), height=pic.get("height"), url=pic.get("url")
            )
            new_cat.pictures.append(new_pic)
        return new_cat


def build_category_hierarchy_from_path(category_path, category_tree, db):
    if not category_path:
        # If no category path is provided, return 'Uncategorized'
        return create_category(UNCATEGORIZED_ID, category_tree, db)

    top_category = create_category(category_path[0], category_tree, db)
    if not top_category:
        # If the top category is not found, assign to 'Uncategorized'
        return create_category(UNCATEGORIZED_ID, category_tree, db)

    current_category = top_category
    for sub_cat_id in category_path[1:]:
        sub_category = create_category(sub_cat_id, category_tree, db)
        if sub_category:
            current_category.subcategories.append(sub_category)
            current_category = sub_category

    return top_category
