"use client";

import { StepSidebar } from "@/components/layout/step-sidebar";
import { TopNav } from "@/components/layout/top-nav";
import { StepContent } from "@/components/steps/step-content";

export function AppShell() {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <TopNav />
      <div className="flex flex-1 overflow-hidden">
        <StepSidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-5xl p-6">
            <StepContent />
          </div>
        </main>
      </div>
    </div>
  );
}
