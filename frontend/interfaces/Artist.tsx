export default interface Artist {
  id: string;
  name: string;
  images: { url: string }[];
  followers: string;
  genres: string[];
}
