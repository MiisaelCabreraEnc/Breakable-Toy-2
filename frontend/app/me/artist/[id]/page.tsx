"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Button, Card, Typography } from "@material-tailwind/react";
import ArrowLeftIcon from "../../../../components/atoms/icons/ArrowLeft/ArroLeft";
import Link from "next/link";

interface ArtistData {
  id: string;
  name: string;
  images: { url: string }[];
  followers: string;
  genres: string[];
}

interface TrackData {
  id: string;
  name: string;
  album: AlbumData;
  duration_ms: number;
}

interface AlbumData {
  id: string;
  images: { url: string }[];
  release_date: string;
  name: string;
}

const TABLE_HEAD = ["#", "Album", "Song Name", "Duration"];

export default function Artist() {
  const [artistData, setArtistData] = useState<ArtistData>();
  const [artistTracks, setArtistTracks] = useState<TrackData[]>();
  const [artistAlbums, setArtistAlbums] = useState<AlbumData[]>();
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const router = useRouter();
  const artistId = params.id;

  const fetchArtistData = async () => {
    try {
      const token = Cookies.get("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URI}/me/artists/${artistId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            credentials: "include",
          },
        }
      );
      const responseData = await response.json();

      if (responseData.followers.total > 100000)
        responseData.followers =
          (responseData.followers.total / 1000000).toFixed(1).toString() + " M";
      else if (responseData.followers.total > 1000)
        responseData.followers =
          (responseData.followers.total / 1000).toFixed(1).toString() + " K";
      else responseData.followers = responseData.followers.total.toString();

      setArtistData(responseData);
    } catch (error) {
      console.error(error);
    } finally {
      fetchArtistTracks();
    }
  };

  const fetchArtistTracks = async () => {
    try {
      const token = Cookies.get("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URI}/me/artists/top/tracks/${artistId}?limit=5`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            credentials: "include",
          },
        }
      );
      const responseData = await response.json();

      setArtistTracks(responseData.tracks);
    } catch (error) {
      console.error(error);
    } finally {
      fetchArtistAlbums();
    }
  };

  const fetchArtistAlbums = async () => {
    try {
      const token = Cookies.get("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URI}/me/artists/albums/${artistId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            credentials: "include",
          },
        }
      );
      const responseData = await response.json();
      setArtistAlbums(responseData.items);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArtistData();
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
        {!isLoading && artistData && artistTracks && (
          <>
            <div className="w-1/3 flex-col flex">
              <img
                src={
                  artistData.images.length > 0
                    ? artistData.images[0].url
                    : "/Avatar.jpg"
                }
                alt=""
                className="w-full pb-2"
              />
              <div className="flex lg:flex-row flex-col lg:items-end justify-between">
                <Typography type="h1" className=" mb-2">
                  {artistData.name}
                </Typography>
                <Typography type="p" className=" mb-2 text-center">
                  {artistData.followers + " Followers"}
                </Typography>
              </div>
              <Typography type="p" className=" mb-8 font-semibold text-lg">
                {artistData.genres.map((genre, index) => (
                  <span className="capitalize" key={genre}>
                    {genre +
                      (index !== artistData.genres.length - 1 ? ", " : "")}
                  </span>
                ))}
              </Typography>
            </div>
            <div className="w-7/12  flex-col flex">
              <Typography type="h2" className=" mb-8">
                Popular Songs
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
                  {artistTracks.map((track, index) => {
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
                        <td className="text-center">{index + 1}</td>
                        <td className="text-center">
                          <Link href={`/me/album/${track.album.id}`}>
                            <img
                              src={track.album.images[0].url}
                              className="w-24 m-auto py-2 hover:scale-105 transition-all duration-300 ease-in-out"
                              alt=""
                            />
                          </Link>
                        </td>
                        <td className="text-center">{track.name}</td>
                        <td className="text-center">{trackDurationString}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </section>
      {!isLoading && artistAlbums && (
        <section className="flex flex-col w-10/12">
          <Typography type="h2" className=" mb-8">
            Discography
          </Typography>
          <div className="flex overflow-x-scroll py-4">
            {artistAlbums.map((album) => (
              <Link
                href={`/me/album/${album.id}`}
                key={album.id}
                className=" hover:scale-105 transition-all ease-in-out duration-300 mx-2"
              >
                <Card className="flex w-32 flex-col">
                  <Card.Header
                    as="img"
                    src={album.images[0].url}
                    alt="album-picture"
                    className=" m-auto"
                  />
                  <Card.Body className="text-center p-4">
                    <div>
                      <Typography className="capitalize text-sm font-semibold truncate">
                        {album.name}
                      </Typography>
                      <Typography className="text-xs">
                        {album.release_date.split("-")[0]}
                      </Typography>
                    </div>
                  </Card.Body>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
