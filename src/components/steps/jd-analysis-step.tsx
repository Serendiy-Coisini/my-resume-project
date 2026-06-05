"use client";

import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  EmptyState,
  ImportanceBadge,
  KeywordTags,
  ListSection,
  SectionTitle,
} from "@/components/shared/ui-helpers";
import { useResumeStore } from "@/store/resume-store";

export function JDAnalysisStep() {
  const { analysisResult, setCurrentStep } = useResumeStore();

  if (!analysisResult) {
    return <EmptyState message="请先完成输入材料并开始分析" />;
  }

  const { jdAnalysis } = analysisResult;

  return (
    <div>
      <SectionTitle
        title="JD 解析"
        description="从目标岗位描述中提取职责、要求、关键词与理想候选人画像"
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">岗位职责</CardTitle>
          </CardHeader>
          <CardContent>
            <ListSection title="" items={jdAnalysis.responsibilities} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">硬性要求</CardTitle>
          </CardHeader>
          <CardContent>
            <ListSection title="" items={jdAnalysis.hardRequirements} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">隐性要求</CardTitle>
          </CardHeader>
          <CardContent>
            <ListSection title="" items={jdAnalysis.implicitRequirements} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">关键词</CardTitle>
          </CardHeader>
          <CardContent>
            <KeywordTags keywords={jdAnalysis.keywords} />
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">理想候选人画像</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-neutral-600">{jdAnalysis.idealCandidate}</p>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">核心能力表</CardTitle>
        </CardHeader>
        <CardContent className="p-0 pb-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[140px]">能力</TableHead>
                <TableHead className="w-[60px]">重要性</TableHead>
                <TableHead>说明</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jdAnalysis.coreCompetencies.map((c) => (
                <TableRow key={c.name}>
                  <TableCell className="font-medium">{c.name}</TableCell>
                  <TableCell>
                    <ImportanceBadge importance={c.importance} />
                  </TableCell>
                  <TableCell className="text-neutral-600">{c.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button variant="outline" size="sm" onClick={() => setCurrentStep("diagnosis")}>
          下一步：简历诊断
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
