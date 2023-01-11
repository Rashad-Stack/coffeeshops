import React from "react";

const BannerActionBtn = ({ handleClick, loader }) => {
  const Loader = () => {
    return (
      <div className="w-full flex justify-center items-center space-x-2 animate-pulse">
        <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
        <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
        <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
      </div>
    );
  };

  return (
    <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
      <button
        onClick={handleClick}
        className="inline-flex justify-center items-center w-48 h-12 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100  dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800 active:scale-95 transition"
      >
        {loader ? <Loader /> : "View coffeeshop nearby"}
      </button>
    </div>
  );
};

export default BannerActionBtn;
