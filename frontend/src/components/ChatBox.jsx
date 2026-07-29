import { useState, useCallback } from "react";
import Message from "./Message";
import Loader from "./Loader";
import useChat from "../hooks/useChat";
import {
  MessageSquare,
  Activity,
  SlidersHorizontal,
  Send,
} from "lucide-react";
import LeftSidebar from "./LeftSidebar";
import TopBar from "./TopBar";

const ChatBox = () => {
  const [input, setInput] = useState("");
  const { messages, loading, sendPrompt } = useChat();

  const submitHandler = useCallback(() => {
    if (!input.trim()) return;

    sendPrompt(input);
    setInput("");
  }, [input]);

  return (
    <>
    {/* <div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask something..."
      />

      <button onClick={submitHandler}>Send</button>

      {loading && <Loader />}

      {messages.map((message, index) => (
        <Message
          key={index}
          user={message.user}
          assistant={message.assistant}
        />
      ))}
    </div> */}

    <div className="h-screen bg-[#0f1020] text-white flex overflow-hidden text-gray-400">
          {/* Sidebar */}
         <LeftSidebar />
    
          {/* Main */}
          <main className="flex-1 flex flex-col">
            {/* Top Bar */}
            <TopBar />
    
            {/* Empty State */}
            <div className="flex-1 flex items-center justify-center">
              {messages?.length <= 0 ? 
              <div className="text-center text-color-gray-400">
                <MessageSquare size={60} className="mx-auto mb-6" />
    
                <h1 className="text-4xl font-semibold text-gray-700">
                  New Conversation
                </h1>
    
                <p className="mt-3 text-lg">
                  Select a model in settings to begin.
                </p>
              </div>
              :
               <div className="text-center text-gray-400">
                    {messages?.map((message, index) => (
                        <Message
                        key={index}
                        user={message.user}
                        assistant={message.assistant}
                        />
                    ))}

                    {loading && <Loader />}
                </div>
                }
            </div>
            <div className="text-center text-color-gray-400">
                {loading && <Loader />}
            </div>
            {/* Input */}
            <div className="border-t border-[#2b2d3a] p-5">
              <div className="flex items-center gap-3">
                <input
                  value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask something..."
                  className="flex-1 bg-[#18192b] border text-[#fff] border-[#2b2d3a] rounded-2xl px-5 py-4 outline-none placeholder-gray-500"
                />
    
                <button onClick={submitHandler} className="w-14 h-14 rounded-xl bg-lime-500 hover:bg-lime-400 flex items-center justify-center">
                  <Send className="text-black" size={22} />
                </button>

              </div>
            </div>
          </main>
        </div>
    </>
  );
};

export default ChatBox;
