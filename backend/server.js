const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

// Lightweight consoling chatbot
const consolingMessages = {
  sad: [
    "I know it's tough, but you're not alone.",
    "It's okay to feel sad sometimes. Breathe and take it slow.",
  ],
  stressed: [
    "Take a deep breath. One step at a time.",
    "Try to focus on one thing at a time. You've got this.",
  ],
  tired: [
    "Rest is important. Make sure to take care of yourself.",
    "Even small breaks help recharge your energy.",
  ],
  default: [
    "You're doing great, keep going!",
    "Remember, every step counts, even the small ones.",
    "You're not alone. Things will get better.",
  ],
};

// PHQ-9 results endpoint
app.post("/api/phq-result", (req, res) => {
  try {
    const { answers, score } = req.body;

    if (!answers || score === undefined) {
      return res
        .status(400)
        .json({ error: "Missing required fields: answers and score" });
    }

    const submission = {
      timestamp: new Date().toISOString(),
      answers,
      score,
    };

    let existing = [];
    if (fs.existsSync("result.json")) {
      const data = fs.readFileSync("result.json", "utf8");
      existing = data ? JSON.parse(data) : [];
    }

    existing.push(submission);
    fs.writeFileSync("result.json", JSON.stringify(existing, null, 2));

    res.json({ status: "saved", score });
  } catch (error) {
    console.error("Error in PHQ-9 endpoint:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Stress test results endpoint
app.post("/api/stress-test", (req, res) => {
  try {
    const { answers, score } = req.body;

    if (!answers || score === undefined) {
      return res
        .status(400)
        .json({ error: "Missing required fields: answers and score" });
    }

    const submission = {
      timestamp: new Date().toISOString(),
      answers,
      score,
    };

    let existing = [];
    if (fs.existsSync("stress_results.json")) {
      const data = fs.readFileSync("stress_results.json", "utf8");
      existing = data ? JSON.parse(data) : [];
    }

    existing.push(submission);
    fs.writeFileSync("stress_results.json", JSON.stringify(existing, null, 2));

    res.json({ status: "saved", score });
  } catch (error) {
    console.error("Error in stress test endpoint:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Appointment booking endpoint
app.post("/api/appointment", (req, res) => {
  try {
    const { studentId, phone, availability } = req.body;

    if (!studentId || !phone || !availability) {
      return res.status(400).json({
        error: "Missing required fields: studentId, phone, and availability",
      });
    }

    const appointment = {
      timestamp: new Date().toISOString(),
      studentId,
      phone,
      availability,
    };

    let existing = [];
    if (fs.existsSync("appointments.json")) {
      const data = fs.readFileSync("appointments.json", "utf8");
      existing = data ? JSON.parse(data) : [];
    }

    existing.push(appointment);
    fs.writeFileSync("appointments.json", JSON.stringify(existing, null, 2));

    res.json({ status: "saved", appointment });
  } catch (error) {
    console.error("Error in appointment endpoint:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Chatbot endpoint
app.post("/api/chat", (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const userMsg = message.toLowerCase();
    let reply =
      consolingMessages.default[
        Math.floor(Math.random() * consolingMessages.default.length)
      ];

    // Check for emotional keywords in the message
    for (const key in consolingMessages) {
      if (key !== "default" && userMsg.includes(key)) {
        const msgs = consolingMessages[key];
        reply = msgs[Math.floor(Math.random() * msgs.length)];
        break;
      }
    }

    res.json({ reply });
  } catch (error) {
    console.error("Error in chat endpoint:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
// Simple endpoint to get result.json data
// Get results endpoint
app.get("/api/results", (req, res) => {
  try {
    console.log("📊 Fetching results from result.json...");

    if (!fs.existsSync("result.json")) {
      console.log("❌ result.json file not found");
      return res.json([]);
    }

    const data = fs.readFileSync("result.json", "utf8");
    console.log("📁 File content:", data);

    if (!data || data.trim() === "") {
      console.log("⚠️ File is empty");
      return res.json([]);
    }

    const results = JSON.parse(data);
    console.log("✅ Parsed results:", results);

    res.json(results);
  } catch (error) {
    console.error("❌ Error reading result.json:", error);
    res
      .status(500)
      .json({ error: "Failed to read results file", details: error.message });
  }
});
//Appointment Dashboard
app.get("/api/appointment-dashboard", (req, res) => {
  try {
    console.log("📊 Fetching results from result.json...");

    if (!fs.existsSync("appointments.json")) {
      console.log("❌ result.json file not found");
      return res.json([]);
    }

    const data = fs.readFileSync("appointments.json", "utf8");
    console.log("📁 File content:", data);

    if (!data || data.trim() === "") {
      console.log("⚠️ File is empty");
      return res.json([]);
    }

    const appointments = JSON.parse(data);
    console.log("✅ Parsed results:", appointments);

    res.json(appointments);
  } catch (error) {
    console.error("❌ Error reading appointments.json:", error);
    res
      .status(500)
      .json({ error: "Failed to read results file", details: error.message });
  }
});
// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
