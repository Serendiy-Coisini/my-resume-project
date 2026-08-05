"use client";

import { useState } from "react";
import { StepSidebar } from "@/components/layout/step-sidebar";
import { TopNav } from "@/components/layout/top-nav";
import { StepContent } from "@/components/steps/step-content";
import { useResumeStore } from "@/store/resume-store";
import type { StepId } from "@/types/resume";

export function AppShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-neutral-50/50">
      <TopNav onMenuClick={() => setSidebarOpen(true)} />
      <div className="flex flex-1 overflow-hidden relative">
        {/* Desktop sidebar — always visible on md+ */}
        <div className="hidden md:flex">
          <StepSidebar />
        </div>

        {/* Mobile sidebar overlay drawer */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-neutral-900/60 backdrop-blur-xs transition-opacity"
              onClick={() => setSidebarOpen(false)}
            />
            {/* Sidebar drawer content */}
            <div className="relative z-10 w-72 max-w-[85vw] h-full bg-white shadow-2xl flex flex-col transform transition-transform duration-200">
              <StepSidebar onStepClick={() => setSidebarOpen(false)} isMobileDrawer onClose={() => setSidebarOpen(false)} />
            </div>
          </div>
        )}

        <main className="flex-1 flex flex-col overflow-y-auto min-w-0">
          {/* Mobile Horizontal Step Bar for quick navigation on mobile */}
          <div className="block md:hidden border-b border-neutral-200 bg-white px-3 py-2 shrink-0 shadow-2xs">
            <MobileStepBar />
          </div>

          <div className="mx-auto w-full max-w-5xl p-3 sm:p-6 flex-1">
            <StepContent />
          </div>
        </main>
      </div>
    </div>
  );
}

function MobileStepBar() {
  const { currentStep, setCurrentStep, getStepStatus } = useResumeStore();
  const steps: { id: StepId; label: string }[] = [
    { id: "input", label: "材料" },
    { id: "jd-analysis", label: "JD解析" },
    { id: "diagnosis", label: "诊断" },
    { id: "match", label: "匹配" },
    { id: "follow-up", label: "追问" },
    { id: "optimize", label: "优化" },
    { id: "interview", label: "面试" },
    { id: "export", label: "导出" },
  ];

  return (
    <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 text-xs">
      {steps.map((step, idx) => {
        const status = getStepStatus(step.id);
        const isActive = step.id === currentStep;
        const isDisabled = status === "disabled";

        return (
          <button
            key={step.id}
            disabled={isDisabled}
            onClick={() => !isDisabled && setCurrentStep(step.id)}
            className={`flex shrink-0 items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium transition-all ${
              isActive
                ? "bg-blue-600 text-white font-semibold shadow-xs"
                : isDisabled
                ? "bg-neutral-100 text-neutral-300 cursor-not-allowed"
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
            }`}
          >
            <span>0{idx + 1}.</span>
            <span>{step.label}</span>
          </button>
        );
      })}
    </div>
  );
}

