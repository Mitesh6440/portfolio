"""
Service for handling contact form submissions.
"""
import logging
import httpx
from datetime import datetime
from app.core.config import settings

logger = logging.getLogger(__name__)


async def send_discord_notification(name: str, email: str, message: str):
    """Send a notification to Discord via webhook."""
    if not settings.DISCORD_WEBHOOK_URL:
        logger.warning("Discord Webhook URL not configured.")
        return

    payload = {
        "embeds": [
            {
                "title": "📩 New Contact Form Message",
                "color": 0x00f0ff,  # Cyan color matching portfolio theme
                "fields": [
                    {"name": "Name", "value": name, "inline": True},
                    {"name": "Email", "value": email, "inline": True},
                    {"name": "Message", "value": message, "inline": False},
                ],
                "timestamp": datetime.utcnow().isoformat(),
                "footer": {"text": "Portfolio Contact System"},
            }
        ]
    }

    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(settings.DISCORD_WEBHOOK_URL, json=payload)
            response.raise_for_status()
            logger.info("Discord notification sent successfully.")
    except Exception as e:
        logger.error(f"Failed to send Discord notification: {e}")


async def save_contact_message(name: str, email: str, message: str) -> bool:
    """Log a contact message to file and send Discord notification."""
    try:
        timestamp = datetime.now().isoformat()
        log_entry = f"[{timestamp}] Name: {name} | Email: {email} | Message: {message}\n"

        with open(settings.CONTACT_LOG_FILE, "a") as f:
            f.write(log_entry)

        logger.info(f"Contact message saved from {email}")

        # Send Discord notification
        await send_discord_notification(name, email, message)

        return True
    except Exception as e:
        logger.error(f"Failed to save contact message: {e}")
        return False
