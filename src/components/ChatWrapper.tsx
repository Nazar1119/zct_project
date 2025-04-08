"use client"

import { useChat } from "@ai-sdk/react"
import { Message } from "./Message"
import { Messages } from "./Messages"

export const ChatWrapper = ({sessionId}: {sessionId: string}) => {
    const { messages, handleInputChange, handleSubmit, input } = useChat({
        api: "/api/chat-stream",
        body: { sessionId }, 
    })

    return(
        <div className="relative min-h-full bg-zing-900 flex divide-y divide-zinc-700 flex-col justify-between gap-2">
            <div className="flex-1 text-black bg-zinc-800 justify-between flex flex-col">
                <Messages messages={ messages }/>
            </div>

            <form onSubmit={handleSubmit} className="flex gap-2 p-4 bg-zinc-900">
  <input
    className="flex-1 rounded-lg px-4 py-2 bg-zinc-800 text-white border border-zinc-700 outline-none"
    value={input}
    onChange={handleInputChange}
    type="text"
    placeholder="Type a message..."
  />
  <button
    type="submit"
    className="px-4 py-2 rounded-lg bg-blue-700 text-white hover:bg-blue-600"
  >
    Send
  </button>
</form>
        </div>
    )

}