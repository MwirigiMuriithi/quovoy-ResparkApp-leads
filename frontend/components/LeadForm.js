import React from 'react';

export default function LeadForm({ formData, handleChange, handleSubmit, loading, error, success, statusOptions }) {
  return (
    <div className="space-y-6">
      {error && <p className="text-red-600 text-center">{error}</p>}
      {success && <p className="text-green-600 text-center">{success}</p>}
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
            {statusOptions.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 mt-4 text-white font-semibold rounded-md transition-all duration-300 ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {loading ? "Processing..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
