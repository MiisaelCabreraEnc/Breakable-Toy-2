"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import { Typography } from "@material-tailwind/react";
import HorizontalScroll from "../../../components/organisms/HorizontalScroll/HorizontalScroll";
import GoBack from "../../../components/molecules/GoBack/GoBack";
import Artist from "../../../interfaces/Artist";
import Album from "../../../Interfaces/Album";
import Track from "../../../interfaces/Track";

export default function Dashboard() {
  const [artists, setArtists] = useState<Artist[]>();
  const [tracks, setTracks] = useState<Track[]>();
  const [albums, setAlbums] = useState<Album[]>();
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const type = searchParams.get("type");

  const fetchSearchResults = async () => {
    try {
      const token = Cookies.get("token");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URI}/me/search?query=${query}&type=${type}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            credentials: "include",
          },
        }
      );

      const responseData = await response.json();

      if (responseData.artists) setArtists(responseData.artists.items);
      if (responseData.tracks) setTracks(responseData.tracks.items);
      if (responseData.albums) {
        const updatedDatesData = responseData.albums.items.map(
          (album: Album) => ({
            ...album,
            release_date: album.release_date.split("-")[0],
          })
        );
        setAlbums(updatedDatesData);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSearchResults();
  }, []);

  return (
    <main className="p-8 min-h-screen bg-gradient-to-tr from-slate-900 to-spotify-green flex flex-col items-center">
      <GoBack></GoBack>
      {!isLoading && (
        <>
          <Typography type="h1" className="w-10/12 mb-8">
            {`Search results for "${query}"`}
          </Typography>
          <div className="flex flex-col w-10/12">
            {artists && (
              <>
                <Typography type="h3" className="w-10/12 mb-4">
                  Artists
                </Typography>
                <HorizontalScroll cards={artists} type="artist" />
              </>
            )}
            {albums && (
              <>
                <Typography type="h3" className="w-10/12 mb-4">
                  Albums
                </Typography>
                <HorizontalScroll
                  cards={albums}
                  type="album"
                ></HorizontalScroll>
              </>
            )}
            {tracks && (
              <>
                <Typography type="h3" className="w-10/12 mb-4">
                  Tracks
                </Typography>
                <HorizontalScroll cards={tracks} type="track" />
              </>
            )}
          </div>
        </>
      )}
    </main>
  );
}
