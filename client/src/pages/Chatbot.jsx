import React, { useState } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);

  const sendMessage = async (text) => {
    setMessages((prev) => [...prev, { type: "user", text }]);

    const res = await fetch("http://localhost:5000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    });
    const data = await res.json();

    setMessages((prev) => [...prev, { type: "bot", text: data.reply }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const input = e.target.elements.msg.value.trim();
    if (!input) return;
    sendMessage(input);
    e.target.reset();
  };

  return (
    <div>
      <h2>Consoling Chatbot</h2>
      <div
        className="chat-window"
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          height: "300px",
          overflowY: "scroll",
        }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            style={{ textAlign: m.type === "user" ? "right" : "left" }}
          >
            <strong>{m.type === "user" ? "You" : "Bot"}:</strong> {m.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          name="msg"
          placeholder="Type something..."
          style={{ width: "80%" }}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chatbot;
