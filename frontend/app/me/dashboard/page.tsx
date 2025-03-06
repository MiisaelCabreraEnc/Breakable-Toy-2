"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Typography } from "@material-tailwind/react";
import DashboardCard from "../../../components/molecules/DashboardCard/DashboardCard";

interface artist {
  id: string;
  name: string;
  images: { url: string }[];
  genres: string[];
}

export default function Dashboard() {
  const [artists, setArtists] = useState<artist[]>();
  const router = useRouter();

  const fetchArtistsData = async () => {
    try {
      const token = Cookies.get("token");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URI}/me/top/artists`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            credentials: "include",
          },
        }
      );

      const responseData = await response.json();

      setArtists(responseData.items);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchArtistsData();
  }, []);

  return (
    <main className="p-8 min-h-screen bg-gradient-to-tr from-slate-900 to-spotify-green flex flex-col justify-center items-center">
      <section className=" flex flex-col w-10/12 ">
        <Typography type="h1" className=" mb-8">
          My top artists
        </Typography>
        {artists && (
          <div className="lg:grid-cols-5 md:grid-cols-3 grid-cols-1 grid gap-4 ">
            {artists.map((artist) => (
              <DashboardCard
                key={artist.id}
                {...artist}
                image={artist.images[0].url}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
