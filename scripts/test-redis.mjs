/**
 * Redis-verbinding testen: npm run test:redis
 */
import { createClient } from "redis";
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

function loadEnvLocal() {
  const path = resolve(process.cwd(), ".env.local");
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
    if (line.startsWith("REDIS_URL=") && !process.env.REDIS_URL) {
      process.env.REDIS_URL = line.slice("REDIS_URL=".length).trim();
    }
  }
}

loadEnvLocal();

const url = process.env.REDIS_URL?.trim();
if (!url) {
  console.log("❌ REDIS_URL niet gezet");
  process.exit(1);
}

const client = createClient({
  url,
  socket: { connectTimeout: 8_000, reconnectStrategy: false },
});

try {
  await client.connect();
  console.log("✅ PING →", await client.ping());
  const testKey = "haemo:connection-test";
  await client.set(testKey, JSON.stringify({ at: new Date().toISOString() }));
  console.log("✅ SET/GET →", await client.get(testKey));
  const keys = await client.keys("haemo:*");
  console.log("📋 haemo keys:", keys.length ? keys : "(nog geen)");
  await client.quit();
} catch (err) {
  console.error("❌", err.message);
  process.exit(1);
}
