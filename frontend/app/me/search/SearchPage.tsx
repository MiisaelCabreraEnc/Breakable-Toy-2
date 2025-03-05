"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";
import { Button, Card, Typography } from "@material-tailwind/react";
import ArrowLeftIcon from "../../../components/atoms/icons/ArrowLeft/ArroLeft";

interface Artist {
  id: string;
  name: string;
  images: { url: string }[];
  genres: string[];
}

interface Album {
  id: string;
  name: string;
  images: { url: string }[];
}

interface Track {
  id: string;
  name: string;
  album: Album;
}

export default function Dashboard() {
  const [artists, setArtists] = useState<Artist[]>();
  const [tracks, setTracks] = useState<Track[]>();
  const [albums, setAlbums] = useState<Album[]>();
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("query");
  const type = searchParams.get("type");

  const fetchSearchResults = async () => {
    try {
      const token = Cookies.get("token");
      console.log(type);
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
      if (responseData.artists) {
        setArtists(responseData.artists.items);
      }
      if (responseData.tracks) setTracks(responseData.tracks.items);
      if (responseData.albums) setAlbums(responseData.albums.items);
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
      {!isLoading && (
        <>
          <Typography type="h1" className="w-10/12 mb-8">
            {`Search results for "${query}"`}
          </Typography>
          <div className="flex flex-col w-10/12">
            {artists && (
              <>
                <Typography type="h3" className="w-10/12 mb-8">
                  Artists
                </Typography>
                <div className="flex overflow-x-scroll py-4 ">
                  {artists.map((artist) => (
                    <Link key={artist.id} href={`artist/${artist.id}`}>
                      <Card className="w-32 mx-2 flex flex-col hover:scale-105 border-none transition-all duration-300 ease-in ">
                        <Card.Header
                          as="img"
                          src={
                            artist.images.length > 0
                              ? artist.images[0].url
                              : "/Avatar.jpg"
                          }
                          alt="artist-picture"
                          className="w-full m-auto h-32 object-cover "
                        />
                        <Card.Body className="text-center h-16">
                          <Typography className="font-semibold">
                            {artist.name}
                          </Typography>
                        </Card.Body>
                      </Card>
                    </Link>
                  ))}
                </div>
              </>
            )}
            {albums && (
              <>
                <Typography type="h3" className="w-10/12 mb-8">
                  Albums
                </Typography>
                <div className="flex overflow-x-scroll py-4 ">
                  {albums.map((album) => (
                    <Link key={album.id} href={`album/${album.id}`}>
                      <Card className="w-32 mx-2 flex flex-col hover:scale-105 border-none transition-all duration-300 ease-in ">
                        <Card.Header
                          as="img"
                          src={album.images[0].url}
                          alt="artist-picture"
                          className="w-full m-auto h-32 object-cover "
                        />
                        <Card.Body className="text-center h-16">
                          <Typography className="font-semibold">
                            {album.name}
                          </Typography>
                        </Card.Body>
                      </Card>
                    </Link>
                  ))}
                </div>
              </>
            )}
            {tracks && (
              <>
                <Typography type="h3" className="w-10/12 mb-8">
                  Tracks
                </Typography>
                <div className="flex overflow-x-scroll py-4 ">
                  {tracks.map((track) => (
                    <div key={track.id}>
                      <Card className="w-32 mx-2 flex flex-col hover:scale-105 border-none transition-all duration-300 ease-in ">
                        <Card.Header
                          as="img"
                          src={track.album.images[0].url}
                          alt="artist-picture"
                          className="w-full m-auto h-32 object-cover  "
                        />
                        <Card.Body className="text-center h-16">
                          <Typography className="font-semibold">
                            {track.name}
                          </Typography>
                        </Card.Body>
                      </Card>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </>
      )}
    </main>
  );
}
