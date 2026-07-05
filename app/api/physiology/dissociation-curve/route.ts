import { NextRequest, NextResponse } from "next/server";
import {
  curveCacheKey,
  generateDissociationCurve,
} from "@/lib/physiology/hillEquation";
import { redisConfigured, redisGet, redisSet } from "@/lib/redis";
import type { CurveParams } from "@/lib/types";

export const dynamic = "force-dynamic";

const CACHE_TTL = 3600;

function parseParams(searchParams: URLSearchParams): CurveParams {
  return {
    pH: clamp(Number(searchParams.get("pH") ?? 7.4), 7.0, 7.6),
    pCO2: clamp(Number(searchParams.get("pCO2") ?? 40), 20, 80),
    temp: clamp(Number(searchParams.get("temp") ?? 37), 34, 42),
    bpg: clamp(Number(searchParams.get("bpg") ?? 4.5), 2, 8),
  };
}

function clamp(n: number, min: number, max: number): number {
  if (Number.isNaN(n)) return min;
  return Math.min(max, Math.max(min, n));
}

export async function GET(request: NextRequest) {
  const params = parseParams(request.nextUrl.searchParams);
  const cacheKey = curveCacheKey(params);

  if (redisConfigured()) {
    const cached = await redisGet<Awaited<ReturnType<typeof generateDissociationCurve>>>(
      cacheKey,
    );
    if (cached) {
      return NextResponse.json({ ...cached, cached: true });
    }
  }

  const result = generateDissociationCurve(params);

  if (redisConfigured()) {
    await redisSet(cacheKey, result, CACHE_TTL);
  }

  return NextResponse.json({ ...result, cached: false });
}
