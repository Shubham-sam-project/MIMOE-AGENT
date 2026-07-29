import React from 'react'
import {
  ArrowLeft,
  MessageSquare
} from "lucide-react";

const LeftSidebar = () => {
  return (
     <aside className="w-[280px] border-r border-[#2b2d3a] bg-[#171827] flex flex-col">
                {/* Header */}
                <div className="flex items-center gap-3 px-5 py-5 border-b border-[#2b2d3a]">
                  <ArrowLeft className="w-5 h-5 text-lime-400" />
                  <span className="font-medium">Back</span>
        
                  <div className="ml-auto flex items-center gap-2">
                    <MessageSquare size={18} />
                    <span className="font-medium">Chat</span>
                  </div>
                </div>
        
                {/* Chat Item */}
                <div className="px-2">
                  <div className="rounded-xl bg-[#add24f75] text-[#cdf36e] p-6 cursor-pointer">
                    <h3 className="font-semibold">New Chat</h3>
                  </div>
                </div>
              </aside>
  )
}

export default LeftSidebar