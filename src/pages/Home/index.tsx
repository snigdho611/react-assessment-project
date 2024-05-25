import { FormEvent, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import useCountry from "@/query/features/country";
import useNews from "@/query/features/news";
import useWeather from "@/query/features/weather";
import Loader from "@/components/Loader";
import { TCountry, TCountryError } from "@/types/country";
import { TWeather } from "@/types/weather";
import { TNews } from "@/types/news";
import {
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Searchbar from "@/components/SearchBar";
import CountryCard from "@/components/CountryCard";
import WeatherCard from "@/components/WeatherCard";
import NewsCarousel from "@/components/NewsCarousel";

const Home = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [searchTextSubmit, setSearchTextSubmit] = useState<string>(searchText);

  const {
    isFetching: isFetchingCountry,
    data: dataCountry,
    isError: isErrorCountry,
  } = useCountry(searchTextSubmit.toLocaleLowerCase());

  const { isFetching: isFetchingNews, data: dataNews } = useNews(
    dataCountry as TCountry[]
  );

  const { isFetching: isFetchingWeather, data: dataWeather } = useWeather(
    dataCountry as TCountry[]
  );

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setSearchTextSubmit(searchText);
  };

  return (
    <div className="grid grid-cols-3 w-5/6 mx-auto gap-x-8 gap-y-4 mt-5">
      <Searchbar
        value={searchText}
        onChange={setSearchText}
        onSubmit={onSubmit}
      />
      <Card className="col-span-3 flex flex-col md:flex-row items-center w-full gap-3 min-h-[3rem]">
        {isErrorCountry && !isFetchingCountry && (
          <span className="self-center text-center w-full">
            Unable to fetch data at this time
          </span>
        )}
        <span
          className="italic text-3xl font-bold text-blue-200 md:w-2/3 w-full"
          style={{ textShadow: "2px 2px black" }}
        >
          {!isFetchingCountry &&
            !isErrorCountry &&
            dataCountry &&
            (dataCountry as TCountry[]).length > 0 &&
            (dataCountry as TCountry[])[0].name.official}
        </span>
        <span
          className="italic font-semibold text-blue-200 text-2xl md:w-1/3 w-full"
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
      <CountryCard>
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
          {searchTextSubmit === "" && (
            <img src="/empty.jpg" alt="" className="h-[10rem]" />
          )}
          {isErrorCountry &&
            !isFetchingCountry &&
            "Unable to fetch data at this time"}
          {!isFetchingCountry &&
            dataCountry &&
            (dataCountry as TCountryError).status === 404 &&
            "Country not found!"}
          {isFetchingCountry && <Loader />}
        </Card>
      </CountryCard>
      <WeatherCard
        isFetchingAll={isFetchingCountry || isFetchingWeather || isErrorCountry}
      >
        {searchTextSubmit === "" && (
          <img
            src="/empty.jpg"
            alt=""
            className="h-[10rem] mx-auto col-span-3"
          />
        )}
        {isErrorCountry &&
          !isFetchingCountry &&
          "Unable to fetch data at this time"}
        {isFetchingCountry || isFetchingWeather ? <Loader /> : null}
        {(dataWeather as TWeather) &&
          !(isFetchingCountry || isFetchingWeather) &&
          !isErrorCountry && (
            <>
              <span className="text-3xl font-bold text-center text-slate-500">
                {dataWeather?.main.temp}&deg;C
              </span>
              <img
                src={`http://openweathermap.org/img/w/${dataWeather?.weather[0].icon}.png`}
                alt=""
                className="w-20 justify-self-center self-center"
              />
              <span className="grid grid-cols-2 gap-x-2 gap-y-2">
                <span className="text-end text-sm text-slate-500">
                  Humidity
                </span>{" "}
                <img
                  src="/humidity.png"
                  className="h-12 justify-self-start row-span-2"
                />
                <span className="text-2xl font-bold self-center justify-self-end text-slate-500">
                  {dataWeather?.main.humidity}%
                </span>{" "}
              </span>
              <span className="flex flex-col text-center text-slate-500">
                <span>Max: {dataWeather?.main.temp_max}&deg;C</span>
                <span>Min: {dataWeather?.main.temp_min}&deg;C</span>
                <span>Feels like: {dataWeather?.main.feels_like}</span>
              </span>
              <span className="flex flex-col col-span-2 text-center text-slate-500">
                <span className="text-2xl">
                  {dataWeather?.weather[0].main}{" "}
                </span>
                <span>{dataWeather?.weather[0].description} </span>
              </span>
            </>
          )}
      </WeatherCard>
      <NewsCarousel>
        {searchTextSubmit === "" && (
          <img src="/empty.jpg" alt="" className="h-[10rem] mx-auto" />
        )}
        {isErrorCountry && !isFetchingCountry && (
          <span className="self-center text-center mx-auto">
            Unable to fetch data at this time
          </span>
        )}
        {isFetchingCountry || isFetchingNews ? <Loader /> : null}
        <CarouselContent>
          {!isFetchingNews &&
            !isFetchingCountry &&
            !isErrorCountry &&
            (dataNews as TNews) &&
            (dataNews as TNews).articles &&
            (dataNews as TNews).articles.length > 0 &&
            (dataNews as TNews)?.articles.map(
              ({ title, description, urlToImage, url }, i) => (
                <CarouselItem
                  key={i}
                  className="pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <a href={url}>
                    <Card className="">
                      <CardContent className="flex aspect-square justify-center p-0">
                        <span className="text-xl font-semibold text-ellipsis whitespace-nowrap overflow-hidden flex flex-col">
                          <img
                            className="h-52"
                            src={urlToImage ? urlToImage : "/640x360.png"}
                            alt=""
                          />
                          <span className="whitespace-nowrap overflow-hidden">
                            {title}
                          </span>
                          <span className="text-xs text-wrap">
                            {description}
                          </span>
                          {/* {title.length > 40
                                ? `${title.slice(0, 32)}...`
                                : title} */}
                        </span>
                      </CardContent>
                    </Card>
                  </a>
                </CarouselItem>
              )
            )}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </NewsCarousel>
    </div>
  );
};

export default Home;
