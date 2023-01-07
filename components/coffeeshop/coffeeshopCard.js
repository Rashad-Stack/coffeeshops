import Image from "next/image";
import Link from "next/link";
import React from "react";

const CoffeeShopCard = ({ title, description, uri, goto }) => {
  return (
    <Link href={goto} className="flex justify-center">
      <div className="max-w-sm bg-gray-700 border border-gray-200 rounded-lg shadow-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40  dark:bg-gray-700 dark:border-gray-700 hover:-translate-y-1 transition">
        <Image
          src={uri}
          width={700}
          height={400}
          className="rounded-t-lg"
          alt={title}
          preload="true"
        />

        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>

          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CoffeeShopCard;
