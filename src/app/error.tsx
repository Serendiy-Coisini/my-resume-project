"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Client-side exception caught by error boundary:", error);
  }, [error]);

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center p-6 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500">
        <AlertTriangle className="h-7 w-7" />
      </div>
      <h2 className="mb-2 text-lg font-semibold text-neutral-900">页面渲染遭遇异常</h2>
      <p className="mb-6 max-w-md text-sm text-neutral-500">
        {error.message || "前端运行状态发生意外错误，请尝试刷新或点击下方重试按钮。"}
      </p>
      <div className="flex gap-3">
        <Button onClick={() => reset()} className="gap-2">
          <RefreshCw className="h-4 w-4" />
          重新加载
        </Button>
        <Button variant="outline" onClick={() => (window.location.href = "/")}>
          返回首页
        </Button>
      </div>
    </div>
  );
}
