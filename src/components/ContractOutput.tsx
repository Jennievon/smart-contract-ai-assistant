import ReactMarkdown from "react-markdown";
import { Message } from "../types";
import { Copy } from "lucide-react";

interface ContractOutputProps {
  messages: Message[];
}

export const ContractOutput = ({ messages }: ContractOutputProps) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-4 w-full">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`p-4 rounded-lg ${
            message.role === "assistant" ? "bg-gray-100" : "bg-blue-50"
          }`}
        >
          <div className="flex justify-between items-start mb-2">
            <span className="font-semibold">
              {message.role === "assistant" ? "AI Assistant" : "You"}
            </span>
            {message.role === "assistant" && (
              <button
                onClick={() => copyToClipboard(message.content)}
                className="text-gray-500 hover:text-gray-700"
                title="Copy to clipboard"
              >
                <Copy className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="prose max-w-none">
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
        </div>
      ))}
    </div>
  );
};
