"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import SadFaceIcon from "../../../components/atoms/icons/SadFace/SadFace";
import { Button, Card, Dialog, Typography } from "@material-tailwind/react";
import Link from "next/link";

interface artist {
  id: string;
  name: string;
  images: { url: string }[];
  genres: string[];
}

export default function Dashboard() {
  const [artists, setArtists] = useState<artist[]>([]);
  const [open, setOpen] = useState(false);
  const [modalDescription, setModalDescription] = useState("");
  const router = useRouter();

  const fetchArtistsData = async () => {
    try {
      const token = Cookies.get("token");

      if (!token) {
        setModalDescription("Your session has expired. Try to login again");
        setOpen(true);
        return;
      }

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
      setModalDescription("Something went wrong");
      Cookies.remove("token");
      setOpen(true);
    }
  };

  useEffect(() => {
    fetchArtistsData();
  }, []);

  return (
    <main className="p-8 min-h-screen bg-gradient-to-tr from-slate-900 to-spotify-green flex flex-col justify-center items-center">
      <Dialog size="sm" open={open}>
        <Dialog.Overlay>
          <Dialog.Content className="p-8 outline-none border-none bg-opacity-50">
            <Typography type="h6" className="text-center mb-4">
              Ups... An error has occurred
            </Typography>
            <SadFaceIcon className="text-white h-24 w-24 py-4 mx-auto" />
            <Typography type="p" className="text-center text-foreground">
              {modalDescription}
            </Typography>
            <div className="mb-1 mt-8 flex items-center justify-center gap-2">
              <Button
                className="outline-none"
                onClick={() => {
                  router.push("/");
                }}
              >
                Got it
              </Button>
            </div>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog>

      <section className=" flex flex-col w-10/12 ">
        <Typography type="h1" className=" mb-8">
          My top artists
        </Typography>
        <div className="lg:grid-cols-5 md:grid-cols-3 grid-cols-1 grid gap-4 ">
          {artists.map((artist) => (
            <Link key={artist.id} href={`artist/${artist.id}`}>
              <Card className="max-w-xs hover:scale-105 border-none transition-all duration-300 ease-in m-auto">
                <Card.Header
                  as="img"
                  src={artist.images[0].url}
                  alt="artist-picture"
                  className="h-60 object-cover"
                />
                <Card.Body className="text-center">
                  <Typography type="h5">{artist.name}</Typography>
                  <Typography className="my-2 text-sm text-foreground capitalize min-h-16 ">
                    {artist.genres.length === 0
                      ? "No genres"
                      : artist.genres.map((genre, index) => (
                          <span key={genre}>
                            {genre +
                              (index !== artist.genres.length - 1 ? ", " : "")}
                          </span>
                        ))}
                  </Typography>
                </Card.Body>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
