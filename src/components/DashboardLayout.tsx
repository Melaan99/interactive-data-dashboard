// src/components/DashboardLayout.tsx
"use client";

import React, { useState, useEffect } from "react";
import { SalesPoint } from "@/lib/data";
import SummaryCard from "./SummaryCard";
import DateRangePicker from "./DateRangePicker";

interface DashboardLayoutProps {
  initialData: SalesPoint[];
}

export default function DashboardLayout({ initialData }: DashboardLayoutProps) {
  // 1. State: full dataset & date filter
  const [data, setData] = useState<SalesPoint[]>(initialData);
  const [filtered, setFiltered] = useState<SalesPoint[]>(initialData);
  const [range, setRange] = useState<[Date, Date]>([
    new Date(initialData[0].date),
    new Date(initialData[initialData.length - 1].date),
  ]);

  // 2. Re‑filter when range changes
  useEffect(() => {
    const [start, end] = range;
    setFiltered(
      data.filter(({ date }) => {
        const d = new Date(date);
        return d >= start && d <= end;
      })
    );
  }, [data, range]);

  // 3. KPI calculations
  const daysCount = filtered.length;
  const totalRevenue = filtered.reduce((sum, d) => sum + d.revenue, 0);
  const totalOrders = filtered.reduce((sum, d) => sum + d.orders, 0);
  const avgOrderValue = totalOrders ? totalRevenue / totalOrders : 0;
  const avgDailyRevenue = daysCount ? totalRevenue / daysCount : 0;
  const maxDayRevenue = Math.max(...filtered.map((d) => d.revenue));
  const minDayRevenue = Math.min(...filtered.map((d) => d.revenue));
  const totalSessions = filtered.reduce((sum, d) => sum + d.sessions, 0);
  const conversionRate = totalSessions
    ? (totalOrders / totalSessions) * 100
    : 0;
  const totalNewCustomers = filtered.reduce(
    (sum, d) => sum + d.newCustomers,
    0
  );

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <h1 className="text-4xl font-bold text-gray-900">
        E‑Commerce Sales Dashboard
      </h1>

      {/* Date Filter */}
      <DateRangePicker range={range} onChange={setRange} />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard
          title="Total Revenue"
          value={totalRevenue.toFixed(0)}
          suffix="$"
        />
        <SummaryCard title="Total Orders" value={totalOrders} />
        <SummaryCard
          title="Avg. Order Value"
          value={avgOrderValue.toFixed(2)}
          suffix="$"
        />
        <SummaryCard
          title="Avg. Daily Revenue"
          value={avgDailyRevenue.toFixed(0)}
          suffix="$"
        />
        <SummaryCard
          title="Max Day Revenue"
          value={maxDayRevenue.toFixed(0)}
          suffix="$"
        />
        <SummaryCard
          title="Min Day Revenue"
          value={minDayRevenue.toFixed(0)}
          suffix="$"
        />
        <SummaryCard
          title="Conversion Rate"
          value={conversionRate.toFixed(1)}
          suffix="%"
        />
        <SummaryCard title="New Customers" value={totalNewCustomers} />
      </div>

      {/* TODO: insert chart components here in a two‑column grid */}
    </div>
  );
}
