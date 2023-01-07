import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import coffeeshopsData from "../../data/coffeeshop.json";

export const getStaticProps = async ({ params }) => {
  return {
    props: {
      coffeeshop: coffeeshopsData.find(
        (coffeeshop) => coffeeshop.id.toString() === params.id
      ),
    }, // will be passed to the page component as props
  };
};

export const getStaticPaths = async () => {
  const paths = coffeeshopsData.map((coffeeshop) => {
    return {
      params: {
        id: coffeeshop.id.toString(),
      },
    };
  });

  return {
    paths: paths,
    fallback: true,
  };
};

const CoffeeShop = (props) => {
  console.log("🚀 ~ file: [id].js:33 ~ CoffeeShop ~ props", props);
  const route = useRouter();

  if (route.isFallback) {
    return <p>Loading...</p>;
  }
  const { title, description, image } = props.coffeeshop;

  const handleUpVote = () => {
    console.log("🚀 ~ file: [id].js:43 ~ handleUpVote ~ handleUpVote");
  };

  return (
    <>
      <Head>
        <title>{title}</title>
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
                src={`https://res.cloudinary.com/demo/image/fetch/${image}`}
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
                <h3 className="text-5xl font-bold text-	error-content">100+</h3>
                <div className="mt-4 border-t-2 border-indigo-100 pt-2">
                  <p className="flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-gray-500">
                    <Image
                      src="/static/icons/coffee.svg"
                      width={35}
                      height={35}
                      alt="coffee"
                      priority
                    />
                    <span>New York</span>
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
              <h1 className="text-2xl font-bold">{title}</h1>
              <p className="py-6 text-lg">{description}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CoffeeShop;
// continue with 64
