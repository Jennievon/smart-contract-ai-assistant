import React, { useState } from "react";
import { ContractInput } from "./components/ContractInput";
import { ContractOutput } from "./components/ContractOutput";
import { Message } from "./types";

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (input: string) => {};

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Smart Contract AI Assistant
            </h1>
            <p className="text-gray-600">
              Describe your smart contract requirements and I'll help you
              generate secure, optimized Solidity code with best practices.
            </p>
          </div>

          <div className="space-y-6">
            <ContractOutput messages={messages} />
            <ContractInput onSubmit={handleSubmit} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
