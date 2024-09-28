# Sift

Sift is a powerful document search and summarization tool that leverages AI to help users quickly find and understand relevant information across multiple documents.

## Table of Contents
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features
- Search through documents stored in Google Drive
- AI-powered summarization of search results
- User-friendly web interface

## Prerequisites
- Node.js (v14 or later)
- npm (v6 or later)
- Google Cloud Platform account with Drive API enabled https://console.cloud.google.com/welcome?supportedpurview=project
- Anthropic API key for Claude AI https://console.anthropic.com/login?returnTo=/?

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/danielortiz0220/sift.git
   cd sift
   ```

2. Install dependencies for both frontend and backend:
   ```
   npm install --save-dev @types/qs
   cd frontend/src
   npm install
   cd ../backend/src
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the `backend/src` directory with the following content:
   ```
   ANTHROPIC_API_KEY=your_anthropic_api_key
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GOOGLE_REDIRECT_URL=http://localhost:3000/oauth2callback
   PORT=8080
   ```
   Replace the placeholder values with your actual API keys and credentials.

## Usage

1. Start the backend server:
   ```
   cd backend/src
   npx ts-node api/api.ts
   ```

2. In a new terminal, start the frontend development server:
   ```
   cd frontend/src
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000` to use the application.

## Project Structure

- `frontend/`: React-based user interface
  - `src/app/`: Main application components
  - `src/components/`: Reusable UI components
- `backend/`: Express.js server
  - `src/api/`: API routes and handlers
  - `src/ai/`: AI-related functionality (Claude integration)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
