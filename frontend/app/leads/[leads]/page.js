'use client';

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import LeadForm from "@/components/LeadForm";
import LeadStatus from "@/components/LeadStatus";
import Notification from "@/components/Notification";
import LoadingSpinner from "@/components/LoadingSpinner";

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

  const statusOptions = ["New", "Engaged", "Proposal Sent", "Closed-Won", "Closed-Lost"];

  useEffect(() => {
    if (error) {
      const errorTimeout = setTimeout(() => setError(""), 2000);
      return () => clearTimeout(errorTimeout);
    }
    if (success) {
      const successTimeout = setTimeout(() => setSuccess(""), 2000);
      return () => clearTimeout(successTimeout);
    }
  }, [error, success]);

  useEffect(() => {
    if (!leadId) return;
    const fetchLead = async () => {
      try {
        const res = await fetch(`http://localhost:5000/leads/${leadId}`);
        if (!res.ok) throw new Error("Lead not found");
        const data = await res.json();
        setLead(data);
        setFormData({ name: data.name, email: data.email, status: data.status });
      } catch (error) {
        setError(error.message);
      }
    };

    fetchLead();
  }, [leadId]);

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
        <Notification message={error || success} type={error ? "error" : "success"} />
        
        {lead ? (
          <>
            <h1 className="text-3xl font-bold mb-6 text-center">Lead Details</h1>
            {editing ? (
              <LeadForm
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleUpdate}
                loading={loading}
                statusOptions={statusOptions}
              />
            ) : (
              <>
                <div className="space-y-4">
                  <p><strong className="text-lg">Name:</strong> {lead.name}</p>
                  <p><strong className="text-lg">Email:</strong> {lead.email}</p>
                  <LeadStatus
                    status={lead.status}
                    handleStatusChange={handleStatusChange}
                    statusOptions={statusOptions}
                    statusUpdating={statusUpdating}
                  />
                  <p><strong className="text-lg">Created At:</strong> {new Date(lead.createdAt).toLocaleString()}</p>
                </div>
                <div className="mt-6">
                  <button
                    onClick={() => setEditing(true)}
                    className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                  >
                    Edit
                  </button>
                </div>
              </>
            )}
          </>
        ) : (
          <LoadingSpinner />
        )}
      </div>
    </div>
  );
}
