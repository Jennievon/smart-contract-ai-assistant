import { useState } from "react";
import { ContractInput } from "./components/ContractInput";
import { ContractOutput } from "./components/ContractOutput";
import { Message } from "./types";
import { OpenAIService } from "./utils/openai";

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // initialising OpenAI service with the API key
  const openAIService = new OpenAIService(import.meta.env.VITE_OPENAI_API_KEY);

  const handleSubmit = async (input: string) => {
    try {
      setIsLoading(true);

      // message from the user
      const userMessage: Message = { role: "user", content: input };
      // adding the user message to the messages array
      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);

      // generating the smart contract using the OpenAI service with updated msgs
      const generatedSmartContract = await openAIService.generateSmartContract(
        updatedMessages
      );

      // msg from the AI asst with the generated smart contract
      const aiMessage: Message = {
        role: "assistant",
        content: generatedSmartContract,
      };
      setMessages([...updatedMessages, aiMessage]);
    } catch (error) {
      console.error("Error:", error);

      // error message if there is an error generating the smart contract
      const errorMessage: Message = {
        role: "assistant",
        content:
          "Sorry, there was an error generating the smart contract. Please try again.",
      };
      setMessages([...messages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

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
