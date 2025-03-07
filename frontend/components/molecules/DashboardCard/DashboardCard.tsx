import { Card } from "@material-tailwind/react";
import Link from "next/link";
import { FunctionComponent } from "react";

interface DashboardCardProps {
  id: string;
  name: string;
  genres: string[];
  image: string;
}

const DashboardCard: FunctionComponent<DashboardCardProps> = ({
  id,
  name,
  genres,
  image,
}) => {
  return (
    <Link key={id} href={`artist/${id}`}>
      <Card className="max-w-xs hover:scale-105 border-none transition-all duration-300 ease-in m-auto">
        <Card.Header
          as="img"
          src={image}
          alt="artist-picture"
          className="h-60 object-cover"
        />
        <Card.Body className="text-center">
          <h5 className="font-semibold">{name}</h5>
          <p className="my-2 text-sm text-foreground capitalize min-h-16 ">
            {genres.length === 0
              ? "No genres"
              : genres.map((genre, index) => (
                  <span key={genre}>
                    {genre + (index !== genres.length - 1 ? ", " : "")}
                  </span>
                ))}
          </p>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default DashboardCard;
