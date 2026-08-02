"use client";

import { useState } from "react";
import { StepSidebar } from "@/components/layout/step-sidebar";
import { TopNav } from "@/components/layout/top-nav";
import { StepContent } from "@/components/steps/step-content";

export function AppShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <TopNav onMenuClick={() => setSidebarOpen(true)} />
      <div className="flex flex-1 overflow-hidden">
        {/* Desktop sidebar — always visible on md+ */}
        <div className="hidden md:flex">
          <StepSidebar />
        </div>

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setSidebarOpen(false)}
            />
            <div className="relative z-10 h-full">
              <StepSidebar onStepClick={() => setSidebarOpen(false)} />
            </div>
          </div>
        )}

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-5xl p-4 sm:p-6">
            <StepContent />
          </div>
        </main>
      </div>
    </div>
  );
}
