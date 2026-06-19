const mongoose = require("mongoose");

const issueWithSeveritySchema = new mongoose.Schema(
  {
    line: { type: mongoose.Schema.Types.Mixed, default: null },
    message: { type: String, required: true },
    severity: { type: String, default: "info" },
  },
  { _id: false },
);

const bestPracticeIssueSchema = new mongoose.Schema(
  {
    line: { type: mongoose.Schema.Types.Mixed, default: null },
    message: { type: String, required: true },
  },
  { _id: false },
);

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    code: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    result: {
      score: { type: Number, required: true, min: 0, max: 100 },
      issues: {
        syntax: { type: [issueWithSeveritySchema], default: [] },
        logic: { type: [issueWithSeveritySchema], default: [] },
        performance: { type: [issueWithSeveritySchema], default: [] },
        security: { type: [issueWithSeveritySchema], default: [] },
        bestPractices: { type: [bestPracticeIssueSchema], default: [] },
      },
      fixedCode: { type: String, default: "" },
      summary: { type: String, required: true },
    },
  },
  { timestamps: true },
);

reviewSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model("Review", reviewSchema);
