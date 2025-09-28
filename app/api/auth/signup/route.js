import { createUser, findUserByEmail } from "../../../../models/User.js";

import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    const existing = await findUserByEmail(email);
    if (existing) {
      return new Response(JSON.stringify({ error: "User already exists" }), { status: 400 });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    await createUser({ name, email, passwordHash });

    return new Response(JSON.stringify({ success: true }), { status: 201 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
