"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Cookies from "js-cookie";
import GoBack from "../../../../components/molecules/GoBack/GoBack";
import AlbumData from "../../../../components/organisms/AlbumData/AlbumData";
import Artist from "../../../../interfaces/Artist";
import Track from "../../../../interfaces/Track";
import AlbumSongsTable from "../../../../components/organisms/AlbumSongsTable/AlbumSongsTable";

interface AlbumData {
  id: string;
  images: { url: string }[];
  release_date: string;
  name: string;
  artists: Artist[];
  album_type: string;
  copyrights: { text: string }[];
  total_tracks: number;
  tracks: { items: Track[] };
  total_duration: string;
}

const TABLE_HEAD = ["#", "Song Name", "Duration"];

export default function AlbumPage() {
  const [albumData, setAlbumData] = useState<AlbumData>();
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const albumId = params.id;

  const fetchAlbumData = async () => {
    try {
      const token = Cookies.get("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URI}/me/albums/${albumId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            credentials: "include",
          },
        }
      );
      const responseData = await response.json();
      const total_duration = responseData.tracks.items.reduce(
        (acc: number, item: Track) => (acc += item.duration_ms),
        0
      );

      const albumDurationSeconds = Math.trunc(total_duration / 1000);
      const albumDurationMinutes = Math.trunc(albumDurationSeconds / 60);

      responseData.total_duration = `${albumDurationMinutes}:${(
        albumDurationSeconds -
        albumDurationMinutes * 60
      )
        .toString()
        .padStart(2, "0")}`;

      setAlbumData(responseData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAlbumData();
  }, []);

  return (
    <main className="p-8 min-h-screen h-auto bg-gradient-to-tr from-slate-900 to-spotify-green flex flex-col  items-center">
      <GoBack />

      <section className=" flex  w-10/12 justify-between">
        {!isLoading && albumData && (
          <>
            <AlbumData {...albumData} image={albumData.images[0].url} />

            <AlbumSongsTable
              title={"Album Songs"}
              tracks={albumData.tracks.items}
              headings={TABLE_HEAD}
            />
          </>
        )}
      </section>
    </main>
  );
}
