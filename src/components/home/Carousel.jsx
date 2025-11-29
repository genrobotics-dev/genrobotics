"use client";
import { useState } from "react";
import Image from "next/image";

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(1);

  const items = [
    {
      id: 0,
      image: "/home/award1.png",
      alt: "Bandicoot 2.0 Launched",
      title: "Bandicoot 2.0 Launched",
      desc: "Bandicoot 2.0 was launched in the presence of Hon'ble Prime Minister Shri Narendra Modi",
    },
    {
      id: 1,
      image: "/home/award1.png",
      alt: "Bandicoot 2.0 Launched",
      title: "Bandicoot 2.0 Launched",
      desc: "Bandicoot 2.0 was launched in the presence of Hon'ble Prime Minister Shri Narendra Modi",
    },
    {
      id: 2,
      image: "/home/award1.png",
      alt: "Bandicoot 2.0 Launched",
      title: "Bandicoot 2.0 Launched",
      desc: "Bandicoot 2.0 was launched in the presence of Hon'ble Prime Minister Shri Narendra Modi",
    },
  ];

  const handleNext = () => {
    setActiveIndex((current) => (current + 1) % items.length);
  };

  const handlePrevious = () => {
    setActiveIndex((current) => (current - 1 + items.length) % items.length);
  };

  return (
    <div className="flex gap-24">
      {items.map((item, index) => (
        <>
          <div className="w-xl shrink-0 text-center space-y-2">
            <Image
              src={items[activeIndex].image}
              alt={items[activeIndex].alt}
              width={750}
              height={400}
              className="h-auto"
            />
            <p className="text-white text-lg font-semibold">
              {items[activeIndex].title}
            </p>
            <p className="text-lg text-white font-extralight">
              {items[activeIndex].desc}
            </p>
          </div>
        </>
      ))}
    </div>
  );
};

export default Carousel;
