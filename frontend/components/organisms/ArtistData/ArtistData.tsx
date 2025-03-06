import { Typography } from "@material-tailwind/react";
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
        <Typography type="h1" className=" mb-2">
          {name}
        </Typography>
        <Typography type="p" className=" mb-2 text-center">
          {followers + " Followers"}
        </Typography>
      </div>
      <Typography type="p" className=" mb-8 font-semibold text-lg">
        {genres.map((genre, index) => (
          <span className="capitalize" key={genre}>
            {genre + (index !== genres.length - 1 ? ", " : "")}
          </span>
        ))}
      </Typography>
    </div>
  );
};

export default ArtistData;
