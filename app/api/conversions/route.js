import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth.js";
import { saveConversion, getConversions } from "../../../models/Conversion.js";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response("Unauthorized", { status: 401 });

  const { category, fromUnit, toUnit, inputValue, outputValue } = await req.json();
  if (!category || !fromUnit || !toUnit || inputValue === undefined || outputValue === undefined) {
    return new Response("All fields are required", { status: 400 });
  }

  await saveConversion({
    email: session.user.email,
    category,
    fromUnit,
    toUnit,
    inputValue,
    outputValue
  });

  return new Response(JSON.stringify({ success: true }), { status: 201 });
}

export async function GET(req) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response("Unauthorized", { status: 401 });

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 10;
  const category = searchParams.get("category") || null;

  const { conversions, total } = await getConversions(session.user.email, page, limit, category);

  return new Response(JSON.stringify({ conversions, total, page, limit }), { status: 200 });
}
