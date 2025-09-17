const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

// Lightweight consoling chatbot
const consolingMessages = {
  sad: [
    "I know it's tough, but you’re not alone.",
    "It's okay to feel sad sometimes. Breathe and take it slow.",
  ],
  stressed: [
    "Take a deep breath. One step at a time.",
    "Try to focus on one thing at a time. You’ve got this.",
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

// Placeholder route for PHQ-9 results
app.post("/api/phq-result", (req, res) => {
  const { answers, score } = req.body;
  const submission = {
    timestamp: new Date().toISOString(),
    answers,
    score,
  };

  let existing = [];
  if (fs.existsSync("result.json")) {
    existing = JSON.parse(fs.readFileSync("result.json", "utf8"));
  }

  existing.push(submission);

  fs.writeFileSync("result.json", JSON.stringify(existing, null, 2));

  res.json({ status: "saved", score });
});

// Placeholder for chatbot
app.post("/api/stress-test", (req, res) => {
  const { answers, score } = req.body;
  const submission = {
    timestamp: new Date().toISOString(),
    answers,
    score,
  };

  let existing = [];
  if (fs.existsSync("stress_results.json")) {
    existing = JSON.parse(fs.readFileSync("stress_results.json", "utf8"));
  }

  existing.push(submission);

  fs.writeFileSync("stress_results.json", JSON.stringify(existing, null, 2));

  res.json({ status: "saved", score });
});

// Placeholder for stress test
app.post("/api/appointment", (req, res) => {
  const { studentId, phone, availability } = req.body;

  if (!studentId || !phone || !availability) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const appointment = {
    timestamp: new Date().toISOString(),
    studentId,
    phone,
    availability,
  };

  let existing = [];
  if (fs.existsSync("appointments.json")) {
    existing = JSON.parse(fs.readFileSync("appointments.json", "utf8"));
  }

  existing.push(appointment);

  fs.writeFileSync("appointments.json", JSON.stringify(existing, null, 2));

  res.json({ status: "saved", appointment });
});

// Placeholder for appointment booking

app.post("/api/chat", (req, res) => {
  const userMsg = req.body.message.toLowerCase();
  let reply =
    consolingMessages.default[
      Math.floor(Math.random() * consolingMessages.default.length)
    ];

  for (const key in consolingMessages) {
    if (userMsg.includes(key)) {
      const msgs = consolingMessages[key];
      reply = msgs[Math.floor(Math.random() * msgs.length)];
      break;
    }
  }

  res.json({ reply });
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
