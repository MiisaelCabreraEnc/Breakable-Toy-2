"use client";
import { Suspense } from "react";
import CircularProgress from "../../../components/atoms/CiruclarProgress/CircularProgress";
import SearchPage from "./SearchPage";

export default function SearchPageWrapper() {
  return (
    <Suspense
      fallback={
        <CircularProgress className="border-8 h-32 w-32 border-spotify-green text-spotify-green" />
      }
    >
      <SearchPage />
    </Suspense>
  );
}
