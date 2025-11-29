"use client";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HorizontalCarousel = ({ items }) => {
  const [slidesToShow, setSlidesToShow] = useState(1);

  useEffect(() => {
    const updateSlides = () => {
      const width = window.innerWidth;
      if (width < 640) setSlidesToShow(1);
      else if (width < 1024) setSlidesToShow(2);
      else setSlidesToShow(3);
    };
    updateSlides();
    window.addEventListener("resize", updateSlides);
    return () => window.removeEventListener("resize", updateSlides);
  }, []);

  const settings = {
    arrows: false,
    infinite: true,
    speed: 800,
    slidesToShow,
    slidesToScroll: 1,
    centerMode: true,               // Enables peek
    centerPadding: "60px",          // Width of the peek
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "ease-in-out",
    pauseOnHover: true,
  };

  return (
    <div className="w-full mt-8">
      <Slider {...settings}>
        {items.map((item, index) => (
          <div key={index} className="px-2">
            <div className="relative aspect-video rounded-2xl overflow-hidden ring-2 ring-primary/30">
              <Image
                src={item.src}
                alt={item.alt || `slide-${index}`}
                fill
                className="object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HorizontalCarousel;
