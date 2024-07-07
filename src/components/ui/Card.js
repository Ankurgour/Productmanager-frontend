import React from 'react';

export function Card({ className, children }) {
  return <div className={`shadow-md rounded-lg ${className}`}>{children}</div>;
}
