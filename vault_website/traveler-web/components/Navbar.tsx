import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-10 py-6 bg-white border-b border-gray-100 shadow-sm">
      {/* Logo */}
      <div className="text-2xl font-bold tracking-tighter text-blue-600">
        TRAVELER.
      </div>
      
      {/* Navigation Links */}
      <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-600">
        <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
        <Link href="#" className="hover:text-blue-600 transition-colors">Hidden Places</Link>
        <Link href="#" className="hover:text-blue-600 transition-colors">Food</Link>
        <Link href="#" className="hover:text-blue-600 transition-colors">Weather</Link>
      </div>

      {/* A simple 'Get Started' button to make it look standard */}
      <button className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition">
        Explore
      </button>
    </nav>
  );
}