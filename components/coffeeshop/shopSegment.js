import React from "react";
import CoffeeShopCard from "./coffeeshopCard";

const ShopSegment = ({ coffeeshops, nearby }) => {
  return (
    <section>
      <div className="px-4 mx-auto max-w-screen-xl sm:py-4 lg:px-1">
        <div className="max-w-screen-md mb-8 md:mb-10 lg:mb-16">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            {nearby}
          </h2>
        </div>
        <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0 justify-items-center">
          {coffeeshops.map((coffeeshop) => (
            <CoffeeShopCard
              key={coffeeshop.fsq_id}
              title={coffeeshop.name}
              uri={coffeeshop.image}
              goto={`/coffee-shop/${coffeeshop.fsq_id}`}
              description={coffeeshop.location.formatted_address}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopSegment;
