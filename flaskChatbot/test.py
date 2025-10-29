from pymongo import MongoClient

client = MongoClient("mongodb+srv://niteshwarkr2056:Nikku1414@cluster0.fv4q5yd.mongodb.net/localFix?retryWrites=true&w=majority")
db = client["localFix"]
collection = db["users"]

print("✅ Connected to:", db.name)

# print count
count = collection.count_documents({})
print(f"📦 Total documents in 'users': {count}")

# print one plumber
sample = collection.find_one({"role": "serviceProvider"})
print("\n🧰 Example serviceProvider record:\n", sample)

# print plumber in Delhi
results = list(collection.find({"serviceCategory": "electrician", "city": "Bangalore"}))
print("\n🔍 plumber in Banglore query result:")
for r in results:
    print(f"- {r.get('fullName')} ({r.get('serviceCategory')}) — {r.get('city')}")
