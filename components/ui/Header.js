"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

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
    <header className="bg-gray-900 text-white p-4 shadow-lg rounded-md max-sm:mx-2 mx-7  mt-5">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <h1 className="text-4xl font-bold font-mono text-gray-50">UnitX</h1>

        <nav>
          <ul className="flex gap-4">
            {tabs.map((tab) =>
              pathname === tab.href ? null : (
                <li key={tab.href}>
                  <Link
                    href={tab.href}
                    className="hover:underline flex items-center gap-1 px-2 py-1 rounded-md bg-gray-800"
                  >
                    {tab.icon}
                    <span className="hidden sm:inline">{tab.label}</span>
                  </Link>
                </li>
              )
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
