"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  function validate() {
    const errs = {};
    if (!form.email) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      errs.email = "Invalid email format";
    if (!form.password) errs.password = "Password is required";
    return errs;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const res = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    if (res.ok) router.push("/converter");
    else alert("Login failed");
  }

  return (
    <div
      className="max-w-md mx-auto max-sm:mx-2 mt-10 shadow p-6 rounded transition-colors duration-300"
      style={{ backgroundColor: "var(--bg2)", color: "var(--fg)" }}
    >
      <h2
        className="text-xl font-bold mb-4"
        style={{ color: "var(--fg)" }}
      >
        Login
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
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
          Login
        </button>
      </form>
    </div>
  );
}
