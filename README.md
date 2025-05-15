# Gemini AI Interface

This project is a web application that provides an interface to interact with AI capabilities. It was created as a midterm project for CSC317.

## Features

- Express.js backend server
- RESTful API endpoint for AI text generation
- Clean, responsive frontend interface
- Token usage tracking
- Error handling

## Technologies Used

- Node.js and Express.js for the backend
- Vanilla JavaScript for frontend functionality
- Bootstrap for styling
- OpenAI API for AI capabilities

## How to Run

### Prerequisites

- Node.js installed on your machine
- OpenAI API key (or another AI service provider key)

### Setup

1. Clone this repository to your local machine
   ```
   git clone https://github.com/your-username/gemini-ai-midterm.git
   cd gemini-ai-midterm
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with your API key
   ```
   OPENAI_API_KEY=your_api_key_here
   PORT=3000
   ```

4. Start the server
   ```
   npm start
   ```

5. Open a browser and navigate to `http://localhost:3000`

## API Endpoints

### POST /api/generate

Generates an AI response based on a user prompt.

**Request body:**
```json
{
  "prompt": "Your prompt text here"
}
```

**Response:**
```json
{
  "result": "AI generated response",
  "usage": {
    "prompt_tokens": 10,
    "completion_tokens": 20,
    "total_tokens": 30
  }
}
```

## Project Structure

```
gemini-ai-midterm/
├── app.js                 # Main server file
├── gemini_api_call.js     # AI service integration
├── package.json           # Project dependencies
├── .env                   # Environment variables (not included in repo)
├── public/
│   ├── index.html         # Main HTML page
│   └── frontendScript.js  # Frontend JavaScript
└── README.md              # Project documentation
```

## Future Improvements

- Add support for different AI models
- Implement user authentication
- Add conversation history
- Support for image generation

