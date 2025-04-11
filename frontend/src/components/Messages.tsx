import { type Message as TMessages } from "ai/react";
import { Message } from "./Message";

interface MessagesProps {
  messages: TMessages[];
}

export const Messages = ({ messages }: MessagesProps) => {
  console.log("Messages to Render:", messages);

  return (
    <div className="flex max-h-[calc(100vh-3.5rem-7rem)] flex-1 flex-col overflow-y-auto">
      {messages.length > 0 ? (
        messages.map((message, i) => (
          <Message
            key={i}
            content={message.content}
            isUserMessage={message.role === "user"}
            timestamp={new Date().toLocaleTimeString()}
          />
        ))
      ) : (
        <div className="text-gray-400 p-4">No messages yet</div>
      )}
    </div>
  );
};