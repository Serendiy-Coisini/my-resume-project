import type { EvidenceStrength } from "@/types/resume";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const STRENGTH_CONFIG: Record<
  EvidenceStrength,
  { label: string; variant: "success" | "warning" | "danger" | "secondary" }
> = {
  strong: { label: "强", variant: "success" },
  medium: { label: "中", variant: "warning" },
  weak: { label: "弱", variant: "danger" },
  none: { label: "无", variant: "secondary" },
};

export function EvidenceBadge({ strength }: { strength: EvidenceStrength }) {
  const config = STRENGTH_CONFIG[strength];
  return <Badge variant={config.variant}>{config.label}</Badge>;
}

export function ImportanceBadge({ importance }: { importance: "high" | "medium" | "low" }) {
  const map = {
    high: { label: "高", variant: "default" as const },
    medium: { label: "中", variant: "secondary" as const },
    low: { label: "低", variant: "outline" as const },
  };
  const config = map[importance];
  return <Badge variant={config.variant}>{config.label}</Badge>;
}

export function ScoreRing({ score, size = "lg" }: { score: number; size?: "sm" | "lg" }) {
  const color =
    score >= 70 ? "text-emerald-600" : score >= 50 ? "text-amber-600" : "text-red-600";

  return (
    <div className={`flex flex-col items-center ${size === "lg" ? "gap-1" : ""}`}>
      <span className={`font-semibold tabular-nums ${color} ${size === "lg" ? "text-4xl" : "text-xl"}`}>
        {score}
      </span>
      {size === "lg" && <span className="text-xs text-neutral-500">匹配度</span>}
    </div>
  );
}

export function SectionTitle({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold tracking-tight text-neutral-900">{title}</h2>
      {description && <p className="mt-1 text-sm text-neutral-500">{description}</p>}
    </div>
  );
}

export function ListSection({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      {title ? (
        <h3 className="mb-2 text-sm font-medium text-neutral-900">{title}</h3>
      ) : null}
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2 text-sm text-neutral-600">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-neutral-400" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function KeywordTags({ keywords }: { keywords: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {keywords.map((kw) => (
        <Badge key={kw} variant="outline" className="font-normal">
          {kw}
        </Badge>
      ))}
    </div>
  );
}

export function EmptyState({
  message,
  actionLabel,
  onAction,
}: {
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className="flex h-64 flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-neutral-200 bg-neutral-50/50">
      <p className="text-sm text-neutral-500">{message}</p>
      {actionLabel && onAction && (
        <Button variant="outline" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
