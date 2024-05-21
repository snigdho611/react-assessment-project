import { TCountry } from "@/types/country";
import { useQuery } from "@tanstack/react-query";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

const useCountry = (searchText: string) =>
  useSWRMutation(
    `https://restcountries.com/v3.1/name/${searchText}?fullText=true`,
    (url) => fetch(url).then((r) => r.json())
  );
// useQuery({
//   queryKey: ["countries"],
//   queryFn: async (): Promise<TCountry[]> => {
//     return await fetch(
//       `https://restcountries.com/v3.1/name/${searchText}?fullText=true`
//     )
//       .then((res) => res.json())
//       .catch((err) => console.log(err));
//   },
//   enabled: false,
//   refetchOnWindowFocus: false,
// });

export default useCountry;
