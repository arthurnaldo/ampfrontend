"use client";
import React, { useState, ChangeEvent } from "react";
import Image from "next/image";

interface Message {
  type: "user" | "bot";
  content: string;
}

interface MessageProps {
  message: Message;
}

const MessageComponent: React.FC<MessageProps> = ({ message }) => {
  const isUser = message.type === "user";
  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} items-start gap-2`}
    >
      {!isUser && (
        <Image
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbCJx8zUpYCC7W5d-Izs3lxB_AgyhigLYzQw&s"
          alt="Bot Profile"
          width={32} // Adjust size as needed
          height={32} // Adjust size as needed
          className="rounded-full"
        />
      )}
      <div
        className={`mt-4 rounded-xl p-4 ${
          isUser
            ? "self-end rounded-tr-none bg-blue-200"
            : "rounded-tl-none bg-white"
        }`}
      >
        {message.content}
      </div>
    </div>
  );
};

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

  const [faqItems] = useState<string[]>([
    "How can personal expenses be reimbursed?",
    "How does the purchasing process work?",
    "What are the fiscal year deadlines I should know?",
    "What are BluCards, and how are they used?",
  ]);

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

  const handleClearMessages = () => {
    setMessages([]);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <div className="flex w-full gap-4 overflow-hidden bg-gray-100 p-6">
      {/* Left Panel */}
      <div className="flex w-3/4 flex-col rounded-lg bg-gray-200 p-4 shadow-lg">
        <div className="mb-3 flex justify-between gap-2">
          <h1 className="text-2xl font-bold">My Chat</h1>
          <div className="flex gap-2">
            <button className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
              Save Conversation
            </button>
            <button
              onClick={handleClearMessages}
              className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            >
              Clear Conversation
            </button>
          </div>
        </div>
        <div className="flex h-[32rem] flex-col gap-4 overflow-y-auto rounded-lg p-4">
          {messages.map((msg, index) => (
            <MessageComponent key={index} message={msg} />
          ))}
        </div>
        <div className="mt-4 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="How can I help you?"
            className="flex-1 rounded-lg border px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
          <button
            onClick={handleSendMessage}
            className="rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600"
          >
            Send
          </button>
        </div>
      </div>
      {/* Right Panel */}
      <div className="flex w-1/4 flex-col rounded-lg bg-gray-200 p-4 shadow-lg">
        <h2 className="mb-4 text-xl font-bold">Browse FAQ</h2>
        <ul className="space-y-4">
          {faqItems.map((item, index) => (
            <li
              key={index}
              className="cursor-pointer rounded-lg bg-white p-4 hover:bg-gray-300"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Chatbot;
