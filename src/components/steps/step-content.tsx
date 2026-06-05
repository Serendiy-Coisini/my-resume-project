"use client";

import { useResumeStore } from "@/store/resume-store";
import { InputStep } from "@/components/steps/input-step";
import { JDAnalysisStep } from "@/components/steps/jd-analysis-step";
import { DiagnosisStep } from "@/components/steps/diagnosis-step";
import { MatchStep } from "@/components/steps/match-step";
import { FollowUpStep } from "@/components/steps/follow-up-step";
import { OptimizeStep } from "@/components/steps/optimize-step";
import { FinalResumeStep } from "@/components/steps/final-resume-step";
import { InterviewStep } from "@/components/steps/interview-step";
import { ExportStep } from "@/components/steps/export-step";

export function StepContent() {
  const currentStep = useResumeStore((s) => s.currentStep);

  switch (currentStep) {
    case "input":
      return <InputStep />;
    case "jd-analysis":
      return <JDAnalysisStep />;
    case "diagnosis":
      return <DiagnosisStep />;
    case "match":
      return <MatchStep />;
    case "follow-up":
      return <FollowUpStep />;
    case "optimize":
      return <OptimizeStep />;
    case "final-resume":
      return <FinalResumeStep />;
    case "interview":
      return <InterviewStep />;
    case "export":
      return <ExportStep />;
    default:
      return <InputStep />;
  }
}
