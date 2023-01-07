import { useRouter } from "next/router";
import React from "react";
import coffeeshopsData from "../../data/coffeeshop.json";

export const getStaticProps = async ({ params }) => {
  return {
    props: {
      coffeeshops: coffeeshopsData.find(
        (coffeeshop) => coffeeshop.id.toString() === params.id
      ),
    }, // will be passed to the page component as props
  };
};

export const getStaticPaths = async () => {
  return {
    paths: [
      { params: { id: "0" } },
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } },
      { params: { id: "4" } },
      { params: { id: "5" } },
      { params: { id: "6" } },
    ],
    fallback: false,
  };
};

const CoffeeShop = (props) => {
  const route = useRouter();

  return (
    <section className="bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 h-screen">
      CoffeeShop {route.query.id}
    </section>
  );
};

export default CoffeeShop;
