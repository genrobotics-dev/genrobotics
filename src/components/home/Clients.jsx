import Image from "next/image";
import React from "react";

const ClientsData = [];

for (let i = 1; i <= 88; i++) {
  ClientsData.push({
    icon: `/home/clients/client${i}.webp`,
    width: 100, // You can set a default width
    height: 100, // You can set a default height
  });
}

const Clients = () => {
  return (
    <section className=" py-16">
      {/* Heading */}
      <div className="w-full max-w-2xl mx-auto text-center space-y-4 2xl:max-w-4xl">
        <h2 className="font-anton text-[#FCD901]">
          140+ Esteemed Clients{" "}
          <span className="text-white block md:inline">Across Verticals</span>
        </h2>
        <h4 className="text-white">
          Leading organizations across a wide range of diverse sectors trust us as their partners, a privilege we deeply value.
        </h4>
      </div>

      {/* Scrolling logos */}
      <div className="mt-12 overflow-hidden">
        <div className="marquee-content-client 2xl:max-w-[90%] 2xl:mx-auto">
          <div className="flex gap-8 items-center">
            {[...ClientsData, ...ClientsData].map((item, index) => (
              <div
                key={index}
                className="shrink-0 flex items-center justify-center"
              >
                <Image
                  src={item.icon}
                  alt={`client-${index}`}
                  width={item.width}
                  height={item.height}
                  className="object-contain max-h-16 md:max-h-20 2xl:max-h-24"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clients;
