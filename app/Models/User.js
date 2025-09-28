import clientPromise from "../../lib/mongodb.js";

export async function findUserByEmail(email) {
  const client = await clientPromise;
  const db = client.db("unitx"); // DB name
  return db.collection("users").findOne({ email });
}

export async function createUser({ name, email, passwordHash }) {
  const client = await clientPromise;
  const db = client.db("unitx");
  const result = await db.collection("users").insertOne({
    name,
    email,
    passwordHash,
    createdAt: new Date(),
  });
  return result.insertedId;
}
