require("dotenv").config();

const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth");
const reviewRoutes = require("./routes/review");

const app = express();
const port = process.env.PORT || 5000;
let databaseConnection;

app.use(cors());
app.use(express.json({ limit: "2mb" }));

app.get("/", (req, res) => {
  res.json({ message: "CodeSense AI API is running" });
});

async function connectDatabase() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not configured");
  }

  if (!databaseConnection) {
    databaseConnection = mongoose.connect(process.env.MONGODB_URI).catch((error) => {
      databaseConnection = undefined;
      throw error;
    });
  }

  return databaseConnection;
}

app.use(async (req, res, next) => {
  try {
    await connectDatabase();
    next();
  } catch (error) {
    console.error("Database connection failed:", error.message);
    res.status(503).json({ message: "Database connection is unavailable" });
  }
});

app.get("/api/health", (req, res) => {
  const databaseConnected = mongoose.connection.readyState === 1;

  res.status(databaseConnected ? 200 : 503).json({
    api: "ok",
    database: databaseConnected ? "connected" : "disconnected",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/review", reviewRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err);

  if (err.type === "entity.too.large") {
    return res.status(413).json({ message: "Request body is too large" });
  }

  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ message: "Request body contains invalid JSON" });
  }

  return res.status(500).json({ message: "Internal server error" });
});

async function startServer() {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured");
  }

  await connectDatabase();
  console.log("Connected to MongoDB");

  app.listen(port, () => {
    console.log(`CodeSense AI API listening on port ${port}`);
  });
}

if (require.main === module) {
  startServer().catch((error) => {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  });
}

module.exports = app;
