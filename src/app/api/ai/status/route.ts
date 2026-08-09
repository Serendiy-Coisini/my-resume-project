import { NextResponse } from "next/server";
import { getPublicAIStatus } from "@/lib/ai/config";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(getPublicAIStatus());
}
