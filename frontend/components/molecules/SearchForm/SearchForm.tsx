import { Button, Input, Select, Typography } from "@material-tailwind/react";
import { FunctionComponent, useState } from "react";
import { useSearchParams } from "next/navigation";

const SearchForm: FunctionComponent = () => {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query") || "");
  const [error, setError] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (!query.trim()) {
      event.preventDefault();
      setError(true);
    }
  };

  return (
    <form
      className="flex min-h-fit lg-1/2 lg:w-1/4 mx-8"
      action={"search"}
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col">
        <Input
          isError={error}
          name="query"
          placeholder="Search"
          className={" rounded-r-none " + (error ? " border-red-500" : " ")}
          value={query}
          onClick={() => setError(false)}
          onChange={(e) => setQuery(e.target.value)}
        />
        {error && (
          <Typography type="small" className="mt-1 block text-red-500">
            Please add a search term
          </Typography>
        )}
      </div>
      <Select name="type" className="border">
        <Select.Trigger
          className="w-1/4 rounded-none border-x-0"
          placeholder="Type"
        />
        <Select.List>
          <Select.Option value="album%2Cartist%2Ctrack">All</Select.Option>
          <Select.Option value="artist">Artists</Select.Option>
          <Select.Option value="track">Tracks</Select.Option>
          <Select.Option value="album">Albums</Select.Option>
        </Select.List>
      </Select>
      <Button
        type="submit"
        className="w-1/4 rounded-l-none hover:bg-slate-600 h-max"
      >
        Search
      </Button>
    </form>
  );
};

export default SearchForm;
