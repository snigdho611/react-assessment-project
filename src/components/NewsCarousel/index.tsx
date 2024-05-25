import React, { ReactNode } from "react";
import { Card } from "../ui/card";
import { Carousel } from "../ui/carousel";

interface INewsCarouselProps {
  children: ReactNode;
}

const NewsCarousel: React.FC<INewsCarouselProps> = ({ children }) => {
  return (
    <Card className="col-span-3">
      <Carousel className="h-[25rem] flex items-center">{children}</Carousel>
    </Card>
  );
};

export default NewsCarousel;
