import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 开发模式下的调试指示器配置
  devIndicators: {
    appIsrStatus: false, // 隐藏 ISR/静态状态指示
  },
};

export default nextConfig;
