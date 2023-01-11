import { v4 as uuid } from "uuid";
import {
  createRecord,
  getMatchedRecords,
  getMinifiedRecords,
} from "../../lib/airtable";

const airTableCoffeeshops = async (req, res) => {
  const { id, votes, name, address, neighborhood, image } = req.body;
  const uid = id || uuid().split("-").join().replaceAll(",");
  const records = await getMatchedRecords(uid);
  console.log(
    "🚀 ~ file: coffeeshopsairtable.js:12 ~ airTableCoffeeshops ~ records",
    records,
    records.length,
    records.length > 0
  );

  try {
    if (req.method === "POST") {
      if (records.length !== 0) {
        res.json({ message: "Already exist", records });
      } else {
        const recordCreate = await createRecord({
          votes,
          id: uid,
          name,
          address,
          neighborhood,
          image,
        });
        const record = getMinifiedRecords(recordCreate);
        res.json({ message: "Record Created", record });
      }
    }
  } catch (error) {
    res.status(500);
    res.json({ message: "internal server error", error });
  }
};

export default airTableCoffeeshops;
