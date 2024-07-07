import React from 'react';

export function Textarea({ id, placeholder, defaultValue, className, ...props }) {
  return (
    <textarea
      id={id}
      placeholder={placeholder}
      defaultValue={defaultValue}
      className={`form-textarea w-full p-2 border border-gray-300 rounded ${className}`}
      {...props}
    />
  );
}
