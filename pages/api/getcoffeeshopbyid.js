import { getMatchedRecords } from "../../lib/airtable";

const getCoffeeshopById = async (req, res) => {
  const { id } = req.query;

  try {
    if (id) {
      const records = await getMatchedRecords(id);
      if (records.length <= 0) {
        res.json({ message: "ID Does not exist" });
      } else {
        res.status(200);
        res.json({ results: records });
      }
    } else {
      res.status(400);
      res.json({ message: "ID is missing" });
    }
  } catch (error) {
    res.status(500);
    res.json({ message: "Internal server error", error });
  }
};

export default getCoffeeshopById;
