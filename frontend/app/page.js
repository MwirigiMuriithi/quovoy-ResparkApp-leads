'use client';

import { useState, useEffect } from 'react';
import LeadList from '@/components/LeadList';
import LoadingSpinner from '@/components/LoadingSpinner';
import Notification from '@/components/Notification';

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

      {loading && <LoadingSpinner />}
      {error && <Notification message={error} type="error" />}
      {!loading && !error && <LeadList leads={leads} />}
    </div>
  );
}
