import { TCountry } from "@/types/country";
import { TWeather } from "@/types/weather";
import { useQuery } from "@tanstack/react-query";

const useWeather = (dataCountry: void | TCountry[] | undefined) =>
  useQuery({
    queryKey: ["weather", { dataCountry }],
    queryFn: async (): Promise<TWeather | void> => {
      return await fetch(
        `${import.meta.env.VITE_WEATHER_SERVER}/weather?lat=${
          dataCountry && dataCountry[0].latlng[0]
        }&lon=${dataCountry && dataCountry[0].latlng[1]}&units=metric&appid=${
          import.meta.env.VITE_WEATHER_API_KEY
        }`
      )
        .then((res) => res.json())
        .catch((err) => console.log(err));
    },
    enabled: !!(dataCountry && dataCountry.length > 0 && dataCountry[0].latlng),
    refetchOnWindowFocus: false,
    // staleTime: 5000,
  });

export default useWeather;
