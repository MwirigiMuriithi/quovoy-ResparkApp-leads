import Link from 'next/link';

export default function LeadItem({ lead }) {
  return (
    <li className="p-4 bg-white rounded-lg shadow-md hover:bg-gray-200 transition">
      <Link href={`/leads/${lead._id}`} className="text-gray-800 hover:text-blue-600">
        <strong className="block text-lg">{lead.name}</strong>
        <p className="text-sm text-gray-600">{lead.email}</p>
        <p className="text-sm text-gray-600">{lead.status}</p>
        <p className="text-xs text-gray-500">{new Date(lead.createdAt).toLocaleString()}</p>
      </Link>
    </li>
  );
}
