"use client";

import styles from "@/components/calendar/calendar-style.module.css";
import { useCalendar } from "./calendar-data-access";
import { useMemo } from "react";

export function Layout({ children }) {
  return <div className={styles.layout}>{children}</div>;
}

export function Header() {
  const { setMonth } = useCalendar();

  return (
    <header className={styles.header}>
      <SwitchMonthButton text="<" setMonth={() => setMonth(-1)} />
      <FormatYearMonth />
      <SwitchMonthButton text=">" setMonth={() => setMonth(1)} />
    </header>
  );
}

export function FormatYearMonth() {
  const { timestamp } = useCalendar();

  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  return (
    <span>
      {year} 年 {month} 月
    </span>
  );
}

export function SwitchMonthButton({ text, setMonth }) {
  return (
    <div className={styles.month_select} onClick={setMonth}>
      {text}
    </div>
  );
}

export function Body() {
  const { monthDatesData } = useCalendar();
  return (
    <div>
      <ul className={styles.day_button_list}>
        {monthDatesData.map((el, i) => (
          <DateButton key={el} timestamp={el} />
        ))}
      </ul>
    </div>
  );
}

export function DateButton({ timestamp }) {
  const { dateRange, setRange } = useCalendar();
  const isInRange = useMemo(() => {
    if (dateRange[0] === null || dateRange[0] > timestamp) return false;
    if (dateRange[0] === timestamp) return true;
    if (dateRange[1] < timestamp) return false;
    if (dateRange[1] >= timestamp) return true;
  }, [dateRange]);

  return (
    <li
      className={isInRange ? styles.day_button_selected : styles.day_button}
      onClick={() => setRange(timestamp)}
    >
      {new Date(timestamp).getDate()}日
    </li>
  );
}
