import { TCountry } from "@/types/country";
import { TNews } from "@/types/news";
import { useQuery } from "@tanstack/react-query";

const useNews = (dataCountry: void | TCountry[] | undefined) =>
  useQuery({
    queryKey: [
      "news",
      { country: dataCountry && dataCountry.length > 0 && dataCountry[0].cca2 },
    ],
    queryFn: async (): Promise<TNews | void> => {
      return await fetch(
        `${import.meta.env.VITE_NEWS_SERVER}/top-headlines?country=${
          dataCountry && dataCountry[0].cca2.toLowerCase()
        }&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`
      )
        .then((res) => res.json())
        .catch((err) => console.log(err));
    },
    enabled: !!(dataCountry && dataCountry.length > 0 && dataCountry[0].cca2),
    refetchOnWindowFocus: false,
    staleTime: import.meta.env.VITE_STALE_TIME,
    // staleTime: 5000,
  });

export default useNews;
