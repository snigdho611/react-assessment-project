import { TCountry } from "@/types/country";
import { TNews } from "@/types/news";
import { useQuery } from "@tanstack/react-query";

const useNews = (
  dataCountry: void | TCountry[] | undefined,
  isSuccessCountry: boolean,
  isRefetchingCountry: boolean
) =>
  useQuery({
    queryKey: ["news", { isSuccessCountry, isRefetchingCountry }],
    queryFn: async (): Promise<TNews | void> => {
      return await fetch(
        `https://newsapi.org/v2/top-headlines?country=${
          dataCountry && dataCountry[0].cca2.toLowerCase()
        }&apiKey=23cfe74ca26a47488e0457e15db36e6b`
      )
        .then((res) => res.json())
        .catch((err) => console.log(err));
    },
    enabled: !!(isSuccessCountry && !isRefetchingCountry),
    refetchOnWindowFocus: false,
    // staleTime: 5000,
  });

export default useNews;
