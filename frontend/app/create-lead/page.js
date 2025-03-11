'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LeadForm from '@/components/LeadForm';
import Notification from '@/components/Notification';

export default function CreateLead() {
  const [formData, setFormData] = useState({ name: '', email: '', status: 'New' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const statusOptions = ["New", "Engaged", "Proposal Sent", "Closed-Won", "Closed-Lost"];

  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError('');
        setSuccess('');
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch('http://localhost:5000/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to add lead');
      }

      setFormData({ name: '', email: '', status: 'New' });
      setSuccess('Lead added successfully!');
      setTimeout(() => router.push('/'), 500);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold text-center mb-6">Create Lead</h1>
      <Notification message={error || success} type={error ? "error" : "success"} />
      <LeadForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        loading={loading}
        statusOptions={statusOptions}
      />
    </div>
  );
}
