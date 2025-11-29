"use client";
import { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import Image from "next/image";

const content = [
  {
    message:
      "I am happy about the team for inventing a robot to replace Manual Scavenging. As young professionals your commitment to use technology for the social good is worth emulation by others. Digital technology holds tremendous potential for betterment of the people and their lives.",
    image: "/home/testmonials/venkaiah.webp",
    name: "Shri. Venkaiah Naidu",
    designation: "Hon'ble Former Vice President of India",
  },
  {
    message:
      "I really appreciate the efforts taken by Genrobotics to address the requirements of the medical profession to cater to the needs of PM&R.",
    image: "/home/testmonials/anand-mahindra.webp",
    name: "Anand Mahindra",
    designation: "Chairman, Mahindra Group",
  },
  {
    message:
      "I’ve witnessed Genrobotics’ remarkable journey since their first Green Talk—transforming sanitation with robots that take on work no human should endure. From deploying 300 robots across 21 states to growing profitably by 250%, they are leading India’s National Namaste Mission to end manual scavenging once and for all.",
    image: "/home/testmonials/adhani.webp",
    name: "Gautam Adani",
    designation: "The founder and chairman of the Adani Group",
  },
  {
    message:
      "Genrobotics is among the most innovative companies in India, with the potential to impact millions of lives. Starting with Bandicoot to solve a critical social problem, this young team is now advancing robotics for healthcare and beyond. I believe Genrobotics will grow into a strong anchor for the development of our states and for the nation as a whole",
    image: "/home/testmonials/sridhar.webp",
    name: "Sridhar Vembu",
    designation: "Former CEO of Zoho Corporation",
  },
  {
    message:
      "My eight-year journey with Genrobotics fills me with immense pride. Their relentless growth from a small space to an advanced facility shows they are poised to make Kerala, and all of India, proud. I am confident they will achieve a successful IPO.",
    image: "/home/testmonials/anil-joshi.webp",
    name: "Anil Joshi",
    designation: "Founder and Managing Partner, Unicorn India Ventures",
  }
];

const Testimonials = () => {
  const [slideToShow, setSlideToShow] = useState(1);
  const [maxHeight, setMaxHeight] = useState(0);
  const cardRefs = useRef([]);

  useEffect(() => {
    const updateSlides = () => {
      const width = window.innerWidth;

      switch (true) {
        case width < 640:
          setSlideToShow(1); // mobile
          break;

        case width >= 640 && width < 1024:
          setSlideToShow(2); // tablet
          break;

        default:
          setSlideToShow(3); // desktop
          break;
      }
    };

    // Run on mount
    updateSlides();

    // Run on resize
    window.addEventListener("resize", updateSlides);

    // Cleanup
    return () => window.removeEventListener("resize", updateSlides);
  }, []);

  useEffect(() => {
    // find tallest card
    if (cardRefs.current.length > 0) {
      const heights = cardRefs.current.map((ref) =>
        ref ? ref.getBoundingClientRect().height : 0
      );
      setMaxHeight(Math.max(...heights));
    }
  }, [slideToShow]);

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 1000,
    slidesToShow: slideToShow,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "linear",
    centerMode: slideToShow === 1 ? false : true,
    centerPadding: "0px",
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
    appendDots: (dots) => (
      <div>
        <ul className="flex justify-center items-center space-x-2 mt-4">
          {dots}
        </ul>
      </div>
    ),
    customPaging: () => (
      <div className="w-3 h-3 rounded-full bg-gray-500"></div>
    ),
  };

  return (
    <section className="section py-16 bg-black">
      {/* Heading */}
      <div className="max-w-5xl mx-auto text-center space-y-4">
        <h2 className="font-anton text-[#FCD901]">
          Voices of Support :{" "}
          <span className="text-white block 2xl:inline">
            What Leaders Are Saying
          </span>
        </h2>
      </div>

      {/* Carousel */}
      <div className="mt-12 2xl:mt-16">
        <Slider {...settings} className="flex items-stretch">
          {content.map((item, index) => (
            <div key={index} className="p-4 h-full">
              <div
                ref={(el) => (cardRefs.current[index] = el)}
                className="p-6 md:p-8 w-full bg-gradient-to-br from-black/0 to-[#FCD901]/20 rounded-2xl border border-[#FCD901]/50 flex flex-col justify-between "
              >
                {/* Top quote + message */}
                <div className="h-[20rem]">
                  <div className="relative w-10 h-10 xl:w-14 xl:h-14">
                    <Image
                      src="/home/quotes-left.svg"
                      alt="Opening quote"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h5 className="text-white font-quattro mt-4 text-justify">
                    {item.message}
                  </h5>
                </div>

                {/* Profile + closing quote */}
                <div className="relative flex justify-between items-end mt-4">
                  <div>
                    <div className="relative w-20 h-20 lg:w-20 lg:h-20 xl:w-24 xl:h-24 rounded-full overflow-hidden mb-3">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="text-white font-quattro">{item.name}</h3>
                    <h6 className="text-white opacity-80">
                      {item.designation}
                    </h6>
                  </div>
                  <div className="absolute right-0 w-12 h-12 md:w-16 md:h-16 xl:w-20 xl:h-20">
                    <Image
                      src="/home/quotes-right.svg"
                      alt="Closing quote"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>

        {/* Custom dot styles */}
        <style jsx global>{`
          .slick-dots li div {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background-color: gray;
          }
          .slick-dots li.slick-active div {
            background-color: #fcd901;
          }
          .slick-slide {
            user-select: text !important;
          }
        `}</style>
      </div>
    </section>
  );
};

export default Testimonials;
