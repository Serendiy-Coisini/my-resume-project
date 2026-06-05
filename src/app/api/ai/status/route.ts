import { NextResponse } from "next/server";
import { getPublicAIStatus } from "@/lib/ai/config";

export async function GET() {
  return NextResponse.json(getPublicAIStatus());
}
