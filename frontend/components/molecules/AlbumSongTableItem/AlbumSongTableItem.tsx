import { FunctionComponent } from "react";
import Track from "../../../interfaces/Track";

interface AlbumSongTableItemProps {
  track: Track;
  index: number;
  trackDuration: string;
}

const AlbumSongTableItem: FunctionComponent<AlbumSongTableItemProps> = ({
  track,
  index,
  trackDuration,
}) => {
  return (
    <tr className="border-b  border-surface last:border-0">
      <td className="text-center py-2">{index + 1}</td>
      <td className=" py-2">{track.name}</td>
      <td className="text-center py-2">{trackDuration}</td>
    </tr>
  );
};

export default AlbumSongTableItem;
