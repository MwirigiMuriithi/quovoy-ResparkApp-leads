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
    <div style={{ padding: '2rem' }}>
      <h1>Leads List</h1>
      <ul>
        {leads.map(lead => (
          <li key={lead._id} style={{ marginBottom: '1rem' }}>
            <Link href={`/leads/${lead._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <strong>{lead.name}</strong> - {lead.email} - {lead.status} - {new Date(lead.createdAt).toLocaleString()}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
