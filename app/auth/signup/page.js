"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});

  function validate() {
    const errs = {};
    if (!form.name) errs.name = "Name is required";
    if (!form.email) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Invalid email format";
    if (!form.password) errs.password = "Password is required";
    else if (form.password.length < 6) errs.password = "Password must be at least 6 characters";
    return errs;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) router.push("/auth/login");
    else {
      const data = await res.json();
      alert(data.error || "Signup failed");
    }
  }

  return (
    <div
      className="max-w-md mx-auto mt-10 max-sm:mx-2 shadow p-6 rounded transition-colors duration-300"
      style={{ backgroundColor: "var(--bg2)", color: "var(--fg)" }}
    >
      <h2 className="text-xl font-bold mb-4" style={{ color: "var(--fg)" }}>
        Sign Up
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border p-2 rounded transition-colors duration-300"
            style={{
              backgroundColor: "var(--bg)",
              color: "var(--fg)",
              borderColor: "var(--tab-bg)",
            }}
          />
          {errors.name && (
            <p className="text-sm mt-1" style={{ color: "#f87171" }}>
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border p-2 rounded transition-colors duration-300"
            style={{
              backgroundColor: "var(--bg)",
              color: "var(--fg)",
              borderColor: "var(--tab-bg)",
            }}
          />
          {errors.email && (
            <p className="text-sm mt-1" style={{ color: "#f87171" }}>
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full border p-2 rounded transition-colors duration-300"
            style={{
              backgroundColor: "var(--bg)",
              color: "var(--fg)",
              borderColor: "var(--tab-bg)",
            }}
          />
          {errors.password && (
            <p className="text-sm mt-1" style={{ color: "#f87171" }}>
              {errors.password}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 rounded transition-colors duration-300"
          style={{
            backgroundColor: "var(--tab-bg)",
            color: "var(--fg)",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "var(--tab-hover)")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "var(--tab-bg)")
          }
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
