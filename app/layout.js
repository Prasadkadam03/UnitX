import './globals.css';
import Header from '../components/ui/Header';

export const metadata = {
  title: 'UnitX Converter',
  description: 'A modern unit converter with history tracking',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <Header />
        {children}
      </body>
    </html>
  );
}
