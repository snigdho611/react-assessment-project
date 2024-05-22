import "./App.scss";
import { Button } from "./components/ui/button";
import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import useCountry from "@/query/features/country";
import useNews from "@/query/features/news";
import useWeather from "@/query/features/weather";
import Loader from "@/components/Loader";
import { TCountry } from "@/types/country";
import { queryClient } from "@/query/client";

function App() {
  const [searchText, setSearchText] = useState<string>("germanys");

  // https://newsapi.org/ News API Key: 23cfe74ca26a47488e0457e15db36e6b
  // https://openweathermap.org/ Weather API Key: 14132a7935a6db2a69756f57d6f56bb9

  const {
    // isRefetching: isRefetchingCountry,
    isFetching: isFetchingCountry,
    refetch: refetchCountry,
    data: dataCountry,
    // isSuccess: isSuccessCountry,
    // isError: isErrorCountry,
  } = useCountry(searchText.toLocaleLowerCase());

  const {
    isFetching: isFetchingNews,
    // isLoading: isLoadingNews,
    // refetch: refetchNews,
    data: dataNews,
  } = useNews(dataCountry as TCountry[]);

  const {
    // isRefetching: isRefetchingWeather,
    // isLoading: isLoadingWeather,
    // refetch: refetchWeather,

    data: dataWeather,
  } = useWeather(dataCountry as TCountry[]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isFetchingCountry) {
      queryClient.cancelQueries({ queryKey: ["countries"] });
    }
    await refetchCountry();
  };

  return (
    <div className="grid grid-cols-3 w-3/4 mx-auto">
      <form className="col-span-3 flex" onSubmit={onSubmit}>
        <Input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="rounded-br-none rounded-tr-none w-[75%]"
        />
        <Button onClick={onSubmit} className="rounded-tl-none rounded-bl-none">
          Search
        </Button>
      </form>
      <div className="flex justify-center col-span-3 md:col-span-1 h-[213px]">
        <Card
          className="flex flex-col h-full w-full justify-center items-center"
          style={{
            backgroundImage: `url(${
              (dataCountry as TCountry[]) &&
              (dataCountry as TCountry[]).length > 0 &&
              (dataCountry as TCountry[])[0].flags.png
            })`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          {isFetchingCountry && <Loader />}
          <span
            className="italic text-2xl font-bold text-blue-200 text-center"
            style={{ textShadow: "3px 3px black" }}
          >
            {/* Capital: {isRefetchingCountry ?? <Loader />} */}
            {dataCountry &&
              (dataCountry as TCountry[]).length > 0 &&
              (dataCountry as TCountry[])[0].name.common}
            {/* {dataWeather?.name} */}
          </span>
          <span
            className="italic text-sm font-semibold text-blue-200"
            style={{ textShadow: "2px 2px black" }}
          >
            {/* {dataCountry &&
              "Capital: " +
                ((dataCountry as TCountry[]).length > 0 &&
                  (dataCountry as TCountry[])[0].capital[0])} */}
            {dataCountry &&
              (dataCountry as TCountry[]).length > 0 &&
              (dataCountry as TCountry[])[0].capital[0] &&
              `Capital: ${(dataCountry as TCountry[])[0].capital[0]}`}
          </span>
          {/* 
          <span>
            Flag: {isRefetchingCountry ?? <Loader />}
            {dataCountry && dataCountry[0].flag}
          </span> */}
        </Card>
      </div>
      <div className="col-span-2 h-[213px]">
        <Card className="grid grid-cols-3 py-3 px-8 h-full">
          <p className="text-3xl font-bold">{dataWeather?.main.temp}&deg;C</p>
          <img
            src={`http://openweathermap.org/img/w/${dataWeather?.weather[0].icon}.png`}
            alt=""
            className="w-20"
          />
          <p>Maximum: {dataWeather?.main.temp_max}</p>
          <p>Minimum: {dataWeather?.main.temp_min}</p>
          <p>Feels like: {dataWeather?.main.feels_like}</p>
          <p>
            {/* {dataWeather?.weather.map(({ id, main, description, icon }) => {
              return ( */}
            <span>
              {dataWeather?.weather[0].main}{" "}
              {dataWeather?.weather[0].description}{" "}
            </span>
            {/* ); */}
            {/* })} */}
          </p>
        </Card>
      </div>
      <div className="col-span-3 h-[350px]">
        <Card className="h-full">
          {isFetchingCountry || isFetchingNews ? <Loader /> : null}
          <ol className="list-decimal list-inside">
            {dataNews?.articles.map(({ title }, i) => (
              <li key={i}>{title}</li>
            ))}
            {/* {!(isFetchingNews || isLoadingNews) &&
              )} */}
          </ol>
        </Card>
      </div>
    </div>
  );
}

export default App;
