from dotenv import load_dotenv
import os
from pathlib import Path

# Load .env file from the ai-services directory
env_path = Path(__file__).parent.parent / ".env"
load_dotenv(dotenv_path=env_path)

GROQ_API_KEY = os.getenv("GROQ_API_KEY")