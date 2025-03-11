import React from 'react';

export default function Notification({ message, type }) {
  if (!message) return null;
  return (
    <p className={`text-center ${type === 'error' ? 'text-red-600' : 'text-green-600'}`}>
      {message}
    </p>
  );
}
