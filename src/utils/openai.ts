import { OpenAI } from "openai";
import { Message } from "../types";
import { RATE_LIMIT_REQUESTS, RATE_LIMIT_WINDOW } from "../config/constants";
import { z } from "zod";

const messageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(4000),
});

const messagesArraySchema = z.array(messageSchema);

class RateLimiter {
  private requests: number[] = [];
  private windowMs: number;
  private maxRequests: number;

  constructor(windowMs: number, maxRequests: number) {
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;
  }

  // Check if a request can be made by comparing the number of requests in the window to the max requests
  // If the number of requests exceeds the max requests, return false
  canMakeRequest(): boolean {
    const now = Date.now();
    this.requests = this.requests.filter((time) => now - time < this.windowMs);
    return this.requests.length < this.maxRequests;
  }

  addRequest(): void {
    this.requests.push(Date.now());
  }
}

const rateLimiter = new RateLimiter(RATE_LIMIT_WINDOW, RATE_LIMIT_REQUESTS);

export class OpenAIService {
  private client: OpenAI;

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error("OpenAI API key is required");
    }
    this.client = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });
  }

  async generateSmartContract(messages: Message[]): Promise<string> {
    // Validate input
    try {
      messagesArraySchema.parse(messages);
    } catch (error) {
      throw new Error("Invalid message format");
    }

    if (!rateLimiter.canMakeRequest()) {
      throw new Error("Rate limit exceeded. Please try again later.");
    }

    try {
      rateLimiter.addRequest();

      const response = await this.client.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are an expert Solidity developer specializing in smart contract development. 
            Your task is to:
            1. Generate secure, gas-optimized smart contracts
            2. Explain potential security vulnerabilities
            3. Provide best practices and optimization tips
            4. Format your response in markdown with proper code blocks
            5. Include comments in the code explaining key components`,
          },
          ...messages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        ],
        temperature: 0.7,
        max_tokens: 2000,
      });

      const content = response.choices[0].message.content;
      if (!content) {
        throw new Error("Empty response from OpenAI API");
      }

      return content;
    } catch (error) {
      if (error instanceof Error) {
        console.error("OpenAI API Error:", error.message);
        if (error.message.includes("401")) {
          throw new Error("Invalid API key. Please check your OpenAI API key.");
        }
        if (error.message.includes("429")) {
          throw new Error(
            "OpenAI API rate limit exceeded. Please try again later."
          );
        }
      }
      throw new Error("Failed to generate smart contract. Please try again.");
    }
  }
}
