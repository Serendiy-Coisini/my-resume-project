"use client";

import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EmptyState, EvidenceBadge, SectionTitle } from "@/components/shared/ui-helpers";
import { useResumeStore } from "@/store/resume-store";

export function MatchStep() {
  const { analysisResult, setCurrentStep } = useResumeStore();

  if (!analysisResult) {
    return <EmptyState message="请先完成输入材料并开始分析" />;
  }

  const { matchItems } = analysisResult;

  return (
    <div>
      <SectionTitle
        title="匹配分析"
        description="逐条对比 JD 要求与简历证据，识别缺口与优化方向"
      />

      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">JD 要求 vs 简历证据</CardTitle>
        </CardHeader>
        <CardContent className="p-0 pb-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[140px]">JD 要求</TableHead>
                <TableHead className="min-w-[180px]">简历证据</TableHead>
                <TableHead className="w-[70px]">证据强度</TableHead>
                <TableHead className="w-[80px]">是否补充</TableHead>
                <TableHead className="min-w-[160px]">优化建议</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {matchItems.map((item, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{item.jdRequirement}</TableCell>
                  <TableCell className="text-neutral-600">{item.resumeEvidence}</TableCell>
                  <TableCell>
                    <EvidenceBadge strength={item.evidenceStrength} />
                  </TableCell>
                  <TableCell>
                    <Badge variant={item.needsSupplement ? "warning" : "success"}>
                      {item.needsSupplement ? "需补充" : "已覆盖"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-neutral-600">{item.optimizationSuggestion}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button variant="outline" size="sm" onClick={() => setCurrentStep("follow-up")}>
          下一步：经历追问
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
