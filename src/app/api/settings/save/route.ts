import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { apiKey, baseUrl, model, provider } = await req.json();

    if (!apiKey?.trim()) {
      return NextResponse.json({ error: "API Key 不能为空" }, { status: 400 });
    }

    const envPath = path.join(process.cwd(), ".env.local");

    let content = "";
    try {
      content = await fs.readFile(envPath, "utf-8");
    } catch {
      // File doesn't exist, create new
    }

    const updates: Record<string, string> = {
      LLM_API_KEY: apiKey.trim(),
    };
    if (baseUrl) updates.LLM_BASE_URL = baseUrl;
    if (model) updates.LLM_MODEL = model;
    if (provider) updates.LLM_PROVIDER = provider;

    for (const [key, value] of Object.entries(updates)) {
      const regex = new RegExp(`^${key}=.*$`, "m");
      if (regex.test(content)) {
        content = content.replace(regex, `${key}=${value}`);
      } else {
        content = content.trimEnd() + `\n${key}=${value}`;
      }
    }

    await fs.writeFile(envPath, content.trim() + "\n", "utf-8");

    // Also update runtime process.env so API calls take effect immediately
    process.env.LLM_API_KEY = apiKey.trim();
    if (baseUrl) process.env.LLM_BASE_URL = baseUrl;
    if (model) process.env.LLM_MODEL = model;
    if (provider) process.env.LLM_PROVIDER = provider;

    return NextResponse.json({
      success: true,
      message: "配置已保存成功！",
    });
  } catch (error) {
    console.error("Save settings error:", error);
    return NextResponse.json({ error: "保存失败" }, { status: 500 });
  }
}
