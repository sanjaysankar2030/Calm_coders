import React, { useState } from "react";
import "./Appointment.css";

const Appointment = () => {
  const [studentId, setStudentId] = useState("");
  const [phone, setPhone] = useState("");
  const [availability, setAvailability] = useState("");
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/appointment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentId, phone, availability }),
    });

    const data = await response.json();
    setStatus(data.status);
  };

  return (
    <div className="appointment-container">
      <h2>Book Appointment with Psychologist</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Student Register No:</label>
          <input
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            pattern="[0-9]{10}"
            title="Enter a 10-digit phone number"
          />
        </div>
        <div>
          <label>Availability (Date & Time):</label>
          <input
            type="datetime-local"
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            required
          />
        </div>
        <button type="submit">Book Appointment</button>
      </form>

      {status && <p>✅ Appointment {status}</p>}
    </div>
  );
};

export default Appointment;
