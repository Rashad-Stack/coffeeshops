import { getMatchedRecords, table } from "../../lib/airtable";

const voteCoffeeshopById = async (req, res) => {
  const { id } = req.body;
  if ((req.method = "PUT")) {
    try {
      if (id) {
        const records = await getMatchedRecords(id);
        if (records.length <= 0) {
          res.json({ message: "ID Does not exist" });
        } else {
          const record = records[0];
          const calculateVoting = parseInt(record.votes) + parseInt(1);

          await table.update([
            {
              id: record.recordId,
              fields: {
                votes: calculateVoting,
              },
            },
          ]);
          res.status(200);
          res.json({ results: record });
        }
      } else {
        res.status(400);
        res.json({ message: "ID is missing" });
      }
    } catch (error) {
      res.status(500);
      res.json({ message: "Internal server error", error });
    }
  }
};

export default voteCoffeeshopById;
