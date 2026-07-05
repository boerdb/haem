/**
 * MariaDB-verbinding testen: npm run test:db
 */
import mysql from "mysql2/promise";
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

function loadEnvLocal() {
  const path = resolve(process.cwd(), ".env.local");
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
    if (line.startsWith("DATABASE_URL=") && !process.env.DATABASE_URL) {
      process.env.DATABASE_URL = line.slice("DATABASE_URL=".length).trim();
    }
  }
}

loadEnvLocal();

const url = process.env.DATABASE_URL?.trim();
if (!url) {
  console.log("❌ DATABASE_URL niet gezet");
  process.exit(1);
}

try {
  const conn = await mysql.createConnection(url);
  const [rows] = await conn.query(
    "SELECT COUNT(*) AS n FROM parameter_presets",
  );
  console.log("✅ MariaDB bereikbaar — presets:", rows[0].n);
  await conn.end();
} catch (err) {
  console.error("❌", err.message);
  process.exit(1);
}
