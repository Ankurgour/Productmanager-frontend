import React from 'react';

export function Avatar({ className, children }) {
  return <div className={`rounded-full overflow-hidden ${className}`}>{children}</div>;
}

export function AvatarImage({ src }) {
  return <img src={src} alt="Avatar" />;
}

export function AvatarFallback({ children }) {
  return <div>{children}</div>;
}
