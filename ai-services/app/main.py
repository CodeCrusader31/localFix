from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class ChatRequest(BaseModel):
    query: str

@app.get("/")
def home():
    return {"message": "AI Service Running 🚀"}

@app.post("/chat")
def chat(req: ChatRequest):
    return {
        "response": f"AI received: {req.query}"
    }