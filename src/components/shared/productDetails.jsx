import React from 'react';

export function Card({ children, className }) {
  return <div className={`bg-white shadow-md rounded-lg ${className}`}>{children}</div>;
}

export function CardHeader({ children }) {
  return <div className="p-4 border-b border-gray-200">{children}</div>;
}

export function CardTitle({ children }) {
  return <h2 className="text-xl font-semibold">{children}</h2>;
}

export function CardContent({ children }) {
  return <div className="p-4">{children}</div>;
}

export function CardFooter({ children }) {
  return <div className="p-4 border-t border-gray-200">{children}</div>;
}
