import React from 'react'

export default function Loader() {
  return (
    <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-white z-[9999]">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#2064DB]"></div>
    </div>
  )
}
