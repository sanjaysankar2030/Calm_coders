import React, { useState, useEffect } from "react";

const ResultsPage = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      console.log("🔄 Starting fetch...");

      const response = await fetch("http://localhost:5000/api/results");
      console.log("📡 Response status:", response.status);
      console.log("📡 Response headers:", response.headers);

      // Get the response as text first to see what we're actually getting
      const responseText = await response.text();
      console.log("📄 Raw response text:", responseText);

      // Check if it's valid JSON before parsing
      if (
        !responseText.trim().startsWith("{") &&
        !responseText.trim().startsWith("[")
      ) {
        throw new Error(
          `Server returned non-JSON response: ${responseText.substring(0, 100)}...`,
        );
      }

      const data = JSON.parse(responseText);
      console.log("✅ Parsed data:", data);

      setResults(data);
      setError("");
    } catch (err) {
      console.error("❌ Fetch error:", err);
      setError(`Failed to fetch results: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Loading results...</h2>
        <button onClick={fetchResults}>Retry</button>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "20px" }}>
        <h2 style={{ color: "red" }}>Error</h2>
        <p>{error}</p>
        <button onClick={fetchResults}>Retry</button>

        <div
          style={{ marginTop: "20px", background: "#f8d7da", padding: "15px" }}
        >
          <h3>Troubleshooting Steps:</h3>
          <ol>
            <li>Make sure your Express server is running on port 5000</li>
            <li>
              Check that the endpoint http://localhost:5000/api/results returns
              JSON
            </li>
            <li>Verify your server.js file has the /api/results endpoint</li>
            <li>Check the terminal where your server is running for errors</li>
          </ol>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Test Results</h2>
      <button onClick={fetchResults} style={{ marginBottom: "20px" }}>
        Refresh Data
      </button>

      {results.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "left",
          }}
        >
          <thead>
            <tr>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>#</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Date</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                Score
              </th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                Answers
              </th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={index}>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {index + 1}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {new Date(result.timestamp).toLocaleString()}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {result.score}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {result.answers ? (
                    <ul style={{ paddingLeft: "20px", margin: 0 }}>
                      {result.answers.map((answer, i) => (
                        <li key={i}>{answer}</li>
                      ))}
                    </ul>
                  ) : (
                    "N/A"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ResultsPage;
