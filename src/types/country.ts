export type TCountry = {
  cca2: string;
  latlng: number[];
  capital: string[];
  flag: string;
  flags: {
    alt: string;
    png: string;
    svg: string;
  };
  name: {
    common: string;
    official: string;
  };
};

export type TCountryError = {
  message: string;
  status: number;
};
