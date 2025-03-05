"use client";
import { useState, useEffect } from "react";
import SpotifyIcon from "../components/atoms/icons/Spotify/SpotifyIcon";
import { Button } from "@material-tailwind/react/dist/components/button";
import { Typography } from "@material-tailwind/react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Home() {
  const [sectionVisibility, setSectionVisibility] = useState(true);
  const router = useRouter();

  const handleLogin = async () => {
    setSectionVisibility(false);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/auth/spotify`, {
      method: "POST",
      credentials: "include",
    });

    const data = await res.json();
    window.location.href = data.auth_url;
  };

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) router.push("/me/dashboard");
  }, []);

  return (
    <main className="flex bg-gradient-to-tr from-slate-900 to-spotify-green flex-col p-8 h-screen  justify-center items-center">
      <div
        className={
          " relative flex m-auto w-1/2 h-1/2 bg-black bg-opacity-50  items-center flex-col justify-center rounded-lg overflow-hidden" +
          (sectionVisibility
            ? ""
            : " scale-0 transition-all ease-in-out duration-300")
        }
      >
        <div className=" h-full  absolute w-full  flex flex-col items-center justify-center">
          <SpotifyIcon className="h-24 w-24 text-spotify-green" />
          <Typography
            type="h1"
            className="m-8 md:text-2xl text-center font-bold"
          >
            Welcome to Spotify
          </Typography>
          <Button
            variant="ghost"
            isPill
            size="lg"
            className=" px-8 bg-spotify-green hover:bg-spotify-green-hovered transition-all ease-in duration-100"
            onClick={handleLogin}
          >
            Log In
          </Button>
        </div>
      </div>
    </main>
  );
}
