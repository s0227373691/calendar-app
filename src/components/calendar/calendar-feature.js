"use client";

import { Header, Layout, Body } from "@/components/calendar/calendar-ui";
import { CalendarProvider } from "./calendar-data-access";

export default function ({ switchMonth }) {
  return (
    <CalendarProvider value={{ switchMonth }}>
      <UI />
    </CalendarProvider>
  );
}

function UI() {
  return (
    <Layout>
      <Header />
      <Body />
    </Layout>
  );
}
