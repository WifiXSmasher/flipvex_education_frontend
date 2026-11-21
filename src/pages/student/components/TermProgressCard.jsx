import React from "react";
import { Icon } from "@iconify/react";

export default function TermProgressCard({
  term = "Spring 2026",
  courseName = "Product Design",
  batchCode = "Batch PD-26B",
  regNumber = "REG-LNV-24018",
  completedModules = 12,
  totalModules = 16,
  compact = false,
  className = "",
  
}) {
  const percentage =
    totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;

  return (
    <div
      className={`rounded-2xl bg-primary text-primary-foreground shadow-md ${
        compact ? "p-3.5" : "p-5"
      } ${className}`}
    >
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em]">
          {term}
        </p>
        <span className="text-[11px] font-bold text-secondary">{percentage}%</span>
      </div>

      <p
        className={`font-heading font-bold ${
          compact ? "mt-1.5 text-sm" : "mt-3 text-lg"
        }`}
      >
        {courseName}
      </p>

      {!compact && (
        <p className="mt-1 text-xs">
          {batchCode} · {regNumber}
        </p>
      )}

      <div
        className={`overflow-hidden rounded-full bg-card ${
          compact ? "mt-2.5 h-1.5" : "mt-4 h-2"
        }`}
      >
        <div
          className="h-full rounded-full bg-secondary transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className={`flex items-center justify-between text-xs ${compact ? "mt-2 text-[10px]" : "mt-3"}`}>
        <span>
          {completedModules} of {totalModules} modules
        </span>
        {!compact && <span className="font-bold">{percentage}%</span>}
      </div>
    </div>
  );
}