"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.setAttribute("data-theme", storedTheme);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initialTheme = prefersDark ? "dark" : "light";
      setTheme(initialTheme);
      document.documentElement.setAttribute("data-theme", initialTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const tabs = [
    {
      href: "/",
      label: "Home",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l9-9 9 9M4 10v10h5v-6h6v6h5V10" />
        </svg>
      ),
    },
    {
      href: "/converter",
      label: "Converter",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4h16v4H4zM4 12h16v4H4zM4 20h16v-4H4z" />
        </svg>
      ),
    },
    {
      href: "/history",
      label: "History",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <header className="p-4 shadow-lg rounded-xl max-sm:mx-2 mx-7 mt-5 transition-colors duration-300 bg-[var(--bg2)] text-[var(--fg)]">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <h1 className="text-4xl font-bold font-mono">UnitX</h1>

        <div className="flex items-center gap-4">
          <nav>
            <ul className="flex gap-4">
              {tabs.map((tab) =>
                pathname === tab.href ? null : (
                  <li key={tab.href}>
                    <Link
                      href={tab.href}
                      className="flex items-center gap-1 px-2 py-1 rounded-lg tab hover:underline"
                    >
                      {tab.icon}
                      <span className="hidden sm:inline">{tab.label}</span>
                    </Link>
                  </li>
                )
              )}
            </ul>
          </nav>

          {/* Theme toggle button */}
          <button
            onClick={toggleTheme}
            className="px-3 py-1 rounded transition-colors bg-[var(--tab-bg)] text-[var(--fg)] hover:bg-[var(--tab-hover)] flex items-center justify-center gap-2"
          >
            {/* Icon for both mobile and desktop */}
            {theme === "dark" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                {/* Sun icon */}
                <circle cx="12" cy="12" r="5" />
                <path
                  d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                {/* Moon icon */}
                <path d="M21 12.79A9 9 0 1111.21 3a7.5 7.5 0 109.79 9.79z" />
              </svg>
            )}

            {/* Desktop text */}
            <span className="hidden sm:inline">
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
