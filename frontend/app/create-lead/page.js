'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateLead() {
  const [formData, setFormData] = useState({ name: '', email: '', status: 'New' });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (!res.ok) {
        const errorData = await res.json();
        console.error("Error adding lead:", errorData);
      } else {
        setFormData({ name: '', email: '', status: 'New' });
        router.push('/'); 
      }
    } catch (error) {
      console.error("Error adding lead:", error);
    }
    setLoading(false);
  };

  return (
    <div className="p-8 w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold text-center mb-6">Create Lead</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-lg font-medium text-gray-700">Name:</label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email:</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="status" className="block text-lg font-medium text-gray-700">Status:</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="New">New</option>
            <option value="Engaged">Engaged</option>
            <option value="Proposal Sent">Proposal Sent</option>
            <option value="Closed-Won">Closed-Won</option>
            <option value="Closed-Lost">Closed-Lost</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 mt-4 text-white font-semibold rounded-md transition-all duration-300 ${
            loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? "Adding Lead..." : "Add Lead"}
        </button>
      </form>
    </div>
  );
}
