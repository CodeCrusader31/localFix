from fastapi import FastAPI
from pydantic import BaseModel
from app.llm.groq_client import generate_response
from app.rag.retriever import retrieve_docs, collection
from app.rag.ingest import ingest_docs
import os

app = FastAPI()

class ChatRequest(BaseModel):
    query: str

@app.on_event("startup")
async def startup_event():
    """Initialize RAG database on startup"""
    if collection.count() == 0:
        print("🔄 Initializing ChromaDB with knowledge base...")
        try:
            ingest_docs()
            print(f"✅ RAG initialized with {collection.count()} documents")
        except Exception as e:
            print(f"⚠️ Warning: Could not initialize RAG: {str(e)}")

@app.get("/")
def home():
    return {"message": "AI Service Running 🚀", "docs_loaded": collection.count()}

@app.post("/chat")
def chat(req: ChatRequest):
    docs = retrieve_docs(req.query)

    if not docs:
        return {
            "response": "No relevant documents found in knowledge base. Please ensure the RAG system has been initialized.",
            "docs_found": 0
        }

    context = "\n\n".join(docs)

    prompt = f"""
    Answer the question using ONLY the context below. If the context doesn't contain relevant information, say so clearly.

    Context:
    {context}

    Question:
    {req.query}
    """

    response = generate_response(prompt)

    return {"response": response, "docs_found": len(docs)}

@app.post("/ingest")
def manual_ingest():
    """Manually trigger document ingestion"""
    try:
        ingest_docs()
        return {
            "status": "success",
            "message": f"Ingestion complete. Total documents: {collection.count()}"
        }
    except Exception as e:
        return {"status": "error", "message": str(e)}