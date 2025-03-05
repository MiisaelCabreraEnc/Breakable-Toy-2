"use client";
import { FunctionComponent, useState, useEffect } from "react";
import SpotifyIcon from "../../atoms/icons/Spotify/SpotifyIcon";
import { Avatar, Typography } from "@material-tailwind/react";
import SearchForm from "../../molecules/SearchForm/SearchForm";
import Cookies from "js-cookie";
import Link from "next/link";

interface UserData {
  image: string;
  name: string;
  url: string;
}

const Header: FunctionComponent = () => {
  const [userData, setUserData] = useState<UserData>({
    image: "",
    name: "",
    url: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserData = async () => {
    const token = Cookies.get("token");
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
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <header className="bg-black h-auto flex justify-between px-2 py-8 md:px-16">
      {!isLoading && (
        <>
          <Link href={"/me/dashboard"} className="flex items-center">
            <SpotifyIcon className="text-spotify-green h-8 w-8  lg:h-12 lg:w-12 mr-2" />
            <Typography type="h4">Spotify</Typography>
          </Link>

          <SearchForm />

          <Link href={userData.url} className=" min-w-fit flex items-center ">
            <Avatar className="mr-2 h-8 w-8" src={userData.image} />
            <Typography className="md:flex hidden">{userData.name}</Typography>
          </Link>
        </>
      )}
    </header>
  );
};

export default Header;
