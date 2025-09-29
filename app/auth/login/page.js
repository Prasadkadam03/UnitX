"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false
    });
    if (res.ok) {
      router.push("/converter");
    } else {
      alert("Login failed");
    }
  }

  return (
    <div className="max-w-md mx-auto max-sm:mx-2 mt-10 bg-gray-900 shadow p-6 rounded">
      <h2 className="text-xl font-bold mb-4 text-white">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button
          type="submit"
          className="w-full bg-gray-800 cursor-pointer hover:bg-gray-950 text-white py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}
