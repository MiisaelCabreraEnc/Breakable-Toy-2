"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Cookies from "js-cookie";
import { Typography } from "@material-tailwind/react";
import GoBack from "../../../../components/molecules/GoBack/GoBack";
import ArtistData from "../../../../components/organisms/ArtistData/ArtistData";
import ArtistTopSongsTable from "../../../../components/organisms/ArtistTopSongsTable/ArtistTopSongsTable";
import Artist from "../../../../interfaces/Artist";
import Track from "../../../../interfaces/Track";
import Album from "../../../../Interfaces/Album";
import HorizontalScroll from "@/components/organisms/HorizontalScroll/HorizontalScroll";

const TABLE_HEAD = ["#", "Album", "Song Name", "Duration"];

export default function ArtistPage() {
  const [artistData, setArtistData] = useState<Artist>();
  const [artistTracks, setArtistTracks] = useState<Track[]>();
  const [artistAlbums, setArtistAlbums] = useState<Album[]>();
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
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
      const updatedDatesData = responseData.items.map((item: Album) => ({
        ...item,
        release_date: item.release_date.split("-")[0],
      }));

      setArtistAlbums(updatedDatesData);
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
      <GoBack />

      <section className=" flex  w-10/12 justify-between">
        {!isLoading && artistData && artistTracks && (
          <>
            <ArtistData
              {...artistData}
              image={
                artistData.images.length > 0
                  ? artistData.images[0].url
                  : "/Avatar.jpg"
              }
            />

            <ArtistTopSongsTable
              title={"Popular Songs"}
              headings={TABLE_HEAD}
              tracks={artistTracks}
            />
          </>
        )}
      </section>
      {!isLoading && artistAlbums && (
        <section className="flex flex-col w-10/12">
          <Typography type="h2" className=" mb-8">
            Discography
          </Typography>

          <HorizontalScroll cards={artistAlbums} type={"album"} />
        </section>
      )}
    </main>
  );
}
