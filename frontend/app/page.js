'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    setError('');
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/leads');
      if (!res.ok) throw new Error('Failed to fetch leads');
      const data = await res.json();
      setLeads(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Leads List</h1>

      {loading && <p className="text-gray-500 text-center">Loading leads...</p>}
      {error && <p className="text-red-600 text-center">{error}</p>}

      {!loading && !error && (
        <ul className="space-y-4">
          {leads.length > 0 ? (
            leads.map((lead) => (
              <li key={lead._id} className="p-4 bg-white rounded-lg shadow-md hover:bg-gray-200 transition">
                <Link href={`/leads/${lead._id}`} className="text-gray-800 hover:text-blue-600">
                  <strong className="block text-lg">{lead.name}</strong>
                  <p className="text-sm text-gray-600">{lead.email}</p>
                  <p className="text-sm text-gray-600">{lead.status}</p>
                  <p className="text-xs text-gray-500">{new Date(lead.createdAt).toLocaleString()}</p>
                </Link>
              </li>
            ))
          ) : (
            <p className="text-gray-500 text-center">No leads found.</p>
          )}
        </ul>
      )}
    </div>
  );
}
