import React from 'react';

export default function LeadStatus({ status, handleStatusChange, statusOptions, statusUpdating }) {
  return (
    <div>
      <strong className="text-lg">Status:</strong>
      <select
        value={status}
        onChange={handleStatusChange}
        className="ml-3 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={statusUpdating}
      >
        {statusOptions.map(statusOption => (
          <option key={statusOption} value={statusOption}>{statusOption}</option>
        ))}
      </select>
    </div>
  );
}
