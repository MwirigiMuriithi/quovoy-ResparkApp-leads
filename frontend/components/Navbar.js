import Link from 'next/link';

export default function Navbar() {
  return (
    <nav style={{ padding: '1rem', backgroundColor: '#eee', marginBottom: '2rem' }}>
      <Link href="/" style={{ marginRight: '1rem' }}>Home</Link>
      <Link href="/create-lead">Create Lead</Link>
    </nav>
  );
}
