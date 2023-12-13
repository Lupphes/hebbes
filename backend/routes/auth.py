from bcrypt import checkpw
from sqlalchemy.orm import Session

from fastapi import Depends, APIRouter, Header


from db.settings import settings
from utils.auth import create_access_token
from utils.auth import validate_user_auth
from utils.helpers import blacklisted_tokens, get_db
from crud.crud_user import get_user_by_email, register_user, get_users

from schemas import UserSchema, UserCreateSchema, UserLoginSchema, ResponseSchema

router = APIRouter()


@router.post("/register", response_model=ResponseSchema)
def register(user: UserCreateSchema, db: Session = Depends(get_db)):
    """
    Registers a new user in the system.

    This endpoint is crucial for the user registration process. It accepts user details and performs checks to ensure the uniqueness of the user's email. If the email is not already in use, it proceeds to create a new user account with the provided details.

    Args:
        user (UserCreateSchema): Schema containing the new user's registration information, including email and password.
        db (Session): Database session for executing database operations.

    Returns:
        ResponseSchema: A structured response indicating the success or failure of the registration process.

    Notes:
        - The email address is used as a unique identifier for each user. If an existing email is detected, the registration is halted, and an error response is returned.
        - On successful registration, the user's information is returned in the response, adhering to the 'UserSchema' format for data consistency.
        - The 'ResponseSchema' provides a standardized way to communicate the outcome of the registration process, enhancing API usability and client experience.
    """
    db_user = get_user_by_email(db, email=user.email)
    if db_user:
        return ResponseSchema.error_response(message="Email already registered")
    registered_user = register_user(db=db, userCreate=user)
    user_data = UserSchema.model_validate(registered_user)
    return ResponseSchema.success_response(
        data=user_data, message="User registered successfully"
    )


@router.get("/users", response_model=ResponseSchema)
def read_users(skip: int = 0, limit: int = 20, db: Session = Depends(get_db)):
    """
    Retrieves a paginated list of users from the database.

    This endpoint is essential for managing and viewing user information within the application. It allows for retrieving a list of all users with the option to paginate the results, which is useful for handling large datasets and improving performance.

    Args:
        skip (int): The starting index from which to retrieve users, used for pagination. Defaults to 0.
        limit (int): The maximum number of users to return in one response. Defaults to 100.
        db (Session): Database session for executing database operations.

    Returns:
        ResponseSchema: A structured response containing a list of users. Each user is represented by 'UserSchema'.

    Notes:
        - Pagination is handled using 'skip' and 'limit' parameters, allowing clients to request specific subsets of data.
        - The response is standardized using 'ResponseSchema', providing a consistent format for successful data retrieval.
        - Each user in the list is validated and transformed into 'UserSchema' format, ensuring data consistency and structure.
        - Validates that 'skip' is non-negative and 'limit' is positive; returns an error response if validation fails.
    """
    try:
        if skip < 0 or limit < 1:
            raise ValueError(
                "Skip must be a non-negative integer and limit must be a positive integer."
            )
    except ValueError as e:
        return ResponseSchema.error_response(message=str(e))

    limit = min(limit, 20)

    users = get_users(db, skip=skip, limit=limit)
    user_data = [UserSchema.model_validate(user) for user in users]
    return ResponseSchema.success_response(
        data=user_data, message="Users retrieved successfully"
    )


@router.post("/login", response_model=ResponseSchema)
async def login(user: UserLoginSchema, db: Session = Depends(get_db)):
    """
    Provides a user login functionality. It verifies the provided credentials and, if valid,
    returns an access token for the authenticated user.

    This endpoint is an essential part of the authentication process in a FastAPI application. It
    takes user login details, validates them against the database, and generates a JWT access token
    if the credentials are correct.

    Args:
        user (UserLoginSchema): Schema containing user login credentials (email and password).
        db (Session): Database session for executing database operations.

    Returns:
        ResponseSchema: A structured response containing either the JWT access token and user details
                        if the login is successful or an error message if the login fails.

    Notes:
        - The endpoint uses bcrypt to validate the password.
        - A JWT access token is generated using the user's email.
        - The 'ResponseSchema' is used to standardize the response format for both successful and failed login attempts.
    """
    db_user = get_user_by_email(db, email=user.email)
    if db_user and checkpw(
        user.password.encode("utf-8"), db_user.password.encode("utf-8")
    ):
        access_token = create_access_token(db_user.email, settings.EXPIRE_DELTA)
        return ResponseSchema.success_response(
            data={
                "access_token": access_token,
                "token_type": "bearer",
                "user": UserSchema.model_validate(db_user),
            },
            message="Login successful",
        )
    else:
        return ResponseSchema.error_response(message="Could not validate user")


@router.post("/logout", response_model=ResponseSchema)
async def logout(authorization: str = Header()):
    """
    Endpoint for user logout. It blacklists the provided token, effectively logging out the user.

    This endpoint takes an authorization header with a JWT token. When the token is received, it is added
    to a blacklist, preventing further use of the token for authentication. This action simulates a logout
    operation by invalidating the token.

    Args:
        authorization (str): The 'Authorization' header containing the JWT token in the format 'Bearer <token>'.

    Returns:
        ResponseSchema: A response indicating the success or failure of the logout operation.

    Notes:
        - The function checks for a valid token format in the header. If the format is incorrect or the token is missing,
          it returns an error response.
        - A successful logout results in a success response with a confirmation message.
        - This endpoint does not physically delete the token but prevents its future use by adding it to a blacklist.
    """
    try:
        token = authorization.split("Bearer ")[1]
        blacklisted_tokens.add(token)
        return ResponseSchema.success_response(message="Logged out successfully")
    except IndexError:
        # In case the authorization header is malformed or missing the token
        return ResponseSchema.error_response(message="Invalid token format")


@router.get("/debug", response_model=ResponseSchema)
def debug_headers(authorization: str = Header()):
    """
    Provides a debug endpoint to inspect the Authorization header value.

    This endpoint is primarily used for debugging purposes. It returns the content of the 'Authorization'
    header sent with the request. This can be helpful for developers to check the token or other information
    sent in this header.

    Args:
        authorization (str): The 'Authorization' header from the incoming request.

    Returns:
        ResponseSchema: A response containing the content of the 'Authorization' header.
                        In case of a missing header, an appropriate message is returned.

    Notes:
        - This endpoint does not perform any authentication or validation of the header's content.
        - It's a utility endpoint to assist in debugging and development processes.
    """
    if authorization:
        return ResponseSchema.success_response(
            data={"Authorization Header": authorization}
        )
    else:
        return ResponseSchema.error_response(message="No Authorization header provided")


@router.get("/protected", response_model=ResponseSchema)
def protected_route(current_user: str = Depends(validate_user_auth)):
    """
    Demonstrates a protected endpoint that requires valid authentication.

    This endpoint serves as an example of how to protect routes in a FastAPI application. It requires
    a valid JWT token for access. The token is validated, and the user's email is extracted from it.

    Args:
        current_user (str): The email of the current user, obtained from the validated JWT token.

    Returns:
        ResponseSchema: A response containing a message and the current user's email if the token is valid.
                        If the token is invalid, it returns an error message.

    Notes:
        - This endpoint is useful to showcase the implementation of token-based authentication.
        - The `validate_user_auth` dependency is responsible for checking the validity of the JWT token.
    """
    if current_user:
        return ResponseSchema.success_response(
            data={"message": "This is a protected route", "current_user": current_user}
        )
    else:
        return ResponseSchema.error_response(
            message="Invalid token or unauthorized access"
        )
