import Link from "next/link";
import React from "react";

const BannerTitle = () => {
  return (
    <div>
      <Link
        href="/"
        className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
        role="alert"
      >
        <span className="text-xs bg-stone-900 rounded-full text-white px-4 py-1.5 mr-3">
          New
        </span>
        <span className="text-sm font-medium">
          Coffee Shop is out! See what's new
        </span>
        <svg
          className="ml-2 w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </Link>
      <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Coffee Connoisseur
      </h1>
      <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
        Discover your local coffee shops!
      </p>
    </div>
  );
};

export default BannerTitle;
