import React from 'react';

export function Input({ id, type = 'text', placeholder, ...props }) {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      className="mt-1 block w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-red-400 focus:ring-opacity-20 outline-none"
      {...props}
    />
  );
}
