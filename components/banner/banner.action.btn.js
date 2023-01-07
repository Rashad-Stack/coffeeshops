import Link from "next/link";
import React from "react";

const BannerActionBtn = () => {
  const handleActionBtn = () => {
    console.log(
      "🚀 ~ file: banner.action.btn.js:6 ~ handleActionBtn ~ handleActionBtn"
    );
  };

  return (
    <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
      <button
        onClick={handleActionBtn}
        className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100  dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800 active:scale-95 transition"
      >
        View stories nearby
      </button>
    </div>
  );
};

export default BannerActionBtn;
