import { createClient } from "redis";

let client;

async function initRedis() {
  if (!client) {
    client = createClient({
      url: "redis://localhost:6379"   // or your docker URL
    });

    client.on("error", (err) => console.error("Redis error:", err));

    await client.connect();
     console.log("🔥 Redis Connected");
  }

  return client;
}

export default initRedis;
