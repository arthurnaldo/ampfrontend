"use client";
import React, { useState, ChangeEvent } from "react";

interface Message {
  type: "user" | "bot";
  content: string;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { type: "user", content: "What is change management?" },
    {
      type: "bot",
      content:
        "Change management is the process of planning, implementing, and managing changes within an organization to ensure successful outcomes and minimize disruption. It involves understanding the impact of change on individuals and managing their emotional transition to the new situation.",
    },
    {
      type: "user",
      content:
        "What are the primary goals of IT Change Management at UC Berkeley?",
    },
    {
      type: "bot",
      content:
        "The primary goals of IT Change Management at UC Berkeley include responding to changing business requirements, aligning services with business needs, recording and evaluating changes, and optimizing overall business risk.",
    },
  ]);

  const [input, setInput] = useState<string>("");

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "user", content: input },
      ]);
      setInput("");
      // TODO: Implement logic to get a bot response
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <div>
      <div>
        <div>
          <h1>My Chat</h1>
          <div>
            <button>Save Conversation</button>
            <button>Clear Conversation</button>
          </div>
        </div>
        <div>
          {messages.map((msg, index) => (
            <div key={index}>{msg.content}</div>
          ))}
        </div>
        <div>
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="How can I help you?"
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
      <div>
        <h2>Browse FAQ</h2>
        <div>How can personal expenses be reimbursed?</div>
        <div>How does the purchasing process work?</div>
        <div>What are the fiscal year deadlines I should know?</div>
        <div>What are BluCards, and how are they used?</div>
      </div>
    </div>
  );
};

export default Chatbot;
