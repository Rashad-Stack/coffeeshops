import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useSWR from "swr";

import { createCoffeeShop } from "../../lib/airtable";
import { fetchCoffeeshops } from "../../lib/coffeeshops";
import { isEmpty } from "../../utils";

export const getStaticProps = async (staticProps) => {
  const coffeeshops = await fetchCoffeeshops();
  const findCoffeeshopById = coffeeshops.find(
    (coffeeshop) => coffeeshop?.fsq_id === staticProps.params?.id
  );
  return {
    props: {
      coffeeshop: findCoffeeshopById || {},
    }, // will be passed to the page component as props
  };
};

export const getStaticPaths = async () => {
  const coffeeshops = await fetchCoffeeshops();

  const paths = coffeeshops.map((coffeeshop) => {
    return {
      params: {
        // id: null,
        id: coffeeshop.fsq_id,
      },
    };
  });

  return {
    // paths: null,
    paths: paths,
    fallback: true,
  };
};

const CoffeeShop = (initialProps) => {
  const { coffeeshops } = useSelector((state) => state.currentLocation);
  const [coffeeStore, setCoffeeStore] = useState(initialProps.coffeeshop || {});
  const [errors, setErrors] = useState(null);
  const [voting, setVoting] = useState(0);
  const route = useRouter();

  const { data, error, isLoading } = useSWR(
    `/api/getcoffeeshopbyid?id=${route.query.id}`,
    (url) =>
      fetch(url)
        .then((res) => res.json())
        .then((data) => data.results)
  );

  useEffect(() => {
    if (!isLoading) {
      if (isEmpty(initialProps.coffeeshop)) {
        if (coffeeshops.length > 0) {
          const findCoffeeStoreById = coffeeshops.find((coffeeStore) => {
            return coffeeStore.fsq_id.toString() === route.query.id; //dynamic id
          });
          if (findCoffeeStoreById) {
            setCoffeeStore(findCoffeeStoreById);
            createCoffeeShop(findCoffeeStoreById);
          }
        }
      } else {
        createCoffeeShop(initialProps.coffeeshop);
      }
    }
  }, [coffeeshops, initialProps.coffeeshop, route.query.id, isLoading]);

  useEffect(() => {
    if (!isLoading) {
      if (data && data.length > 0) {
        setVoting(data[0].votes);
        setCoffeeStore(data[0]);
      }
    }
  }, [data, error, isLoading, route.query.id]);

  const handleUpVote = async () => {
    setErrors(null);
    try {
      const response = await fetch("/api/votecoffeeshopbyis", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
        },
        body: JSON.stringify({
          id: route.query.id,
        }),
      });

      const dbCoffeeshop = await response.json();
      if (dbCoffeeshop.results && dbCoffeeshop.results.length !== 0) {
        setVoting(dbCoffeeshop.results.votes + 1);
      }
    } catch (err) {
      setErrors("Error voting", error.message);
    }
  };

  if (route.isFallback) {
    return <p>Loading...</p>;
  }
  const { name, location, image } = coffeeStore;

  // return false;

  return (
    <>
      <Head>
        <title>{name}</title>
      </Head>
      <section className="bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 h-full md:h-screen">
        <Link href="/">
          <div className="p-10">
            <button className="btn btn-ghost flex items-center gap-2 capitalize">
              <Image
                src="/static/icons/back.svg"
                width={25}
                height={25}
                alt="coffee"
                priority
              />
              <span>Go Back</span>
            </button>
          </div>
        </Link>
        <div className="container-md mx-auto hero-content flex-col md:flex-row items-center justify-center gap-10">
          <div className="card flex-shrink-0 w-full md:w-3/4 shadow-2xl">
            <div className="card-body">
              <Image
                src={
                  image ||
                  "https://images.unsplash.com/photo-1513530176992-0cf39c4cbed4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMTE2NzN8MHwxfHNlYXJjaHw2fHxjb2ZmZWV8ZW58MHwwfHx8MTY3MzMxMjA1OA&ixlib=rb-4.0.3&q=80&w=400"
                }
                width={1080}
                height={720}
                alt="demo"
                className="w-full h-full rounded-md"
              />
            </div>
          </div>
          <div className="flex flex-row md:flex-col gap-3 items-start">
            <div className="w-full group flex flex-col justify-between rounded-sm p-8 shadow-xl transition-shadow hover:shadow-lg">
              <div>
                <h3 className="text-5xl font-bold text-	error-content">
                  {voting}+
                </h3>
                <div className="mt-4 border-t-2 border-indigo-100 pt-2">
                  {errors && <h1 className="p-3 text-red-600">{errors}</h1>}
                  <p className="flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-gray-500">
                    <Image
                      src="/static/icons/coffee.svg"
                      width={35}
                      height={35}
                      alt="coffee"
                    />
                    <span>
                      {location?.locality || location?.address} (
                      {location?.country})
                    </span>
                  </p>
                </div>
              </div>
              <button
                className="mt-16 inline-flex items-center btn btn-ghost space-x-3"
                onClick={handleUpVote}
              >
                <p className="text-lg font-medium capitalize">Up vote</p>
                <Image
                  src="/static/icons/up.svg"
                  width={10}
                  height={10}
                  alt="coffee"
                  priority
                  className="group-hover:-translate-y-1 transition"
                />
              </button>
            </div>

            <div className="text-center lg:text-left py-5">
              <h1 className="text-2xl font-bold">{name}</h1>
              <p className="py-6 text-lg">
                {location?.formatted_address ||
                  location?.cross_street ||
                  location?.address}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CoffeeShop;
// continue with 64
