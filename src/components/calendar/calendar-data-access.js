"use client";

import React, { createContext, useState, useContext, useMemo } from "react";

const CalendarContext = createContext();

export function CalendarProvider({ value, children }) {
  const timestampState = useState(new Date().getTime());
  const dateRangeState = useState([null, null]);
  return (
    <CalendarContext.Provider
      value={{ ...value, timestampState, dateRangeState }}
    >
      {children}
    </CalendarContext.Provider>
  );
}

export function useCalendarContext() {
  const context = useContext(CalendarContext);
  if (context === undefined) {
    throw new Error(
      "useCalendarContext must be used within a CalendarProvider"
    );
  }

  return context;
}

export function useCalendar() {
  const {
    timestampState: [timestamp, setTimestamp],
    dateRangeState: [dateRange, setDateRangeState],
    switchMonth,
  } = useCalendarContext();
  const monthDatesData = useGetMonthDatesData(timestamp);

  const setMonth = (quantity) => {
    setTimestamp((prev) => {
      if (!switchMonth) return prev;
      const date = new Date(prev);
      date.setMonth(date.getMonth() + quantity);
      const newTimestamp = date.getTime();
      return newTimestamp;
    });
  };

  const setRange = (timestamp) => {
    setDateRangeState((prev) => {
      const newDateRange = [...prev];
      if (!prev[0]) {
        newDateRange[0] = timestamp;
        return newDateRange;
      }
      if (prev[0] <= timestamp) {
        newDateRange[1] = timestamp;
        return newDateRange;
      }
      if (prev[0] > timestamp) return [null, null];
    });
  };

  return { timestamp, setMonth, monthDatesData, dateRange, setRange };
}

export function useGetMonthDatesData(timestamp) {
  return useMemo(() => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = new Date(year, month, 0);

    if (day.getDay() !== 6) day.setDate(day.getDate() - day.getDay());
    else day.setDate(day.getDate() + 1);

    const timestampData = [];
    for (let i = 0; i < 35; i++) {
      timestampData.push(day.getTime());
      day.setDate(day.getDate() + 1);
    }

    return timestampData;
  }, [timestamp]);
}
