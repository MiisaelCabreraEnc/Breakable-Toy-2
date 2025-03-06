import { FunctionComponent } from "react";
import Track from "../../../interfaces/Track";
import Link from "next/link";

interface ArtistSongTableItemProps {
  track: Track;
  index: number;
  trackDuration: string;
}

const ArtistSongTableItem: FunctionComponent<ArtistSongTableItemProps> = ({
  track,
  index,
  trackDuration,
}) => {
  return (
    <tr className="border-b  border-surface last:border-0">
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
      <td className="text-center">{trackDuration}</td>
    </tr>
  );
};

export default ArtistSongTableItem;
