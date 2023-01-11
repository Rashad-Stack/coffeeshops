import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_API_KEY,
});

const header = {
  method: "GET", // or 'PUT'
  headers: {
    "Content-Type": "application/json",
    Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
  },
};

const getCoffeeStorePhotos = async (query, limit) => {
  const photos = await unsplash.search.getPhotos({
    query: query,
    perPage: limit,
    orientation: "landscape",
  });

  const photosResponse = photos.response.results;
  const photosResults = photosResponse.map((photo) => photo.urls["small"]);
  return photosResults;
};

export const fetchCoffeeshops = async (
  ll = "23.9003876,90.3597879",
  limit = 6,
  query = "coffee"
) => {
  const photos = await getCoffeeStorePhotos(query, limit);

  const response = await fetch(
    `https://api.foursquare.com/v3/places/search?query=${query}&ll=${ll}&limit=${limit}`,
    header
  ).then((res) => res.json());
  return response.results.map((coffeeshops, idx) => {
    return {
      ...coffeeshops,
      image: photos[idx],
    };
  });
};
