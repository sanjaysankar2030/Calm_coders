import React, { useState } from "react";
import styles from "./StressTest.css";

const questions = [
  "In the last month, how often have you been upset because of something unexpected?",
  "In the last month, how often have you felt unable to control important things in your life?",
  "In the last month, how often have you felt nervous and stressed?",
  "In the last month, how often have you felt confident about your ability to handle personal problems?",
  "In the last month, how often have you felt that things were going your way?",
  "In the last month, how often have you found that you could not cope with all the things you had to do?",
  "In the last month, how often have you been able to control irritations in your life?",
  "In the last month, how often have you felt you were on top of things?",
  "In the last month, how often have you been angered because of things outside your control?",
  "In the last month, how often have you felt difficulties were piling up so high that you could not overcome them?",
];

const StressTest = () => {
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));
  const [score, setScore] = useState(null);
  const [analysis, setAnalysis] = useState("");

  const handleChange = (index, value) => {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const total = answers.reduce((sum, val) => sum + Number(val || 0), 0);
    setScore(total);

    let resultText = "";
    if (total <= 13) resultText = "Low stress";
    else if (total <= 26) resultText = "Moderate stress";
    else resultText = "High stress";
    setAnalysis(resultText);

    // Send to backend
    await fetch("http://localhost:5000/api/stress-test", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers, score: total }),
    });
  };

  return (
    <div className={styles.stressTestContainer}>
      <h2 className={styles.header}>Stress Test (PSS-10)</h2>
      <form onSubmit={handleSubmit}>
        {questions.map((q, index) => (
          <div key={index}>
            <p>{q}</p>
            <select
              value={answers[index] ?? ""}
              onChange={(e) => handleChange(index, e.target.value)}
              className={styles.select}
              required
            >
              <option value="" disabled>
                Select an option
              </option>
              <option value="0">Never (0)</option>
              <option value="1">Almost Never (1)</option>
              <option value="2">Sometimes (2)</option>
              <option value="3">Fairly Often (3)</option>
              <option value="4">Very Often (4)</option>
            </select>
          </div>
        ))}
        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>

      {score !== null && (
        <div>
          <h3 className={styles.score}>Your Score: {score}</h3>
          <p className={styles.analysis}>Analysis: {analysis}</p>
        </div>
      )}
    </div>
  );
};

export default StressTest;
