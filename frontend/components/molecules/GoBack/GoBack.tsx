"use client";
import { Button } from "@material-tailwind/react";
import { FunctionComponent } from "react";
import { useRouter } from "next/navigation";
import ArrowLeftIcon from "../../atoms/icons/ArrowLeft/ArroLeft";

const GoBack: FunctionComponent = () => {
  const router = useRouter();

  return (
    <div className=" flex  w-10/12 mb-4 ">
      <Button
        isPill
        className="hover:bg-slate-50 hover:text-spotify-green"
        onClick={() => {
          router.back();
        }}
      >
        {" "}
        <ArrowLeftIcon className="h-6 w-6" /> Go back
      </Button>
    </div>
  );
};

export default GoBack;
