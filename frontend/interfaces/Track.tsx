import Album from "./Album";

export default interface Track {
  id: string;
  name: string;
  album: Album;
  duration_ms: number;
}
