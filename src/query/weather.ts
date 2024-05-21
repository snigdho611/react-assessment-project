import { TCountry } from "@/types/country";
import { TWeather } from "@/types/weather";
import { useQuery } from "@tanstack/react-query";
import useSWR from "swr";

const useWeather = (
  dataCountry: void | TCountry[] | undefined,
  isSuccessCountry: boolean,
  isRefetchingCountry: boolean
) =>
  useSWR(
    `https://api.openweathermap.org/data/2.5/weather?lat=${
      dataCountry && dataCountry[0].latlng[0]
    }&lon=${dataCountry && dataCountry[0].latlng[1]}&units=metric&appid=${
      import.meta.env.VITE_WEATHER_API_KEY
    }`,
    (url) => fetch(url).then((r) => r.json())
  );
// useQuery({
//   queryKey: ["weather", { isSuccessCountry, isRefetchingCountry }],
//   queryFn: async (): Promise<TWeather | void> => {
//     return await fetch(
//       `https://api.openweathermap.org/data/2.5/weather?lat=${
//         dataCountry && dataCountry[0].latlng[0]
//       }&lon=${
//         dataCountry && dataCountry[0].latlng[1]
//       }&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
//     )
//       .then((res) => res.json())
//       .catch((err) => console.log(err));
//   },
//   enabled: !!(isSuccessCountry && !isRefetchingCountry),
//   refetchOnWindowFocus: false,
//   // staleTime: 5000,
// });

export default useWeather;
