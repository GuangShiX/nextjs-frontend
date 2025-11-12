/**
 * Card 组件系统 - 统一卡片、标题、统计数据样式
 */
import React from 'react';

// 基础卡片组件
interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Card({ children, className = '', onClick }: CardProps) {
  return (
    <div
      className={`rounded-2xl bg-slate-900/60 ring-1 ring-white/10 backdrop-blur-sm p-5 md:p-6 ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

// 卡片标题
interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function CardTitle({ children, className = '' }: CardTitleProps) {
  return (
    <h3 className={`text-lg font-semibold tracking-tight text-white ${className}`}>
      {children}
    </h3>
  );
}

// 统计数据组件
interface StatProps {
  label: string;
  value: string | number;
  unit?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function Stat({ label, value, unit, trend, className = '' }: StatProps) {
  return (
    <div className={`text-center space-y-1 ${className}`}>
      <div className="text-3xl md:text-4xl font-bold leading-tight text-white tabular-nums">
        {value}
        {unit && <span className="text-xl md:text-2xl text-slate-400 ml-1">{unit}</span>}
      </div>
      {trend && (
        <div
          className={`text-xs font-medium ${
            trend.isPositive ? 'text-green-400' : 'text-red-400'
          }`}
        >
          {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
        </div>
      )}
      <div className="text-xs text-slate-400">{label}</div>
    </div>
  );
}

// 节标题（用于页面区块）
interface SectionTitleProps {
  children: React.ReactNode;
  subtitle?: string;
  className?: string;
}

export function SectionTitle({ children, subtitle, className = '' }: SectionTitleProps) {
  return (
    <div className={`text-center space-y-3 ${className}`}>
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
        {children}
      </h2>
      {subtitle && (
        <p className="text-sm md:text-base text-slate-300 max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}

// 页面标题（用于页面顶部）
interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export function PageHeader({ title, description, className = '' }: PageHeaderProps) {
  return (
    <div className={`text-center space-y-3 ${className}`}>
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white">
        {title}
      </h1>
      {description && (
        <p className="text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-7">
          {description}
        </p>
      )}
    </div>
  );
}
