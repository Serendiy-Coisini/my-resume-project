import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "简历制作器 - 独立简历设计",
  description: "拖拽式积木简历制作器，自由布局，多种模板，一键导出高清PDF",
};

export default function DesignerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
