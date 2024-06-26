import React, { FormEvent, SetStateAction } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface ISearchbarProps {
  value: string;
  onSubmit: (e: FormEvent) => Promise<void>;
  onChange: (value: SetStateAction<string>) => void;
}

const Searchbar: React.FC<ISearchbarProps> = ({
  value,
  onSubmit,
  onChange,
}) => {
  return (
    <form className="col-span-3 flex" onSubmit={onSubmit}>
      <Input
        placeholder="Enter a country's name"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-br-none rounded-tr-none w-[75%] bg-blue-100 hover:bg-blue-200 focus:bg-blue-200 transition-colors focus-visible:ring-offset-0 focus-visible:ring-blue-300"
      />
      <Button
        onClick={onSubmit}
        className="rounded-tl-none rounded-bl-none w-[25%]"
      >
        Search
      </Button>
    </form>
  );
};

export default Searchbar;
