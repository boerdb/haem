import "server-only";
import mysql from "mysql2/promise";

let pool: mysql.Pool | null = null;

export function getPool(): mysql.Pool {
  const url = process.env.DATABASE_URL?.trim();
  if (!url) {
    throw new Error("DATABASE_URL is niet geconfigureerd");
  }
  if (!pool) {
    pool = mysql.createPool({
      uri: url,
      waitForConnections: true,
      connectionLimit: 5,
      enableKeepAlive: true,
    });
  }
  return pool;
}

export function isDbEnabled(): boolean {
  return Boolean(process.env.DATABASE_URL?.trim());
}
