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
      <h3 className=" mb-2">{name}</h3>
      <p className=" mb-2 font-semibold text-lg">
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
      </p>
      <p className=" mb-2 font-semibold text-lg">
        {"Year: " + release_date.split("-")[0]}
      </p>

      <p className=" mb-2 font-semibold text-lg">
        {"Number of songs: " + total_tracks}
      </p>

      <p className=" mb-8 font-semibold text-lg">
        {"Total duration: " + total_duration}
      </p>
    </div>
  );
};

export default AlbumData;
