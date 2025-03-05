"use client";
import { Suspense } from "react";
import SearchPage from "./SearchPage";

export default function DashboardWrapper() {
  return (
    <Suspense fallback={<p>Loading search...</p>}>
      <SearchPage />
    </Suspense>
  );
}
