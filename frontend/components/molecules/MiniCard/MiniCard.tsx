import { FunctionComponent } from "react";
import CardData from "../../../interfaces/CardData";
import { Card } from "@material-tailwind/react";

const MiniCard: FunctionComponent<CardData> = ({
  name,
  images,
  album,
  release_date,
}) => {
  return (
    <Card className="flex w-32 flex-col">
      <Card.Header
        as="img"
        src={
          images && images.length > 0
            ? images[0].url
            : album && album.images.length > 0
            ? album.images[0].url
            : "/Avatar.jpg"
        }
        alt="album-picture"
        className=" w-full m-auto h-32 object-cover"
      />
      <Card.Body className="text-center p-4">
        <div>
          <p className="capitalize text-sm font-semibold truncate">{name}</p>
          {release_date && <p className="text-xs">{release_date}</p>}
        </div>
      </Card.Body>
    </Card>
  );
};

export default MiniCard;
