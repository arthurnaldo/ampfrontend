"use client";
import React, { useState, ChangeEvent } from "react";
import Image from "next/image";

interface Message {
  type: "user" | "bot";
  content: string | JSX.Element;
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
          width={32}
          height={32}
          className="rounded-full"
        />
      )}
      <div
        className={`rounded-xl p-4 shadow-md transition-all ${
          isUser
            ? "rounded-tr-none bg-blue-500 text-white"
            : "rounded-tl-none bg-gray-200 text-gray-800"
        }`}
      >
        {message.content}
      </div>
    </div>
  );
};

interface Questions {
  [key: string]: string[]; // This allows any string as a key with an array of strings as the value
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { type: "bot", content: "Welcome! How can I assist you today?" },
  ]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [topic, setTopic] = useState<string>("");

  const questions: Questions = {
    "Business and Finance": [
      "What is Berkeley's Chart of Accounts?",
      "How does the purchasing process work?",
      "What are the fiscal year deadlines I should know?",
      "What are BluCards, and how are they used?",
    ],
    "Academic and Faculty Affairs": [
      "How does the faculty hiring process work?",
      "What is APBears, and how is it used?",
      "What is the role of the Academic Personnel Office (APO)?",
      "Where can I find guides for academic recruitment?",
    ],
  };

  const handleSendMessage = async (question?: string) => {
    const userMessageContent = question || input.trim();
    if (userMessageContent) {
      const userMessage: Message = {
        type: "user",
        content: userMessageContent,
      };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setLoading(true);

      try {
        // Make an API call to your backend
        const response = await fetch("http://127.0.0.1:5000/query", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query: userMessageContent }),
        });

        console.log(response);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        // Access the result from the response
        const botResponse: string | JSX.Element = data.response.result;

        const botMessage: Message = { type: "bot", content: botResponse };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
        setInput("");
      } catch (error) {
        console.error("Error fetching response:", error);
        const errorMessage: Message = {
          type: "bot",
          content: "Sorry, I couldn't get a response from the server.",
        };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
        setInput("");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleClearMessages = () => {
    setMessages([
      { type: "bot", content: "Welcome! How can I assist you today?" },
    ]);
    setTopic("");
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <div className="flex w-full gap-4 bg-gray-100 p-6">
      {/* Left Panel */}
      <div className="flex w-3/4 flex-col rounded-lg bg-white p-4 shadow-lg">
        <div className="mb-3 flex justify-between">
          <h1 className="text-2xl font-bold text-gray-800">My Chat</h1>
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
        <div className="flex h-[32rem] flex-col gap-4 overflow-y-auto rounded-lg bg-gray-100 p-4">
          {messages.map((msg, index) => (
            <MessageComponent key={index} message={msg} />
          ))}
        </div>
        <div className="mt-4 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message..."
            className="flex-1 rounded-lg border px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            disabled={loading}
          />
          <button
            onClick={() => handleSendMessage()}
            className="rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
      {/* Right Panel */}
      <div className="flex w-1/4 flex-col rounded-lg bg-white p-4 shadow-lg">
        <h2 className="mb-4 text-xl font-bold text-gray-800">FAQ</h2>
        <ul className="space-y-2">
          {(topic in questions ? questions[topic] : []).map(
            (question, index) => (
              <li
                key={index}
                className="cursor-pointer rounded-lg bg-gray-200 p-3 hover:bg-gray-300"
                onClick={() => handleSendMessage(question)}
              >
                {question}
              </li>
            ),
          )}
        </ul>
      </div>
    </div>
  );
};

export default Chatbot;
