// src/components/DateRangePicker.tsx
"use client";

import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DateRangePickerProps {
  range: [Date, Date];
  onChange: (range: [Date, Date]) => void;
}

export default function DateRangePicker({
  range,
  onChange,
}: DateRangePickerProps) {
  return (
    <div className="mb-6">
      <DatePicker
        selectsRange
        startDate={range[0]}
        endDate={range[1]}
        onChange={(dates) => {
          if (Array.isArray(dates) && dates[0] && dates[1]) {
            onChange([dates[0], dates[1]]);
          }
        }}
        className="border border-gray-300 rounded px-3 py-2"
        dateFormat="yyyy-MM-dd"
      />
    </div>
  );
}
