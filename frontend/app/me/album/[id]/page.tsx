"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Button, Typography } from "@material-tailwind/react";
import ArrowLeftIcon from "../../../../components/atoms/icons/ArrowLeft/ArroLeft";
import Link from "next/link";

interface ArtistData {
  id: string;
  name: string;
}

interface TrackData {
  id: string;
  name: string;
  duration_ms: number;
}

interface AlbumData {
  id: string;
  images: { url: string }[];
  release_date: string;
  name: string;
  artists: ArtistData[];
  album_type: string;
  copyrights: { text: string }[];
  total_tracks: number;
  tracks: { items: TrackData[] };
  total_duration: string;
}

const TABLE_HEAD = ["#", "Song Name", "Duration"];

export default function Artist() {
  const [albumData, setAlbumData] = useState<AlbumData>();
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const router = useRouter();
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
        (acc: number, item: TrackData) => (acc += item.duration_ms),
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
      <div className=" flex  w-10/12 mb-4 ">
        <Button
          isPill
          className="hover:bg-slate-50 hover:text-spotify-green"
          onClick={() => {
            router.back();
          }}
        >
          {" "}
          <ArrowLeftIcon className="h-6 w-6" /> Go back
        </Button>
      </div>

      <section className=" flex  w-10/12 justify-between">
        {!isLoading && albumData && (
          <>
            <div className="w-1/3 flex-col flex">
              <img
                src={albumData.images[0].url}
                alt=""
                className="w-full pb-2"
              />
              <Typography type="h3" className=" mb-2">
                {albumData.name}
              </Typography>
              <Typography type="p" className=" mb-2 font-semibold text-lg">
                {"By: "}
                {albumData.artists.map((artist, index) => (
                  <Link
                    key={artist.id}
                    href={`/me/artist/${artist.id}`}
                    className=" underline"
                  >
                    {artist.name +
                      (index < albumData.artists.length - 1 ? ", " : "")}
                  </Link>
                ))}
              </Typography>
              <Typography type="p" className=" mb-2 font-semibold text-lg">
                {"Year: " + albumData.release_date.split("-")[0]}
              </Typography>

              <Typography type="p" className=" mb-2 font-semibold text-lg">
                {"Number of songs: " + albumData.total_tracks}
              </Typography>

              <Typography type="p" className=" mb-8 font-semibold text-lg">
                {"Total duration: " + albumData.total_duration}
              </Typography>
            </div>
            <div className="w-7/12  flex-col flex">
              <Typography type="h2" className=" mb-8">
                Album Songs
              </Typography>
              <table className="w-full">
                <thead className="border-b border-surface bg-surface-light text-sm font-medium text-foreground dark:bg-surface-dark">
                  <tr>
                    {TABLE_HEAD.map((head) => (
                      <th
                        key={head}
                        className="px-2.5 py-2 text-center  font-medium"
                      >
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="group text-sm text-black dark:text-white">
                  {albumData.tracks.items.map((track, index) => {
                    const trackDurationSeconds = Math.trunc(
                      track.duration_ms / 1000
                    );
                    const trackDurationMinutes = Math.trunc(
                      trackDurationSeconds / 60
                    );
                    const trackDurationString = `${trackDurationMinutes}:${(
                      trackDurationSeconds -
                      trackDurationMinutes * 60
                    )
                      .toString()
                      .padStart(2, "0")}`;
                    return (
                      <tr
                        key={index}
                        className="border-b  border-surface last:border-0"
                      >
                        <td className="text-center py-2">{index + 1}</td>
                        <td className=" py-2">{track.name}</td>
                        <td className="text-center py-2">
                          {trackDurationString}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </section>
    </main>
  );
}
