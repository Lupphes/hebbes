from fastapi import APIRouter
from schemas.response_schema import ResponseSchema

router = APIRouter()


@router.get("/", response_model=ResponseSchema)
def read_root():

    """
    Handles requests to the root ("/") URL.

    When the root URL of the API is accessed with a GET request, this function will be invoked.

    Returns:
        ResponseSchema: A response schema object containing a message.
    """

    return ResponseSchema.success_response(
        data={"Price": "Bandit"}, message="Welcome to Price Bandit API"
    )
