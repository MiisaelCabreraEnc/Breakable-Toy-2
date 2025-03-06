export default interface CardData {
  id: string;
  name: string;
  release_date?: string;
  images?: Images[];
  album?: { images: Images[] };
}

interface Images {
  url: string;
}
