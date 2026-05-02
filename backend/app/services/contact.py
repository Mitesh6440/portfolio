"""
Service for handling contact form submissions.
"""
import logging
from datetime import datetime
from app.core.config import settings

logger = logging.getLogger(__name__)


def save_contact_message(name: str, email: str, message: str) -> bool:
    """Log a contact message to file."""
    try:
        timestamp = datetime.now().isoformat()
        log_entry = f"[{timestamp}] Name: {name} | Email: {email} | Message: {message}\n"

        with open(settings.CONTACT_LOG_FILE, "a") as f:
            f.write(log_entry)

        logger.info(f"Contact message saved from {email}")
        return True
    except Exception as e:
        logger.error(f"Failed to save contact message: {e}")
        return False
