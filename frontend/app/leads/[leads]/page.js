'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
export default function LeadDetail() {
  const params = useParams();
  const leadId = params.leads;
  const [lead, setLead] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', status: '' });
  const router = useRouter();

  useEffect(() => {
    if (!leadId) return;
    const fetchLead = async () => {
      try {
        const res = await fetch(`http://localhost:5000/leads/${leadId}`);
        if (!res.ok) throw new Error('Lead not found');
        const data = await res.json();
        setLead(data);
        setFormData({ name: data.name, email: data.email, status: data.status });
      } catch (error) {
        console.error("Error fetching lead:", error);
      }
    };

    fetchLead();
  }, [leadId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/leads/${leadId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (!res.ok) {
        const errorData = await res.json();
        console.error("Error updating lead:", errorData);
      } else {
        const updatedLead = await res.json();
        setLead(updatedLead);
        setEditing(false);
      }
    } catch (error) {
      console.error("Error updating lead:", error);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      {lead ? (
        <>
          <h1>Lead Details</h1>
          {editing ? (
            <form onSubmit={handleUpdate} style={{ marginBottom: '2rem' }}>
              <div>
                <label>Name:</label><br/>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div>
                <label>Email:</label><br/>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div>
                <label>Status:</label><br/>
                <select 
                  name="status" 
                  value={formData.status} 
                  onChange={handleChange}
                >
                  <option value="New">New</option>
                  <option value="Engaged">Engaged</option>
                  <option value="Proposal Sent">Proposal Sent</option>
                  <option value="Closed-Won">Closed-Won</option>
                  <option value="Closed-Lost">Closed-Lost</option>
                </select>
              </div>
              <button type="submit">Save Changes</button>
              <button type="button" onClick={() => setEditing(false)} style={{ marginLeft: '1rem' }}>
                Cancel
              </button>
            </form>
          ) : (
            <div>
              <p><strong>Name:</strong> {lead.name}</p>
              <p><strong>Email:</strong> {lead.email}</p>
              <p><strong>Status:</strong> {lead.status}</p>
              <p><strong>Created At:</strong> {new Date(lead.createdAt).toLocaleString()}</p>
              <button onClick={() => setEditing(true)}>Edit</button>
            </div>
          )}
        </>
      ) : (
        <p>Loading lead...</p>
      )}
    </div>
  );
}
