import React, { useState, useEffect } from "react";

const Appointment_Dash = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      console.log("🔄 Fetching appointments...");

      const response = await fetch(
        "http://localhost:5000/api/appointment-dashboard",
      );
      const text = await response.text();
      console.log("📄 Raw response:", text);

      const data = JSON.parse(text);
      setAppointments(data);
      setError("");
    } catch (err) {
      console.error("❌ Fetch error:", err);
      setError(`Failed to fetch appointments: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2 style={{ padding: "20px" }}>Loading appointments...</h2>;
  }

  if (error) {
    return (
      <div style={{ padding: "20px", color: "red" }}>
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={fetchAppointments}>Retry</button>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Appointments</h2>
      <button onClick={fetchAppointments} style={{ marginBottom: "20px" }}>
        Refresh
      </button>

      {appointments.length === 0 ? (
        <p>No appointments found.</p>
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
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                Timestamp
              </th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                Student ID
              </th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                Phone
              </th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                Availability
              </th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt, index) => (
              <tr key={index}>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {index + 1}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {new Date(appt.timestamp).toLocaleString()}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {appt.studentId}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {appt.phone}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {new Date(appt.availability).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Appointment_Dash;
