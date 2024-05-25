import React, { ReactNode } from "react";

interface ICountryProps {
  children: ReactNode;
}

const CountryCard: React.FC<ICountryProps> = ({ children }) => {
  return (
    <div className="flex justify-center col-span-3 md:col-span-1 h-[213px]">
      {children}
    </div>
  );
};

export default CountryCard;
