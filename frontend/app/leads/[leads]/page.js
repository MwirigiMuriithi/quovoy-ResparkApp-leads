"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function LeadDetail() {
  const params = useParams();
  const leadId = params.leads;
  const [lead, setLead] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", status: "" });
  const [loading, setLoading] = useState(false);
  const [statusUpdating, setStatusUpdating] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!leadId) return;
    const fetchLead = async () => {
      try {
        const res = await fetch(`http://localhost:5000/leads/${leadId}`);
        if (!res.ok) throw new Error("Lead not found");
        const data = await res.json();
        setLead(data);
        setFormData({
          name: data.name,
          email: data.email,
          status: data.status,
        });
      } catch (error) {
        setError(error.message);
      }
    };

    fetchLead();
  }, [leadId]);

  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError("");
        setSuccess("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setStatusUpdating(true);
    try {
      const res = await fetch(`http://localhost:5000/leads/${leadId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...lead, status: newStatus }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to update status");
      }

      setLead((prev) => ({ ...prev, status: newStatus }));
      setSuccess("Status updated successfully!");
    } catch (error) {
      setError(error.message);
    } finally {
      setStatusUpdating(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch(`http://localhost:5000/leads/${leadId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to update lead");
      } else {
        const updatedLead = await res.json();
        setLead(updatedLead);
        setEditing(false);
        setSuccess("Lead updated successfully!");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-50 px-4 w-full">
      <div className="w-full p-8 bg-white rounded-lg shadow-md">
        {error && <p className="text-red-600 text-center">{error}</p>}
        {success && <p className="text-green-600 text-center">{success}</p>}
        {lead ? (
          <>
            <h1 className="text-3xl font-bold mb-6 text-center">
              Lead Details
            </h1>
            {editing ? (
              <form onSubmit={handleUpdate} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-lg font-medium text-gray-700"
                  >
                    Name:
                  </label>
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
                  <label
                    htmlFor="email"
                    className="block text-lg font-medium text-gray-700"
                  >
                    Email:
                  </label>
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
                  <label
                    htmlFor="status"
                    className="block text-lg font-medium text-gray-700"
                  >
                    Status:
                  </label>
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

                <div className="flex justify-between">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                    disabled={loading}
                  >
                    {loading ? "Updating..." : "Save Changes"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditing(false)}
                    className="px-6 py-3 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div>
                <div className="space-y-4">
                  <p>
                    <strong className="text-lg">Name:</strong> {lead.name}
                  </p>
                  <p>
                    <strong className="text-lg">Email:</strong> {lead.email}
                  </p>
                  <div>
                    <strong className="text-lg">Status:</strong>
                    <select
                      value={lead.status}
                      onChange={handleStatusChange}
                      className="ml-3 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={statusUpdating}
                    >
                      <option value="New">New</option>
                      <option value="Engaged">Engaged</option>
                      <option value="Proposal Sent">Proposal Sent</option>
                      <option value="Closed-Won">Closed-Won</option>
                      <option value="Closed-Lost">Closed-Lost</option>
                    </select>
                  </div>
                  <p>
                    <strong className="text-lg">Created At:</strong>{" "}
                    {new Date(lead.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="mt-6">
                  <button
                    onClick={() => setEditing(true)}
                    className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                  >
                    Edit
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <p className="text-center">Loading lead...</p>
        )}
      </div>
    </div>
  );
}
