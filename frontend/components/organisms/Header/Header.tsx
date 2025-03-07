"use client";
import { FunctionComponent, useState, useEffect } from "react";
import SpotifyIcon from "../../atoms/icons/Spotify/SpotifyIcon";
import { Avatar } from "@material-tailwind/react";
import SearchForm from "../../molecules/SearchForm/SearchForm";
import Cookies from "js-cookie";
import Link from "next/link";
import SadFaceIcon from "../../../components/atoms/icons/SadFace/SadFace";
import CustomModal from "../../../components/molecules/CustomModal/CustomModal";
import { useRouter } from "next/navigation";

interface UserData {
  image: string;
  name: string;
  url: string;
}

const MODAL_DATA = {
  title: "Ups... An error has occurred",
  description: "Your session has expired. Try to login again",
  closeButtonMessage: "Got it",
  icon: <SadFaceIcon className="text-white h-24 w-24 py-4 mx-auto" />,
};

const Header: FunctionComponent = () => {
  const [userData, setUserData] = useState<UserData>({
    image: "",
    name: "",
    url: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const fetchUserData = async () => {
    const token = Cookies.get("token");

    if (!token) {
      MODAL_DATA.description = "An error has ocurred while fetching data";
      setOpen(true);
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/me/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          credentials: "include",
        },
      });

      const responseData = await response.json();
      const userData: UserData = {
        image: responseData.images[0].url,
        name: responseData.display_name,
        url: responseData.external_urls.spotify,
      };
      setUserData(userData);
    } catch (error) {
      console.error(error);
      MODAL_DATA.description = "Something went wrong while fetching data";
      Cookies.remove("token");
      setOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <>
      <header className="bg-black h-auto flex justify-between px-2 py-8 md:px-16">
        {!isLoading && (
          <>
            <Link href={"/me/dashboard"} className="flex items-center">
              <SpotifyIcon className="text-spotify-green h-8 w-8  lg:h-12 lg:w-12 mr-2" />
              <h4>Spotify</h4>
            </Link>

            <SearchForm />

            <Link href={userData.url} className=" min-w-fit flex items-center ">
              <Avatar className="mr-2 h-8 w-8" src={userData.image} />
              <p className="md:flex hidden">{userData.name}</p>
            </Link>
          </>
        )}
        <CustomModal
          open={open}
          onClose={() => {
            router.push("/");
          }}
          {...MODAL_DATA}
        />
      </header>
    </>
  );
};

export default Header;
