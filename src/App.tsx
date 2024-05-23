import "./App.scss";
import { Button } from "./components/ui/button";
import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import useCountry from "@/query/features/country";
import useNews from "@/query/features/news";
import useWeather from "@/query/features/weather";
import Loader from "@/components/Loader";
import { TCountry, TCountryError } from "@/types/country";
import { queryClient } from "@/query/client";
import { TWeather } from "./types/weather";

function App() {
  const [searchText, setSearchText] = useState<string>("germanys");

  // https://newsapi.org/ News API Key: 23cfe74ca26a47488e0457e15db36e6b
  // https://openweathermap.org/ Weather API Key: 14132a7935a6db2a69756f57d6f56bb9

  const {
    // isRefetching: isRefetchingCountry,
    isFetching: isFetchingCountry,
    refetch: refetchCountry,
    data: dataCountry,
    isError: isErrorCountry,
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
    isFetching: isFetchingWeather,
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
    <div className="grid grid-cols-3 w-5/6 mx-auto gap-x-8 gap-y-4 mt-5">
      <form className="col-span-3 flex" onSubmit={onSubmit}>
        <Input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="rounded-br-none rounded-tr-none w-[75%] bg-slate-200 hover:bg-slate-300 focus:bg-slate-300 transition-colors"
        />
        <Button
          onClick={onSubmit}
          className="rounded-tl-none rounded-bl-none w-[25%]"
        >
          Search
        </Button>
      </form>
      <Card className="col-span-3 flex items-center w-full">
        {isErrorCountry && !isFetchingCountry && (
          <span className="self-center text-center w-full">
            Unable to fetch data at this time
          </span>
        )}
        <span
          className="italic text-3xl font-bold text-blue-200 h-[3rem] w-2/3"
          style={{ textShadow: "2px 2px black" }}
        >
          {!isFetchingCountry &&
            !isErrorCountry &&
            dataCountry &&
            (dataCountry as TCountry[]).length > 0 &&
            (dataCountry as TCountry[])[0].name.official}
        </span>
        <span
          className="italic font-semibold text-blue-200 text-2xl w-1/3"
          style={{ textShadow: "1px 1px black" }}
        >
          {!isFetchingCountry &&
            !isErrorCountry &&
            dataCountry &&
            (dataCountry as TCountry[]).length > 0 &&
            (dataCountry as TCountry[])[0].capital[0] &&
            `Capital: ${(dataCountry as TCountry[])[0].capital[0]}`}
        </span>
      </Card>
      <div className="flex justify-center col-span-3 md:col-span-1 h-[213px]">
        <Card
          className="flex flex-col h-full w-full justify-center items-center bg-no-repeat bg-center"
          style={{
            backgroundImage:
              !isFetchingCountry && !isErrorCountry
                ? `url(${
                    (dataCountry as TCountry[]) &&
                    (dataCountry as TCountry[]).length > 0 &&
                    (dataCountry as TCountry[])[0].flags.png
                  })`
                : "none",
          }}
        >
          {isErrorCountry && !isFetchingCountry && "Unable to fetch data at this time"}
          {!isFetchingCountry &&
            dataCountry &&
            (dataCountry as TCountryError).status === 404 &&
            "Country not found!"}
          {isFetchingCountry && <Loader />}
          {/* <span
            className="italic text-2xl font-bold text-blue-200 text-center"
            style={{ textShadow: "3px 3px black" }}
          >
            {!isFetchingCountry &&
              !isErrorCountry &&
              dataCountry &&
              (dataCountry as TCountry[]).length > 0 &&
              (dataCountry as TCountry[])[0].name.common}
          </span> */}
        </Card>
      </div>
      <div className="col-span-2 h-[213px]">
        <Card
          className={`grid ${
            !(isFetchingCountry || isFetchingWeather || isErrorCountry) &&
            "grid-cols-3"
          } py-3 px-8 h-full justify-center items-center`}
        >
          {isErrorCountry && !isFetchingCountry && "Unable to fetch data at this time"}
          {isFetchingCountry || isFetchingWeather ? <Loader /> : null}
          {(dataWeather as TWeather) &&
            !(isFetchingCountry || isFetchingWeather) &&
            !isErrorCountry && (
              <>
                <span className="text-3xl font-bold text-center">
                  {dataWeather?.main.temp}&deg;C
                </span>
                <img
                  src={`http://openweathermap.org/img/w/${dataWeather?.weather[0].icon}.png`}
                  alt=""
                  className="w-20 justify-self-center self-center"
                />
                <span className="grid grid-cols-2 gap-x-2 gap-y-2">
                  <span className="text-end text-sm">Humidity</span>{" "}
                  <img
                    src="/humidity.png"
                    className="h-12 justify-self-start row-span-2"
                  />
                  <span className="text-2xl font-bold self-center justify-self-end">
                    {dataWeather?.main.humidity}%
                  </span>{" "}
                </span>
                <span className="flex flex-col text-center">
                  <span>Max: {dataWeather?.main.temp_max}&deg;C</span>
                  <span>Min: {dataWeather?.main.temp_min}&deg;C</span>
                  <span>Feels like: {dataWeather?.main.feels_like}</span>
                </span>
                <span className="flex flex-col text-center">
                  <span className="text-2xl">
                    {dataWeather?.weather[0].main}{" "}
                  </span>
                  <span>{dataWeather?.weather[0].description} </span>
                </span>
              </>
            )}
        </Card>
      </div>
      <div className="col-span-3">
        <Card className="h-96 overflow-y-scroll grid">
          {isErrorCountry && !isFetchingCountry && (
            <span className="self-center text-center">
              Unable to fetch data at this time
            </span>
          )}
          {isFetchingCountry || isFetchingNews ? <Loader /> : null}
          {!isFetchingNews && !isFetchingCountry && !isErrorCountry && (
            <ol className="list-decimal list-inside">
              {dataNews?.articles.map(({ title }, i) => (
                <li key={i}>{title}</li>
              ))}
            </ol>
          )}
        </Card>
      </div>
    </div>
  );
}

export default App;
