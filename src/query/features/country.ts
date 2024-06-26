import { TCountry, TCountryError } from "@/types/country";
import { useQuery } from "@tanstack/react-query";

const useCountry = (searchText: string) =>
  useQuery({
    queryKey: ["countries", { country: searchText }],
    queryFn: async (): Promise<TCountry[] | TCountryError> => {
      return await fetch(
        `${
          import.meta.env.VITE_COUNTRY_SERVER
        }/name/${searchText}?fullText=true`
      )
        .then((res) => res.json())
        .catch((err) => console.log(err));
    },
    enabled: !!searchText,
    refetchOnWindowFocus: false,
    retry: 5,
    staleTime: import.meta.env.VITE_STALE_TIME,
  });

export default useCountry;
