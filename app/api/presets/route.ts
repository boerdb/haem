import { NextResponse } from "next/server";
import { getParameterPresets } from "@/lib/db/presets";

export const dynamic = "force-dynamic";

export async function GET() {
  const presets = await getParameterPresets();
  return NextResponse.json({ presets });
}
