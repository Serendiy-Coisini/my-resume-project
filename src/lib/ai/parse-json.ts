import { LLMError } from "@/lib/ai/errors";

export function parseJSONContent<T>(content: string): T {
  const candidates = collectJsonCandidates(content);

  for (const candidate of candidates) {
    const variants = [
      candidate,
      repairJson(candidate),
      sanitizeJsonText(candidate),
      repairJson(sanitizeJsonText(candidate)),
    ];

    for (const variant of variants) {
      try {
        return JSON.parse(variant) as T;
      } catch {
        // try next variant
      }
    }
  }

  throw new LLMError(`大模型返回的 JSON 无法解析（尝试了 ${candidates.length} 段内容）`);
}

function collectJsonCandidates(text: string): string[] {
  const trimmed = text.trim();
  const candidates = new Set<string>();

  for (const block of trimmed.matchAll(/```(?:json)?\s*([\s\S]*?)```/gi)) {
    if (block[1]?.trim()) candidates.add(block[1].trim());
  }

  if (trimmed) candidates.add(trimmed);

  const objectStart = trimmed.indexOf("{");
  const objectEnd = trimmed.lastIndexOf("}");
  if (objectStart !== -1 && objectEnd > objectStart) {
    candidates.add(trimmed.slice(objectStart, objectEnd + 1));
  }

  return [...candidates];
}

function sanitizeJsonText(json: string): string {
  return json
    .replace(/[\u201c\u201d]/g, '"')
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/\r\n/g, "\n")
    .replace(/,\s*([}\]])/g, "$1");
}

function repairJson(json: string): string {
  let repaired = sanitizeJsonText(json.trim());

  if (repaired.endsWith("}") || repaired.endsWith("]")) return repaired;

  const stack: string[] = [];
  let inString = false;
  let escaped = false;

  for (const char of repaired) {
    if (inString) {
      if (escaped) {
        escaped = false;
        continue;
      }
      if (char === "\\") {
        escaped = true;
        continue;
      }
      if (char === '"') inString = false;
      continue;
    }

    if (char === '"') {
      inString = true;
      continue;
    }
    if (char === "{") stack.push("}");
    if (char === "[") stack.push("]");
    if (char === "}" || char === "]") stack.pop();
  }

  if (inString) repaired += '"';
  while (stack.length > 0) repaired += stack.pop();

  return repaired;
}

export function parseJSONFromMessage<T>(contents: string[]): T {
  const merged = contents.filter(Boolean).join("\n");
  if (!merged) throw new LLMError("大模型返回内容为空");

  for (const content of contents) {
    if (!content) continue;
    try {
      return parseJSONContent<T>(content);
    } catch {
      // try next segment
    }
  }

  return parseJSONContent<T>(merged);
}
