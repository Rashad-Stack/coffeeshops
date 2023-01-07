const header = {
  method: "GET", // or 'PUT'
  headers: {
    "Content-Type": "application/json",
    Authorization: process.env.NEXT_PUBLIC_COFFEESHOPS_API_KEY,
  },
};
export const fetchCoffeeshops = async () => {
  const response = await fetch(
    "https://api.foursquare.com/v3/places/search?query=coffee&limit=6",
    header
  )
    .then((res) => res.json())
    .then((data) => data);
  return response;
};
