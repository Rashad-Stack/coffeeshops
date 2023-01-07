import Head from "next/head";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { Banner, CoffeeShopCard } from "../components";
import coffeeshopsData from "../data/coffeeshop.json";

export const getStaticProps = async (context) => {
  return {
    props: { coffeeshops: coffeeshopsData }, // will be passed to the page component as props
  };
};

export default function Home({ coffeeshops }) {
  const { setTheme } = useTheme();
  useEffect(() => {
    setTheme("light");
  }, [setTheme]);

  return (
    <>
      <Head>
        <title>Coffee Shop</title>
        <meta name="description" content="Generated coffee shop near you" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400">
        <Banner />
        <section>
          {coffeeshops && (
            <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
              <div className="max-w-screen-md mb-8 md:mb-10 lg:mb-16">
                <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                  Coffee Shop Toronto
                </h2>
              </div>
              <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0 justify-items-center">
                {coffeeshops.map((coffeeshop) => (
                  <CoffeeShopCard
                    key={coffeeshop.id}
                    title={coffeeshop.title}
                    uri={`https://res.cloudinary.com/demo/image/fetch/${coffeeshop.image}`}
                    goto={`/coffee-shop/${coffeeshop.id}`}
                    description={coffeeshop.description}
                  />
                ))}
              </div>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
