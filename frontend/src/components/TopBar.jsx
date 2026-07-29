import React from 'react'
import {
  Activity,
  SlidersHorizontal,
} from "lucide-react";

const TopBar = () => {
  return (
    <div className="h-16 border-b border-[#2b2d3a] flex items-center justify-between px-7 p-6">
        <h2 className="text-xl font-semibold ">New Chat</h2>
        <div className="flex gap-5 text-gray-400">
        <Activity className="cursor-pointer hover:text-white" />
        <SlidersHorizontal className="cursor-pointer hover:text-white" />
        </div>
    </div>
  )
}

export default TopBar