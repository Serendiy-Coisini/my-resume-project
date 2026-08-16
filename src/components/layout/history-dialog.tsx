"use client";

import { useState } from "react";
import { History, RotateCcw, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useHistoryStore } from "@/store/history-store";
import { useResumeStore } from "@/store/resume-store";

function formatTime(ts: number): string {
  return new Date(ts).toLocaleString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function HistoryDialog() {
  const [open, setOpen] = useState(false);
  const sessions = useHistoryStore((s) => s.sessions);
  const deleteSession = useHistoryStore((s) => s.deleteSession);
  const clearAll = useHistoryStore((s) => s.clearAll);
  const restoreFromHistory = useResumeStore((s) => s.restoreFromHistory);

  const handleRestore = (id: string) => {
    const session = sessions.find((s) => s.id === id);
    if (!session) return;
    restoreFromHistory(session);
    setOpen(false);
  };

  const handleClearAll = () => {
    if (window.confirm("确定要清空全部历史记录吗？此操作不可恢复。")) {
      clearAll();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 text-xs text-neutral-700 px-2">
          <History className="h-3 w-3 sm:mr-1" />
          <span className="hidden sm:inline">历史记录</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl text-neutral-900">
        <DialogHeader>
          <DialogTitle className="text-left text-lg font-bold text-neutral-900">历史分析记录</DialogTitle>
          <DialogDescription className="text-left text-xs sm:text-sm text-neutral-600">
            开始新的分析或重新开始时会自动保存当前分析，最多保留 20 条。
          </DialogDescription>
        </DialogHeader>

        {sessions.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-10 text-center text-sm text-neutral-600">
            <History className="h-8 w-8 text-neutral-400" />
            <p className="font-medium text-neutral-800">暂无历史记录</p>
            <p className="text-xs text-neutral-500">完成一次分析后，开启新分析时会在此时自动保存。</p>
          </div>
        ) : (
          <>
            <ScrollArea className="max-h-[55vh] pr-3">
              <div className="flex flex-col gap-3">
                {sessions.map((session) => (
                  <div
                    key={session.id}
                    className="rounded-lg border border-neutral-200 bg-neutral-50/50 p-3.5 transition-colors hover:border-neutral-300 hover:bg-neutral-50"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-neutral-900">
                          {session.targetRole || "未命名岗位"}
                        </p>
                        <p className="mt-1 line-clamp-2 text-xs text-neutral-600 leading-relaxed">
                          {session.jdExcerpt}
                        </p>
                        <p className="mt-2 text-[11px] text-neutral-500">
                          {formatTime(session.createdAt)}
                          {session.analysisResult.diagnosis
                            ? ` · 综合评分 ${session.analysisResult.diagnosis.overallScore} 分`
                            : ""}
                        </p>
                      </div>
                      <div className="flex shrink-0 items-center gap-1.5">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 px-2.5 text-xs font-medium text-neutral-700 hover:text-neutral-900 border-neutral-300 bg-white hover:bg-neutral-100 shadow-2xs"
                          onClick={() => handleRestore(session.id)}
                        >
                          <RotateCcw className="mr-1 h-3 w-3 text-neutral-600" />
                          恢复
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0 text-neutral-400 hover:text-red-600 hover:bg-red-50"
                          onClick={() => deleteSession(session.id)}
                          aria-label="删除该记录"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <Separator className="bg-neutral-200" />
            <div className="flex justify-end">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 text-xs text-neutral-500 hover:text-red-600 hover:bg-red-50"
                onClick={handleClearAll}
              >
                <Trash2 className="mr-1 h-3 w-3" />
                清空全部
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
