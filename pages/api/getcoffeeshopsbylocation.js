import { fetchCoffeeshops } from "../../lib/coffeeshops";

const getCoffeeshopsByLocation = async (req, res) => {
  try {
    const { latlng, limit } = req.query;
    const response = await fetchCoffeeshops(latlng, limit);
    res.status(200);
    res.json(response);
  } catch (err) {
    res.status(500);
    res.json({ message: "Oh no something went wrong", err });
  }
};

export default getCoffeeshopsByLocation;
