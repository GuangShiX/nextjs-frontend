import type { Metadata } from "next";
import "../styles/globals.scss";

export const metadata: Metadata = {
  title: "刘鼎杯比赛 - Next.js 项目",
  description: "基于 Next.js + React + Sass 构建的现代化纯前端应用",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>
        {children}
      </body>
    </html>
  );
}
