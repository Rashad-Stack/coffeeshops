const Airtable = require("airtable");
const base = new Airtable({
  apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY,
}).base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_KEY);
const table = base("coffeeshops");

const getMinifiedRecord = (record) => ({
  ...record.fields,
  recordId: record.id,
});
const getMinifiedRecords = (records) =>
  records.map((record) => getMinifiedRecord(record));

const getMatchedRecords = async (uid) => {
  const findCoffeeshopRecord = await table
    .select({
      filterByFormula: `id="${uid}"`,
      view: "Grid view",
    })
    .firstPage();

  return getMinifiedRecords(findCoffeeshopRecord);
};

const createRecord = async (coffeeshop) => {
  const record = await table.create([
    {
      fields: {
        votes: coffeeshop.votes,
        id: coffeeshop.id,
        name: coffeeshop.name,
        address: coffeeshop.address,
        neighborhood: coffeeshop.neighborhood,
        image: coffeeshop.image,
      },
    },
  ]);
  return record;
};

const bodyData = (coffeeshop) => {
  const body = {
    id: coffeeshop.fsq_id,
    votes: 0,
    name: coffeeshop.name,
    address: coffeeshop?.location?.address || "",
    neighborhood:
      coffeeshop.location?.locality ||
      coffeeshop.location?.address ||
      coffeeshop.location?.country ||
      "",
    image: coffeeshop?.image,
  };
  return body;
};

const createCoffeeShop = async (body) => {
  try {
    await fetch(`/api/coffeeshopsairtable`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData(body)),
    });
  } catch (error) {
    return false;
  }
};

export {
  getMatchedRecords,
  getMinifiedRecords,
  createRecord,
  table,
  createCoffeeShop,
};
