"use client";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Cookies from "js-cookie";

export default function Callback() {
  const router = useRouter();

  const fetchToken = async () => {
    try {
      const code = new URLSearchParams(window.location.search).get("code");
      if (code) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URI}/auth/callback?code=${code}`
        );
        const data = await res.json();
        Cookies.set("token", data.access_token, { expires: 1 / 24 });
        router.push("/me/dashboard");
      }
    } catch (error) {
      console.error(error);
      router.push("/");
    }
  };

  useEffect(() => {
    fetchToken();
  }, [router]);

  return (
    <main className="flex bg-gradient-to-tr from-slate-900 to-spotify-green flex-col p-8 h-screen  justify-center items-center">
      <CircularProgress
        color="inherit"
        className="text-spotify-green"
        size={"100px"}
      />
    </main>
  );
}
