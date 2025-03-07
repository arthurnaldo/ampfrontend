"use client";
import React, { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
        <Avatar className="h-8 w-8">
          <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbCJx8zUpYCC7W5d-Izs3lxB_AgyhigLYzQw&s" />
          <AvatarFallback>BOT</AvatarFallback>
        </Avatar>
      )}
      <div
        className={`rounded-lg p-4 ${
          isUser ? "bg-blue-500 text-white" : "bg-muted text-muted-foreground"
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
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <div className="flex w-full gap-4 p-6">
      <Card className="flex w-3/4 flex-col">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle>My Chat</CardTitle>
          <div className="flex gap-2">
            <Button variant="default">Save Conversation</Button>
            <Button variant="destructive" onClick={handleClearMessages}>
              Clear Conversation
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <ScrollArea className="h-[32rem] rounded-md border p-4">
            {messages.map((msg, index) => (
              <MessageComponent key={index} message={msg} />
            ))}
          </ScrollArea>
          <div className="flex items-center gap-2">
            <Input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message..."
              disabled={loading}
            />
            <Button onClick={() => handleSendMessage()} disabled={loading}>
              {loading ? "Sending..." : "Send"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="w-1/4">
        <CardHeader>
          <CardTitle>FAQ</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="Business and Finance">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="Business and Finance">Business</TabsTrigger>
              <TabsTrigger value="Academic and Faculty Affairs">
                Academic
              </TabsTrigger>
            </TabsList>
            {Object.entries(questions).map(([category, questionList]) => (
              <TabsContent key={category} value={category}>
                <div className="space-y-2">
                  {questionList.map((question, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-start text-left"
                      onClick={() => handleSendMessage(question)}
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Chatbot;
