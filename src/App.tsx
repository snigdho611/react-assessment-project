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
import { Card } from "./components/ui/card";

function App() {
  const cacheExpiryTime = 5000;
  const [searchText, setSearchText] = useState<string>("germany");
  const [country, setCountry] = useState<TCountry | null>(null);
  const [news, setNews] = useState<TNews | null>(null);
  const [weather, setWeather] = useState<TWeather | null>(null);
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

  // https://newsapi.org/ News API Key: 23cfe74ca26a47488e0457e15db36e6b
  // https://openweathermap.org/ Weather API Key: 14132a7935a6db2a69756f57d6f56bb9

  type TCountry = {
    cca2: string;
    latlng: number[];
    capital: string[];
  };

  type TNews = { articles: { title: string }[]; totalResults: number };

  type TWeather = {
    main: {
      feels_like: number;
      grnd_level: number;
      humidity: number;
      pressure: number;
      sea_level: number;
      temp: number;
      temp_max: number;
      temp_min: number;
    };
  };

  const onSubmit = async () => {
    const country: TCountry = (
      await fetch(
        `https://restcountries.com/v3.1/name/${searchText}?fullText=true`
      )
        .then((res) => res.json())
        .then((json) => {
          setCountry(json[0]);
          return json;
        })
        .catch((err) => console.log(err))
    )[0];

    console.log(country.capital[0]);
    // console.log(country.capital[0]);
    // console.log(country, country.capital, country.capital.length);
    // console.log(country && country.capital && country.capital.length);

    const news: TNews = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${country.cca2.toLowerCase()}&apiKey=23cfe74ca26a47488e0457e15db36e6b`
    )
      .then((res) => res.json())
      .then((json) => {
        setNews(json);
        return json;
      })
      .catch((err) => console.log(err));

    console.log(news);

    const weather: TWeather = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=14132a7935a6db2a69756f57d6f56bb9`
    )
      .then((res) => res.json())
      .then((json) => {
        setWeather(json);
        return json;
      })
      .catch((err) => console.log(err));

    console.log(weather);
    // const [country, news] = await Promise.all([
    //   fetch(`https://restcountries.com/v3.1/name/${searchText}?fullText=true`),
    // ]);
  };

  console.log(country, country);

  return (
    <div className="grid grid-cols-4">
      <Input
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="col-span-2 rounded-br-none rounded-tr-none"
      />
      <Button onClick={onSubmit} className="rounded-tl-none rounded-bl-none">
        Search
      </Button>
      .{/* {country && country.capital && country.capital.length > 0 && ( */}
      <Card>
        Capital:{" "}
        {country && Array.isArray(country.capital) ? country.capital[0] : ""}
      </Card>
      {/* )} */}
      {news && (
        <Card>
          News:{" "}
          {news?.articles.map(({ title }) => (
            <p>{title}</p>
          ))}
        </Card>
      )}
      {weather && (
        <Card>
          Weather
          <p>Maximum: {weather?.main.temp_max}</p>
          <p>Minimum: {weather?.main.temp_min}</p>
          <p>Feels like: {weather?.main.feels_like}</p>
        </Card>
      )}
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
