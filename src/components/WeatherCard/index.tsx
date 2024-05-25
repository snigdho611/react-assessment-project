import React, { ReactNode } from "react";
import { Card } from "../ui/card";

interface IWeatherCardProps {
  isFetchingAll: boolean;
  children: ReactNode;
}

const WeatherCard: React.FC<IWeatherCardProps> = ({
  isFetchingAll,
  children,
}) => {
  return (
    <div className="col-span-3 md:col-span-2 h-[213px]">
      <Card
        className={`grid ${
          !isFetchingAll && "grid-cols-3"
        } py-3 px-8 h-full justify-center items-center`}
      >
        {children}
      </Card>
    </div>
  );
};

export default WeatherCard;
