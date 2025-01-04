# Smart Contract AI Assistant

AI-powered tool that helps developers create secure and optimised smart contracts using natural language descriptions. Built with React, TypeScript, and OpenAI's GPT-4.

## Features

- 🤖 Natural language to Solidity code generation
- 🔒 Built-in security considerations and best practices
- ⚡ Gas optimization suggestions
- 💬 Interactive conversation interface
- 📋 One-click code copying
- 🚦 Rate limiting for API protection
- 📝 Markdown support for code blocks and explanations

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm 7.x or higher
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/jennievon/smart-contract-ai-assistant.git
cd smart-contract-ai-assistant
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your OpenAI API key:
```bash
VITE_OPENAI_API_KEY=your-api-key-here
```

4. Start the development server:
```bash
npm run dev
```

## Usage

1. Enter your smart contract requirements in natural language
2. The AI will generate Solidity code based on your description
3. Review the generated code, security considerations, and best practices
4. Ask follow-up questions or request modifications
5. Copy the final code to your clipboard with one click

## Project Structure

```
src/
├── components/          # React components
│   ├── ContractInput/  # User input handling
│   └── ContractOutput/ # Conversation display
├── config/             # Configuration files
├── types/              # TypeScript type definitions
└── utils/              # Utility functions and services
```

## Key Components

- **OpenAIService**: Handles communication with the OpenAI API
- **RateLimiter**: Prevents API abuse through request rate limiting
- **ContractInput**: User interface for entering requirements
- **ContractOutput**: Displays the conversation and generated code

## Security Features

- API key validation
- Rate limiting implementation
- Input validation
- Error handling
- Secure environment variable usage

## Best Practices

- TypeScript for type safety
- Component-based architecture
- Clean code principles
- Error boundary implementation
- Responsive design

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Support

For support, please open an issue in the GitHub repository or contact me :)
