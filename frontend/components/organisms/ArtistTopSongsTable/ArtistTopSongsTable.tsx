import { FunctionComponent } from "react";
import Track from "../../../interfaces/Track";
import TableHeadings from "../../molecules/TableHeadings/TableHeadings";
import ArtistSongTableItem from "../../molecules/ArtistSongTableItem/ArtistSongTableItem";

interface ArtistTopSongsTableProps {
  title: string;
  headings: string[];
  tracks: Track[];
}

const ArtistTopSongsTable: FunctionComponent<ArtistTopSongsTableProps> = ({
  title,
  headings,
  tracks,
}) => {
  return (
    <div className="w-7/12  flex-col flex">
      <h2 className=" mb-8">{title}</h2>
      <table className="w-full">
        <TableHeadings headings={headings} />
        <tbody className="group text-sm text-black dark:text-white">
          {tracks.map((track, index) => {
            const trackDurationSeconds = Math.trunc(track.duration_ms / 1000);
            const trackDurationMinutes = Math.trunc(trackDurationSeconds / 60);
            const trackDurationString = `${trackDurationMinutes}:${(
              trackDurationSeconds -
              trackDurationMinutes * 60
            )
              .toString()
              .padStart(2, "0")}`;
            return (
              <ArtistSongTableItem
                key={track.id}
                track={track}
                index={index}
                trackDuration={trackDurationString}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ArtistTopSongsTable;
