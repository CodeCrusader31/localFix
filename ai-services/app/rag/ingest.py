import chromadb
from app.rag.embeddings import get_embedding
import os
from pathlib import Path

# Initialize persistent ChromaDB client
client = chromadb.PersistentClient(path="./chroma_db")
collection = client.get_or_create_collection(name="localfix_rag_collection")

def load_docs(file_path):
    # Handle relative paths from the ai-services directory
    if not os.path.isabs(file_path):
        # Get the directory of this script and go up to ai-services root
        base_dir = Path(__file__).parent.parent.parent
        file_path = os.path.join(base_dir, file_path)
    
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Split by ---
    docs = [chunk.strip() for chunk in content.split('---') if chunk.strip()]
    return docs

def ingest_docs():
    docs = load_docs("data/localfix_rag_knowledge_base.txt")
    
    if not docs:
        print("⚠️ No documents found to ingest")
        return

    for i, doc in enumerate(docs):
        collection.add(
            documents=[doc],
            embeddings=[get_embedding(doc)],
            ids=[str(i)]
        )

    print(f"✅ Inserted {len(docs)} documents into ChromaDB")

if __name__ == "__main__":
    ingest_docs()