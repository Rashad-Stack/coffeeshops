import Link from "next/link";
import React from "react";
import BannerActionBtn from "./banner.action.btn";
import BannerTitle from "./banner.title";

const Banner = () => {
  return (
    <section>
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
        <BannerTitle />
        <BannerActionBtn />
      </div>
    </section>
  );
};

export default Banner;
