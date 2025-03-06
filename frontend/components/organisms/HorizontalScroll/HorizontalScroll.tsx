import { Card, Typography } from "@material-tailwind/react";
import Link from "next/link";
import { FunctionComponent } from "react";
import CardData from "../../../interfaces/CardData";
import MiniCard from "@/components/molecules/MiniCard/MiniCard";

interface HorizontalScrollProps {
  cards: CardData[];
  type: string;
}

const HorizontalScroll: FunctionComponent<HorizontalScrollProps> = ({
  cards,
  type,
}) => {
  return (
    <div className="flex overflow-x-scroll py-4">
      {cards.map((card) => {
        if (type === "track")
          return (
            <div
              key={card.id}
              className=" hover:scale-105 transition-all ease-in-out duration-300 mx-2"
            >
              <MiniCard {...card} />
            </div>
          );

        return (
          <Link
            href={`/me/${type}/${card.id}`}
            key={card.id}
            className=" hover:scale-105 transition-all ease-in-out duration-300 mx-2"
          >
            <MiniCard {...card} />
          </Link>
        );
      })}
    </div>
  );
};

export default HorizontalScroll;
