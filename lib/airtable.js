const Airtable = require("airtable");
const base = new Airtable({
  apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY,
}).base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_KEY);
const table = base("coffeeshops");

const getMinifiedRecord = (record) => ({ ...record.fields });
const getMinifiedRecords = (records) =>
  records.map((record) => getMinifiedRecord(record));

const getMatchedRecords = async (uid) => {
  const findCoffeeshopRecord = await table
    .select({
      filterByFormula: `id="${uid}"`,
      view: "Grid view",
    })
    .firstPage();

  return findCoffeeshopRecord;
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
    const response = await fetch(`/api/coffeeshopsairtable`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData(body)),
    });
    const dbCoffeeshop = await response.json();
    console.log(dbCoffeeshop);
  } catch (error) {
    console.error(error);
  }
};

export {
  getMatchedRecords,
  getMinifiedRecords,
  createRecord,
  table,
  createCoffeeShop,
};
