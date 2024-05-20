import { TCountry } from "@/types/country";
import { TWeather } from "@/types/weather";
import { useQuery } from "@tanstack/react-query";

const useWeather = (
  dataCountry: void | TCountry[] | undefined,
  isSuccessCountry: boolean,
  isRefetchingCountry: boolean
) =>
  useQuery({
    queryKey: ["weather", { isSuccessCountry, isRefetchingCountry }],
    queryFn: async (): Promise<TWeather | void> => {
      return await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${
          dataCountry && dataCountry[0].latlng[0]
        }&lon=${
          dataCountry && dataCountry[0].latlng[1]
        }&appid=14132a7935a6db2a69756f57d6f56bb9`
      )
        .then((res) => res.json())
        .catch((err) => console.log(err));
    },
    enabled: !!(isSuccessCountry && !isRefetchingCountry),
    refetchOnWindowFocus: false,
    // staleTime: 5000,
  });

export default useWeather;
