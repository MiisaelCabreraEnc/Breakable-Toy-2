import { Typography } from "@material-tailwind/react";
import Link from "next/link";
import { FunctionComponent } from "react";
import Artist from "../../../interfaces/Artist";

interface AlbumDataProps {
  name: string;
  image: string;
  artists: Artist[];
  release_date: string;
  total_duration: string;
  total_tracks: number;
}

const AlbumData: FunctionComponent<AlbumDataProps> = ({
  name,
  image,
  artists,
  release_date,
  total_tracks,
  total_duration,
}) => {
  return (
    <div className="w-1/3 flex-col flex">
      <img src={image} alt="" className="w-full pb-2" />
      <Typography type="h3" className=" mb-2">
        {name}
      </Typography>
      <Typography type="p" className=" mb-2 font-semibold text-lg">
        {"By: "}
        {artists.map((artist, index) => (
          <Link
            key={artist.id}
            href={`/me/artist/${artist.id}`}
            className=" underline"
          >
            {artist.name + (index < artists.length - 1 ? ", " : "")}
          </Link>
        ))}
      </Typography>
      <Typography type="p" className=" mb-2 font-semibold text-lg">
        {"Year: " + release_date.split("-")[0]}
      </Typography>

      <Typography type="p" className=" mb-2 font-semibold text-lg">
        {"Number of songs: " + total_tracks}
      </Typography>

      <Typography type="p" className=" mb-8 font-semibold text-lg">
        {"Total duration: " + total_duration}
      </Typography>
    </div>
  );
};

export default AlbumData;
