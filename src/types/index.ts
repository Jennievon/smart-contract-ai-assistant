export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface Conversation {
  messages: Message[];
}

export interface ContractRequest {
  description: string;
  conversation: Conversation;
}

export interface ApiError {
  message: string;
  code: string;
}