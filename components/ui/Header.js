export default function Header() {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">UnitX Converter</h1>
        <nav>
          <ul className="flex gap-4">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/converter" className="hover:underline">Converter</a></li>
            <li><a href="/history" className="hover:underline">History</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
