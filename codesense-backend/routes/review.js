const express = require("express");
const mongoose = require("mongoose");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const auth = require("../middleware/auth");
const Review = require("../models/Review");

const router = express.Router();

const SYSTEM_INSTRUCTION = `You are an expert code reviewer. Return ONLY valid JSON, no markdown:
{
  score: number (0-100),
  issues: {
    syntax: [{line, message, severity}],
    logic: [{line, message, severity}],
    performance: [{line, message, severity}],
    security: [{line, message, severity}],
    bestPractices: [{line, message}]
  },
  fixedCode: string,
  summary: string
}`;

function isValidReviewResult(result) {
  const issueGroups = result?.issues;

  return (
    result &&
    typeof result.score === "number" &&
    result.score >= 0 &&
    result.score <= 100 &&
    issueGroups &&
    Array.isArray(issueGroups.syntax) &&
    Array.isArray(issueGroups.logic) &&
    Array.isArray(issueGroups.performance) &&
    Array.isArray(issueGroups.security) &&
    Array.isArray(issueGroups.bestPractices) &&
    typeof result.fixedCode === "string" &&
    typeof result.summary === "string"
  );
}

function isValidId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function geminiStatus(error) {
  const match = error?.message?.match(/\[(\d{3}) [^\]]+\]/);
  return match ? Number(match[1]) : null;
}

async function generateWithRetry(model, prompt) {
  const maxAttempts = 3;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      return await model.generateContent(prompt);
    } catch (error) {
      const status = geminiStatus(error);
      const retryable = status === 429 || status === 503;

      if (!retryable || attempt === maxAttempts) {
        throw error;
      }

      await sleep(attempt * 1000);
    }
  }

  throw new Error("Gemini generation failed");
}

function geminiErrorResponse(error) {
  const status = geminiStatus(error);

  if (status === 503) {
    return {
      status: 503,
      message: "Gemini is temporarily busy due to high demand. Please try again shortly.",
    };
  }

  if (status === 429) {
    return {
      status: 429,
      message: "Gemini request limit reached. Please wait and try again.",
    };
  }

  if (status === 400 || status === 401 || status === 403) {
    return {
      status: 502,
      message: "Gemini API key or API configuration is invalid.",
    };
  }

  return {
    status: 502,
    message: "Gemini could not analyze the code. Please try again.",
  };
}

router.use(auth);

router.post("/analyze", async (req, res) => {
  try {
    const { code, language } = req.body;

    if (!code || typeof code !== "string" || !code.trim()) {
      return res.status(400).json({ message: "Code is required" });
    }

    if (!language || typeof language !== "string" || !language.trim()) {
      return res.status(400).json({ message: "Language is required" });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ message: "Gemini API key is not configured" });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: SYSTEM_INSTRUCTION,
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    const prompt = `Review the following ${language.trim()} code. Follow the system instruction exactly.

CODE START
${code}
CODE END`;

    const generation = await generateWithRetry(model, prompt);
    const raw = generation.response.text();
    const cleaned = raw.replace(/```json|```/g, "").trim();

    let result;

    try {
      result = JSON.parse(cleaned);
    } catch (error) {
      console.error("Gemini returned invalid JSON:", cleaned);
      return res
        .status(502)
        .json({ message: "Gemini returned an invalid response. Please try again." });
    }

    if (!isValidReviewResult(result)) {
      return res
        .status(502)
        .json({ message: "Gemini returned an incomplete review. Please try again." });
    }

    const review = await Review.create({
      user: req.userId,
      code,
      language: language.trim(),
      result,
    });

    return res.status(201).json(review);
  } catch (error) {
    console.error("Code analysis failed:", error);
    const response = geminiErrorResponse(error);
    return res.status(response.status).json({ message: response.message });
  }
});

router.get("/history", async (req, res) => {
  try {
    const reviews = await Review.find({ user: req.userId }).sort({ createdAt: -1 });
    return res.json(reviews);
  } catch (error) {
    console.error("Fetching review history failed:", error);
    return res.status(500).json({ message: "Unable to fetch review history" });
  }
});

router.get("/history/:id", async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ message: "Invalid review ID" });
    }

    const review = await Review.findOne({ _id: req.params.id, user: req.userId });

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    return res.json(review);
  } catch (error) {
    console.error("Fetching review failed:", error);
    return res.status(500).json({ message: "Unable to fetch review" });
  }
});

router.delete("/history/:id", async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ message: "Invalid review ID" });
    }

    const review = await Review.findOneAndDelete({ _id: req.params.id, user: req.userId });

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    return res.json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Deleting review failed:", error);
    return res.status(500).json({ message: "Unable to delete review" });
  }
});

module.exports = router;
