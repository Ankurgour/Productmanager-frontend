import React from "react"
export default function Loader() {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full border-4 border-primary border-t-transparent h-16 w-16 " />
      </div>
    )
  }