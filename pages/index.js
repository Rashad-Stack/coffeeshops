import Head from "next/head";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { Banner, CoffeeShopCard } from "../components";
import { fetchCoffeeshops } from "../lib/coffeeshops";

export const getStaticProps = async (context) => {
  const coffeeshops = await fetchCoffeeshops();

  return {
    props: { coffeeshops: coffeeshops.results }, // will be passed to the page component as props
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
            <div className="px-4 mx-auto max-w-screen-xl sm:py-4 lg:px-1">
              <div className="max-w-screen-md mb-8 md:mb-10 lg:mb-16">
                <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                  Coffee Shop in Dhaka
                </h2>
              </div>
              <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0 justify-items-center">
                {coffeeshops.map((coffeeshop) => (
                  <CoffeeShopCard
                    key={coffeeshop.fsq_id}
                    title={coffeeshop.name}
                    uri={`https://res.cloudinary.com/demo/image/fetch/${"https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/640px-A_small_cup_of_coffee.jpg"}`}
                    goto={`/coffee-shop/${coffeeshop.fsq_id}`}
                    description={coffeeshop.location.formatted_address}
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
