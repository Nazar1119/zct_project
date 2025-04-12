"use client"

import { Messages } from "./Messages"
import { useState } from "react";
import { Message as TMessage } from "ai/react";


export const ChatWrapper = ({ sessionId }: { sessionId: string }) => {
  const [messages, setMessages] = useState<TMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: TMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
    const response = await fetch("/api/chat-stream", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: [userMessage], sessionId }),
    });

    console.log("Response Status:", response.status);
    console.log("Response Headers:", response.headers);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const text = await response.text();
    console.log("Raw Response Body:", text);

    const data = JSON.parse(text);
    console.log("Manual API Response:", data);

    const botMessage: TMessage = {
      id: Date.now().toString(),
      role: "assistant",
      content: data.content || data.message?.content || data.messages?.[0]?.content || "Error: No content in response",
    };

    setMessages((prev) => [...prev, botMessage]);
  } catch (error) {
    console.error("Manual Fetch Error:", error);
    const errorMessage: TMessage = {
      id: Date.now().toString(),
      role: "assistant",
      content: "Sorry, something went wrong.",
    };
    setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-zinc-900 flex flex-col">
      <div className="flex-1 bg-zinc-800 flex flex-col">
        {messages.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
            <img
              src="/logo.png"
              alt="Chat GYM Logo"
              className="h-70 w-70 mb-10 rounded-full object cover" // Large logo, centered
            />
            <h2 className="text-3xl font-bold text-white mb-4">Welcome to Chat GYM</h2>
            <p className="text-gray-400 max-w-md">
               I'm waiting for you questions. Let me make your training better! In health body - is health soul!
            </p>
          </div>
        ) : (
          <>
         <header className="w-full p-4 bg-zinc-800 border-b border-zinc-700 flex items-center justify-center gap-3">
            <img
              src="/bot_avatar.png"
              alt="Bot Avatar"
              className="h-20 w-20 rounded-full object-cover animate-fade-in-scale"
            />
            <h1 className="text-lg font-semibold text-white">Chat GYM</h1>
          </header>
            <Messages messages={messages} />
            {isLoading && (
              <div className="p-4 text-gray-400 italic">
                Bot GYM is typing...
              </div>
            )}
          </>
        )}
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2 p-4 bg-zinc-900 border-t border-zinc-700">
        <input
          className="flex-1 rounded-lg px-4 py-2 bg-zinc-800 text-white border border-zinc-700 outline-none shadow-md focus:ring-2 focus:ring-blue-500"
          value={input}
          onChange={handleInputChange}
          type="text"
          placeholder="Ask me anything..."
        />
        <button
          type="submit"
          className="p-2 rounded-full bg-blue-700 text-white hover:bg-blue-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </button>
      </form>
    </div>
  );
};