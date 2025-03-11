import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="p-4 bg-gray-200 mb-8">
      <div className="flex space-x-4">
        <Link href="/" className="text-blue-500 hover:text-blue-700">Home</Link>
        <Link href="/create-lead" className="text-blue-500 hover:text-blue-700">Create Lead</Link>
      </div>
    </nav>
  );
}
