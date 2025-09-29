import clientPromise from "../lib/mongodb.js";

export async function saveConversion({ userId, category, fromUnit, toUnit, inputValue, outputValue }) {
  const client = await clientPromise;
  const db = client.db("unitx");
  const result = await db.collection("conversions").insertOne({
    userId,
    category,
    fromUnit,
    toUnit,
    inputValue,
    outputValue,
    timestamp: new Date()
  });
  return result.insertedId;
}

export async function getConversions(userId, page = 1, limit = 10, categoryFilter = null) {
  const client = await clientPromise;
  const db = client.db("unitx");
  const query = { userId };
  if (categoryFilter) query.category = categoryFilter;

  const skip = (page - 1) * limit;

  const conversions = await db
    .collection("conversions")
    .find(query)
    .sort({ timestamp: -1 })
    .skip(skip)
    .limit(limit)
    .toArray();

  const total = await db.collection("conversions").countDocuments(query);

  return { conversions, total };
}
