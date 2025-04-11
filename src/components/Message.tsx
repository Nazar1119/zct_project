// src/components/Message.tsx
import { cn } from "@/lib/utils";
import { User } from "lucide-react";

interface MessageProps {
  content: string;
  isUserMessage: boolean;
  timestamp?: string;
}

export const Message = ({ content, isUserMessage, timestamp }: MessageProps) => {
  return (
    <div
      className={cn(
        "my-4 max-w-[75%] p-3 rounded-lg animate-slide-in",
        {
          "ml-auto bg-blue-600 text-white": isUserMessage,
          "mr-auto bg-zinc-700 text-white": !isUserMessage,
        }
      )}
    >
      <div className="flex items-start gap-2.5">
        <div
          className={cn(
            "size-8 shrink-0 rounded-full border border-zinc-700 bg-zinc-900 flex justify-center items-center",
            { "bg-blue-950 border-blue-700": isUserMessage }
          )}
        >
          {isUserMessage ? (
            <User className="size-4" />
          ) : (
            <img
              src="/bot_avatar.png"
              alt="GYM Bot Logo"
              className="size-6 rounded-full object-cover"
            />
          )}
        </div>
        <div className="flex flex-col w-full">
          <div className="flex justify-between">
            <span className="text-xs font-semibold text-gray-300">
              {isUserMessage ? "You" : "GYM Bot"}
            </span>
            {timestamp && (
              <span className="text-xs text-gray-400">{timestamp}</span>
            )}
          </div>
          <p className="text-sm font-normal">{content}</p>
        </div>
      </div>
    </div>
  );
};