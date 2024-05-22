import "./App.scss";
import { Button } from "./components/ui/button";
import { FormEvent, useEffect, useState } from "react";
import { Input } from "./components/ui/input";
import { Card } from "./components/ui/card";
import useCountry from "./query/country";
import useNews from "./query/news";
import useWeather from "./query/weather";
import Loader from "./components/Loader";

function App() {
  const [searchText, setSearchText] = useState<string>("germany");

  // https://newsapi.org/ News API Key: 23cfe74ca26a47488e0457e15db36e6b
  // https://openweathermap.org/ Weather API Key: 14132a7935a6db2a69756f57d6f56bb9

  const {
    isRefetching: isRefetchingCountry,
    refetch: refetchCountry,
    data: dataCountry,
    isSuccess: isSuccessCountry,
  } = useCountry(searchText.toLocaleLowerCase());

  const {
    isRefetching: isRefetchingNews,
    isLoading: isLoadingNews,
    refetch: refetchNews,
    data: dataNews,
  } = useNews(dataCountry, isSuccessCountry, isRefetchingCountry);

  const {
    isRefetching: isRefetchingWeather,
    isLoading: isLoadingWeather,
    refetch: refetchWeather,
    data: dataWeather,
  } = useWeather(dataCountry, isSuccessCountry, isRefetchingCountry);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await refetchCountry();
  };

  return (
    <div className="grid grid-cols-3">
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
      <div className=" flex justify-center">
        <Card
          className="flex flex-col h-[213px] w-[320px] justify-center items-center"
          style={{
            backgroundImage: `url(${dataCountry && dataCountry[0].flags.png})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <span
            className="italic text-3xl font-bold text-blue-200"
            style={{ textShadow: "3px 3px black" }}
          >
            {/* Capital: {isRefetchingCountry ?? <Loader />} */}
            {dataCountry && dataCountry[0].name.common}
            {/* {dataWeather?.name} */}
          </span>
          <span
            className="italic text-sm font-bold text-blue-200"
            style={{ textShadow: "2px 2px black" }}
          >
            {dataCountry &&
              "Capital:" + dataCountry &&
              dataCountry[0].capital[0]}
          </span>
          {/* 
          <span>
            Flag: {isRefetchingCountry ?? <Loader />}
            {dataCountry && dataCountry[0].flag}
          </span> */}
        </Card>
      </div>
      <div className="col-span-2">
        <Card>
          <p>Maximum: {dataWeather?.main.temp_max}</p>
          <p>Minimum: {dataWeather?.main.temp_min}</p>
          <p>Feels like: {dataWeather?.main.feels_like}</p>
          <p>
            {dataWeather?.weather.map(({ id, main, description, icon }) => {
              return (
                <span>
                  {main} {description}{" "}
                  <img
                    src={`http://openweathermap.org/img/w/${icon}.png`}
                    alt=""
                  />
                </span>
              );
            })}
          </p>
        </Card>
      </div>
      <div>
        <Card>
          News: {(isRefetchingNews || isLoadingNews) && <Loader />}
          {!(isRefetchingNews || isLoadingNews) &&
            dataNews?.articles.map(({ title }, i) => <p key={i}>{title}</p>)}
        </Card>
      </div>
    </div>
  );
}

export default App;
