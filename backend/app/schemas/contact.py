"""
Pydantic schemas for contact form.
"""
from pydantic import BaseModel, EmailStr


class ContactMessage(BaseModel):
    """Schema for incoming contact form messages."""
    name: str
    email: str
    message: str


class ContactResponse(BaseModel):
    """Schema for contact form response."""
    success: bool
    message: str
