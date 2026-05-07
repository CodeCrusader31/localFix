import chromadb
from app.rag.embeddings import get_embedding

# Initialize persistent ChromaDB client
client = chromadb.PersistentClient(path="./chroma_db")

collection = client.get_or_create_collection(
    name="localfix_rag_collection"
)

def retrieve_docs(query: str, k: int = 3):
    query_embedding = get_embedding(query)

    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=k
    )

    return results["documents"][0] if results["documents"] else []