import { TCountry } from "@/types/country";
import { TNews } from "@/types/news";
import { useQuery } from "@tanstack/react-query";
import useSWR from "swr";

const useNews = (
  dataCountry: void | TCountry[] | undefined,
  isSuccessCountry: boolean,
  isRefetchingCountry: boolean
) =>
  useSWR(
    `https://newsapi.org/v2/top-headlines?country=${
      dataCountry && dataCountry[0].cca2.toLowerCase()
    }&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`,
    (url) => fetch(url).then((r) => r.json())
  );
// useQuery({
//   queryKey: ["news", { isSuccessCountry, isRefetchingCountry }],
//   queryFn: async (): Promise<TNews | void> => {
//     return await fetch(
//       `https://newsapi.org/v2/top-headlines?country=${
//         dataCountry && dataCountry[0].cca2.toLowerCase()
//       }&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`
//     )
//       .then((res) => res.json())
//       .catch((err) => console.log(err));
//   },
//   enabled: !!(isSuccessCountry && !isRefetchingCountry),
//   refetchOnWindowFocus: false,
//   // staleTime: 5000,
// });

export default useNews;
