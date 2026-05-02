"""
Application configuration via environment variables.
"""
import os


class Settings:
    """Application settings loaded from environment variables."""

    APP_NAME: str = os.getenv("APP_NAME", "Portfolio API")
    DEBUG: bool = os.getenv("DEBUG", "false").lower() == "true"
    HOST: str = os.getenv("HOST", "0.0.0.0")
    PORT: int = int(os.getenv("PORT", "8000"))
    CONTACT_LOG_FILE: str = os.getenv("CONTACT_LOG_FILE", "contact_messages.log")


settings = Settings()
