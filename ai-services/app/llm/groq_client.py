from groq import Groq
from app.config import GROQ_API_KEY

client = Groq(api_key=GROQ_API_KEY)

def generate_response(prompt: str):
    try:
        response = client.chat.completions.create(
            messages=[
                {"role": "user", "content": prompt}
            ],
            model="llama-3.1-8b-instant",  # use this first (stable)
        )

        return response.choices[0].message.content

    except Exception as e:
        return f"Error: {str(e)}"