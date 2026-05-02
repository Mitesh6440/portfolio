"""
Routes for contact form.
"""
from fastapi import APIRouter
from app.schemas.contact import ContactMessage, ContactResponse
from app.services.contact import save_contact_message

router = APIRouter(tags=["Contact"])


@router.post("/contact", response_model=ContactResponse)
async def submit_contact(data: ContactMessage):
    """Handle contact form submission."""
    success = save_contact_message(
        name=data.name,
        email=data.email,
        message=data.message,
    )

    if success:
        return ContactResponse(
            success=True,
            message="Thank you! Your message has been received.",
        )
    return ContactResponse(
        success=False,
        message="Something went wrong. Please try again later.",
    )
