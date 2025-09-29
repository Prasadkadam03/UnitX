export default function Header() {
  return (
    <header className="bg-gray-900 text-white p-4 shadow-md rounded-xl mx-7 mt-5">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold font-mono">UnitX</h1>
        <nav>
          <ul className="flex gap-4">
            <li>
              <a href="/" className="hover:underline flex items-center gap-1 px-2 py-1 rounded-md bg-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l9-9 9 9M4 10v10h5v-6h6v6h5V10" />
                </svg>
                Home
              </a>
            </li>
            <li>
              <a href="/history" className="hover:underline flex items-center gap-1 px-2 py-1 rounded-md bg-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                History
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
