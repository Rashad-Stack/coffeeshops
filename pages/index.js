import Head from "next/head";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Banner, ShopSegment } from "../components";
import { fetchCoffeeshops } from "../lib/coffeeshops";
import useTrackLocation from "../hooks/locationHooks";
import { useDispatch, useSelector } from "react-redux";
import { setCoffeeshops } from "../redux/slices/currentLocationSlices";

export const getStaticProps = async () => {
  const coffeeshops = await fetchCoffeeshops();

  return {
    props: { coffeeshops }, // will be passed to the page component as props
  };
};

function Home(props) {
  const { setTheme } = useTheme();
  const { handleTrackLocation, locationErrorMsg, isLoading } =
    useTrackLocation();
  const { coffeeshops } = useSelector((state) => state.currentLocation);
  const { location } = useSelector((state) => state.currentLocation);
  const [coffeeStoreError, setCoffeeshopsError] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    setTheme("light");
  }, [setTheme]);

  useEffect(() => {
    (async () => {
      if (location) {
        try {
          const response = await fetch(
            `/api/getcoffeeshopsbylocation?latlng=${location}&limit=30`
          );
          const coffeeStore = await response.json();

          dispatch(setCoffeeshops(coffeeStore));
          setCoffeeshopsError(null);
        } catch (error) {
          setCoffeeshopsError(error.message);
        }
      }
    })();
  }, [dispatch, location]);

  return (
    <>
      <Head>
        <title>Coffee Shop</title>
        <meta name="description" content="Generated coffee shop near you" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400">
        <Banner handleClick={handleTrackLocation} loader={isLoading} />
        {locationErrorMsg && (
          <div
            className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">Danger alert! </span>
            {locationErrorMsg}
          </div>
        )}
        {coffeeStoreError && (
          <div
            className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">Danger alert! </span>
            {coffeeStoreError}
          </div>
        )}

        {coffeeshops.length > 0 && (
          <ShopSegment
            coffeeshops={coffeeshops}
            nearby="Coffee Shops near me"
          />
        )}
        {props.coffeeshops && (
          <ShopSegment
            coffeeshops={props.coffeeshops}
            nearby="Coffee Shops in Dhaka"
          />
        )}
      </main>
    </>
  );
}

export default Home;
