import { TCountry } from "@/types/country";
import { useQuery } from "@tanstack/react-query";

const useCountry = (searchText: string) =>
  useQuery({
    queryKey: ["countries"],
    queryFn: async (): Promise<TCountry[] | void> => {
      return await fetch(
        `https://restcountries.com/v3.1/name/${searchText}?fullText=true`
      )
        .then((res) => res.json())
        .catch((err) => console.log(err));
    },
    enabled: false,
    refetchOnWindowFocus: false,
  });

export default useCountry;
