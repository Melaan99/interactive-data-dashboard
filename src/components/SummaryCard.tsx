// src/components/SummaryCard.tsx
import React from "react";

interface SummaryCardProps {
  title: string;
  value: number | string;
  suffix?: string; // e.g. “%” or “$”
}

export default function SummaryCard({
  title,
  value,
  suffix = "",
}: SummaryCardProps) {
  return (
    <div className="bg-white shadow rounded-lg p-4 flex flex-col">
      <span className="text-sm font-medium text-gray-500">{title}</span>
      <span className="mt-2 text-2xl font-bold text-gray-900">
        {value}
        <span className="text-lg font-normal text-gray-500">{suffix}</span>
      </span>
    </div>
  );
}
