import React from "react";
import BannerActionBtn from "./banner.action.btn";
import BannerTitle from "./banner.title";

const Banner = ({ handleClick, loader }) => {
  return (
    <section>
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:px-12">
        <BannerTitle />
        <BannerActionBtn handleClick={handleClick} loader={loader} />
      </div>
    </section>
  );
};

export default Banner;
