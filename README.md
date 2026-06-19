# CodeSense AI

CodeSense AI is a full-stack AI code review platform:

- TanStack Start frontend
- Express API with JWT authentication
- MongoDB Atlas review history
- Google Gemini 2.5 Flash code analysis

## Configure

Create a frontend `.env` in the project root:

```env
VITE_API_URL=http://localhost:5000/api
```

Create `codesense-backend/.env`:

```env
PORT=5000
GEMINI_API_KEY=your_google_gemini_api_key
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=use_a_long_random_secret
```

In MongoDB Atlas, make sure your current IP address is allowed under **Network Access** and the database user in `MONGODB_URI` has read/write access.

## Install And Run

Install both applications:

```bash
npm install
npm --prefix codesense-backend install
```

Run the backend in one terminal:

```bash
npm run dev:backend
```

Run the frontend in another terminal:

```bash
npm run dev:frontend
```

Open the frontend URL shown by Vite, create an account, and submit code from the review screen.

## Verify Connections

With the backend running, open:

```text
http://localhost:5000/api/health
```

A working API and database return:

```json
{
  "api": "ok",
  "database": "connected"
}
```
