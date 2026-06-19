# CodeSense AI Backend

Express and MongoDB backend for CodeSense AI, with JWT authentication and AI-powered code reviews using Gemini 2.5 Flash.

## Requirements

- Node.js 18 or newer
- A MongoDB Atlas connection string
- A Google Gemini API key

## Setup

1. Open a terminal in the backend directory:

   ```bash
   cd codesense-backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Copy `.env.example` to `.env` and fill in each value:

   ```env
   PORT=5000
   GEMINI_API_KEY=your_key
   MONGODB_URI=your_mongo_uri
   JWT_SECRET=your_secret
   ```

4. Start the API:

   ```bash
   npm run dev
   ```

   For production, use `npm start`.

## API

All request and response bodies use JSON. Protected routes require:

```http
Authorization: Bearer <JWT_TOKEN>
```

| Method | Route | Authentication | Body |
| --- | --- | --- | --- |
| `POST` | `/api/auth/signup` | No | `{ "name", "email", "password" }` |
| `POST` | `/api/auth/login` | No | `{ "email", "password" }` |
| `GET` | `/api/health` | No | None |
| `POST` | `/api/review/analyze` | Yes | `{ "code", "language" }` |
| `GET` | `/api/review/history` | Yes | None |
| `GET` | `/api/review/history/:id` | Yes | None |
| `DELETE` | `/api/review/history/:id` | Yes | None |

## Useful Commands

```bash
npm run check
npm start
npm run dev
```
