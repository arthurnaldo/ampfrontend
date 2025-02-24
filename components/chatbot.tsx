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

  const handleSendMessage = (question?: string) => {
    const userMessageContent = question || input.trim();
    if (userMessageContent) {
      const userMessage: Message = {
        type: "user",
        content: userMessageContent,
      };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      let botResponse: string | JSX.Element =
        "I'm not sure about that. Could you ask something else?";
      if (userMessageContent.toLowerCase().includes("chart of accounts")) {
        botResponse = (
          <>
            Berkeleys Chart of Accounts (CoA) is called a &quot;chart
            string.&quot; Learn more here:{" "}
            <a
              href="https://controller.berkeley.edu/accounting-controls/chart-accounts"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline hover:text-blue-700"
            >
              Chart of Accounts
            </a>
            .
          </>
        );
        setTopic("Business and Finance");
      } else if (userMessageContent.toLowerCase().includes("faculty hiring")) {
        botResponse = (
          <>
            Faculty hiring at Berkeley involves using APRecruit with approvals
            from OFEW and APO. Learn more:{" "}
            <a
              href="https://aprecruit.berkeley.edu/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline hover:text-blue-700"
            >
              APRecruit
            </a>
            .
          </>
        );
        setTopic("Academic and Faculty Affairs");
      } else if (
        userMessageContent.toLowerCase().includes("fiscal year deadlines")
      ) {
        botResponse = (
          <>
            Key finance deadlines include July 1 (start of fiscal year) and
            June-mid-July (close of prior fiscal year books). Learn more:{" "}
            <a
              href="https://cfo.berkeley.edu/divisional-finance-leaders/vc-finance-operational-deadlines"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline hover:text-blue-700"
            >
              Finance Deadlines
            </a>
            .
          </>
        );
        setTopic("Business and Finance");
      } else if (userMessageContent.toLowerCase().includes("blucards")) {
        botResponse = (
          <>
            BluCards are Berkeley&apos;s procurement cards for purchases. Learn
            more:{" "}
            <a
              href="https://controller.berkeley.edu/financial-operations/card-program-overview"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline hover:text-blue-700"
            >
              BluCard Overview
            </a>
            .
          </>
        );
        setTopic("Business and Finance");
      } else if (userMessageContent.toLowerCase().includes("apbears")) {
        botResponse = (
          <>
            APBears is a web application at Berkeley for tracking faculty
            achievements and streamlining review processes. Details:{" "}
            <a
              href="https://apapps.berkeley.edu/home"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline hover:text-blue-700"
            >
              APBears
            </a>
            .
          </>
        );
        setTopic("Academic and Faculty Affairs");
      } else if (
        userMessageContent.toLowerCase().includes("purchasing process")
      ) {
        botResponse =
          "At Berkeley, the purchasing process involves using BearBuy, the university's procurement system. Purchases can be made from pre-approved catalogs or as custom orders. For purchases above $10,000, additional approvals and documentation are required.";
        setTopic("Business and Finance");
      } else if (
        userMessageContent.toLowerCase().includes("academic recruitment")
      ) {
        botResponse =
          "Guides for academic recruitment are detailed resources that provide step-by-step processes for faculty hiring, including search committee guidelines, diversity requirements, and reporting standards. These ensure equity and compliance throughout the hiring process.";
        setTopic("Academic and Faculty Affairs");
      } else if (userMessageContent.toLowerCase().includes("role")) {
        botResponse =
          "The Academic Personnel Office (APO) at Berkeley oversees policies related to academic employment. It supports faculty, academic appointees, and administrative units by ensuring compliance with employment policies and fostering a productive academic environment.";
        setTopic("Academic and Faculty Affairs");
      }

      const botMessage: Message = { type: "bot", content: botResponse };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setInput("");
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
          />
          <button
            onClick={() => handleSendMessage()}
            className="rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600"
          >
            Send
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
