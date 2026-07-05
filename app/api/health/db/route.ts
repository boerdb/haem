import { NextResponse } from "next/server";
import { getPool, isDbEnabled } from "@/lib/db/pool";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!isDbEnabled()) {
    return NextResponse.json({
      configured: false,
      ok: false,
      message: "DATABASE_URL niet gezet",
    });
  }

  try {
    const pool = getPool();
    const [rows] = await pool.query("SELECT 1 AS ok");
    const count = Array.isArray(rows) ? rows.length : 0;
    return NextResponse.json({
      configured: true,
      ok: count > 0,
      message: "MariaDB bereikbaar",
    });
  } catch (err) {
    return NextResponse.json({
      configured: true,
      ok: false,
      message: err instanceof Error ? err.message : "Databasefout",
    });
  }
}
