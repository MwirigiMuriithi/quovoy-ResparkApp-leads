'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await fetch('http://localhost:5000/leads');
      const data = await res.json();
      setLeads(data);
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Leads List</h1>
      <ul className="space-y-4">
        {leads.map(lead => (
          <li key={lead._id} className="p-4 bg-white rounded-lg shadow-md hover:bg-gray-200 transition">
            <Link href={`/leads/${lead._id}`} className="text-gray-800 hover:text-blue-600">
              <strong className="block text-lg">{lead.name}</strong>
              <p className="text-sm text-gray-600">{lead.email}</p>
              <p className="text-sm text-gray-600">{lead.status}</p>
              <p className="text-xs text-gray-500">{new Date(lead.createdAt).toLocaleString()}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
