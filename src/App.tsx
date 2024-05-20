import { useQuery } from "@tanstack/react-query";
import "./App.scss";
import { Button } from "./components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
} from "./components/ui/table";
import { useState } from "react";
import { Input } from "./components/ui/input";

function App() {
  const cacheExpiryTime = 5000;
  const [searchText, setSearchText] = useState<string>("germany");
  // const { isLoading, isError, data, refetch } = useQuery({
  //   queryKey: ["countries"],
  //   queryFn: () => {
  //     return fetch(
  //       `http://127.0.0.1:8000/user/${searchText}`
  //       // `https://restcountries.com/v3.1/name/${searchText}?fullText=true`
  //     )
  //       .then((res) => res.json())
  //       .catch((err) => err);
  //   },
  //   enabled: false,
  //   refetchOnWindowFocus: false,
  //   refetchInterval: 1,
  //   // gcTime: cacheExpiryTime, // Set cache expiration time
  //   // staleTime: cacheExpiryTime / 2, // Allow stale data for half the expiry time
  //   // refetchOnWindowFocus: true, // Refetch on window focus (optional)
  // });

  // 23cfe74ca26a47488e0457e15db36e6b

  const onSubmit = async () => {
    const [country, news] = await Promise.all([
      fetch(`https://restcountries.com/v3.1/name/${searchText}?fullText=true`),
    ]);
  };

  return (
    <div className="grid grid-cols-4">
      <Input
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="col-span-2 rounded-br-none rounded-tr-none"
      />
      <Button className="rounded-tl-none rounded-bl-none">Search</Button>
    </div>
    // <div>
    //   <input
    //     value={searchText}
    //     onChange={(e) => setSearchText(e.target.value)}
    //   />
    //   <button onClick={() => refetch()}>Search</button>
    //   <span>
    //     {isLoading
    //       ? "Loading..."
    //       : data && Array.isArray(data) && data[0].altSpellings.join(", ")}
    //   </span>
    // </div>
  );
  // return (
  //   <>
  //     <Button>Test</Button>
  //     <Table>
  //       <TableHeader className="bg-slate-100">
  //         <TableHead>Country</TableHead>
  //         <TableHead>Capital</TableHead>
  //         <TableHead>Flag</TableHead>
  //         <TableHead>Headline</TableHead>
  //         <TableHead>Current Weather</TableHead>
  //       </TableHeader>
  //       <TableBody>
  //         <TableCell>1</TableCell>
  //         <TableCell>2</TableCell>
  //         <TableCell>3</TableCell>
  //         <TableCell>4</TableCell>
  //         <TableCell>5</TableCell>
  //       </TableBody>
  //     </Table>
  //   </>
  // );
}

export default App;
