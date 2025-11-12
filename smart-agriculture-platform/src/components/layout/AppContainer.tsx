/**
 * AppContainer - 全局统一容器组件
 * 用于统一所有页面的宽度和内边距，消除右侧留白
 */
import React from 'react';

interface AppContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function AppContainer({ children, className = '' }: AppContainerProps) {
  return (
    <div
      className={`max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-10 xl:px-16 2xl:px-20 ${className}`}
    >
      {children}
    </div>
  );
}
