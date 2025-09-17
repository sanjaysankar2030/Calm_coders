import { useState } from "react";
import { Link } from "react-router-dom";

export default function PhqTest() {
  const questions = [
    "Little interest or pleasure in doing things",
    "Feeling down, depressed, or hopeless",
    "Trouble falling or staying asleep, or sleeping too much",
    "Feeling tired or having little energy",
    "Poor appetite or overeating",
    "Feeling bad about yourself — or that you are a failure",
    "Trouble concentrating on things",
    "Moving/speaking slowly or being fidgety/restless",
    "Thoughts that you would be better off dead, or of hurting yourself",
  ];

  const options = [
    { label: "Select a option", value: 0 },
    { label: "Not at all", value: 1 },
    { label: "Several days", value: 2 },
    { label: "More than half the days", value: 3 },
    { label: "Nearly every day", value: 4 },
  ];

  const [answers, setAnswers] = useState(Array(questions.length).fill(0));
  const [score, setScore] = useState(null);

  const handleChange = (qIndex, value) => {
    const newAnswers = [...answers];
    newAnswers[qIndex] = parseInt(value);
    setAnswers(newAnswers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const total = answers.reduce((a, b) => a + b, 0);
    setScore(total);

    // Save to backend
    await fetch("http://localhost:5000/api/phq-result", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        answers,
        score: total,
        date: new Date().toISOString(),
      }),
    });
  };

  return (
    <div>
      <h1>PHQ-9 Test</h1>
      <form onSubmit={handleSubmit}>
        {questions.map((q, i) => (
          <div key={i}>
            <p>
              {i + 1}. {q}
            </p>
            {options.map((opt) => (
              <label key={opt.value} style={{ marginRight: "10px" }}>
                <input
                  type="radio"
                  name={`q${i}`}
                  value={opt.value}
                  checked={answers[i] === opt.value}
                  onChange={(e) => handleChange(i, e.target.value)}
                  required
                />
                {opt.label}
              </label>
            ))}
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>

      {score !== null && <h2>Your PHQ-9 Score: {score}</h2>}
      <p>
        If you want, you can also take the{" "}
        <Link to="/stress-test">Stress Test</Link> to know your stress level.
      </p>
    </div>
  );
}
