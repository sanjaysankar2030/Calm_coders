import React, { useState } from "react";
//import "./Chatbot.css"; // Make sure this path is correct

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
    <div className="chatbot-container">
      <h2>Consoling Chatbot</h2>

      <div className="chat-window">
        {messages.map((m, i) => (
          <div key={i} className={`message ${m.type}`}>
            <strong>{m.type === "user" ? "You" : "Bot"}:</strong> {m.text}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="chat-form">
        <input name="msg" placeholder="Type something..." />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chatbot;
