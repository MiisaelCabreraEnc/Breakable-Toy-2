import { FunctionComponent } from "react";

interface ArtistDataProps {
  name: string;
  image: string;
  followers: string;
  genres: string[];
}

const ArtistData: FunctionComponent<ArtistDataProps> = ({
  name,
  image,
  followers,
  genres,
}) => {
  return (
    <div className="w-1/3 flex-col flex">
      <img src={image} alt="" className="w-full pb-2" />
      <div className="flex lg:flex-row flex-col lg:items-end justify-between">
        <h1 className=" mb-2 font-bold text-xl">{name}</h1>
        <p className="lg:text-base text-xs mb-2 lg:text-center">
          {followers + " Followers"}
        </p>
      </div>
      <p className=" mb-8 font-semibold text-lg">
        {genres.map((genre, index) => (
          <span className="capitalize" key={genre}>
            {genre + (index !== genres.length - 1 ? ", " : "")}
          </span>
        ))}
      </p>
    </div>
  );
};

export default ArtistData;
