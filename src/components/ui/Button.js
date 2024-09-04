import React from 'react';

export function Button({ type, children, className = '', ...props }) {
  return (
    <button
      type={type}
      className={`w-full py-2 px-4 rounded-md hover:border-red-500 focus:outline-none ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
