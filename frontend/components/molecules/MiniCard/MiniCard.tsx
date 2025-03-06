import { FunctionComponent } from "react";
import CardData from "../../../interfaces/CardData";
import { Card, Typography } from "@material-tailwind/react";

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
          <Typography className="capitalize text-sm font-semibold truncate">
            {name}
          </Typography>
          {release_date && (
            <Typography className="text-xs">{release_date}</Typography>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default MiniCard;
