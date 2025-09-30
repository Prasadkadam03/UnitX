import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-2 bg-t text-center ">
      <h1 className="text-3xl font-bold mb-4">Welcome to <span className="text-gray-400">UnitX</span> Converter</h1>
      <p className="text-gray-600 mb-6">
        Convert units easily and track your history.
      </p>

      {!session ? (
        <div className="flex gap-4">
          <Link
            href="/auth/signup"
            className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
          >
            Sign Up
          </Link>
          <Link
            href="/auth/login"
            className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
          >
            Login
          </Link>
        </div>
      ) : (
        <Link
          href="/converter"
          className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
        >
          Go to Converter
        </Link>
      )}
    </div>
  );
}
