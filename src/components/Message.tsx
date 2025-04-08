import { cn } from "@/lib/utils"
import { User } from "lucide-react"
import { Bot } from "lucide-react"


interface MessageProps {
    content: string;
    isUserMessage: boolean;
    timestamp?: string; // Add timestamp prop
  }
  
  export const Message = ({ content, isUserMessage, timestamp }: MessageProps) => {
    return (
      <div
        className={cn("my-4 max-w-[75%] p-3 rounded-lg", {
          "ml-auto bg-blue-600 text-white": isUserMessage,
          "mr-auto bg-zinc-700 text-white": !isUserMessage,
        })}
      >
        <div className="flex items-start gap-2.5">
          <div
            className={cn(
              "size-8 shrink-0 rounded-full border border-zinc-700 bg-zinc-900 flex justify-center items-center",
              { "bg-blue-950 border-blue-700": isUserMessage }
            )}
          >
            {isUserMessage ? <User className="size-4" /> : <Bot className="size-4 text-white" />}
          </div>
          <div className="flex flex-col w-full">
            <div className="flex justify-between">
              <span className="text-xs font-semibold text-gray-300">
                {isUserMessage ? "You" : "Bot"}
              </span>
              {timestamp && (
                <span className="text-xs text-gray-400">
                  {timestamp}
                </span>
              )}
            </div>
            <p className="text-sm font-normal">{content}</p>
          </div>
        </div>
      </div>
    );
  };