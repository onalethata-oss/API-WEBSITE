import { useState } from "react";
import "./Chatbot.css";

type Message = {
  role: "user" | "bot";
  text: string;
};

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Hi 👋 How can I help you?" }
  ]);
  const [input, setInput] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const sendMessage = async (): Promise<void> => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: input })
      });

      const data: { reply: string } = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "bot", text: data.reply }
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Error connecting to server." }
      ]);
    }

    setInput("");
    setLoading(false);
  };

  return (
    <>
      {/* Toggle Button */}
      <div className="chat-toggle" onClick={() => setOpen(!open)}>
        💬
      </div>

      {/* Chat Window */}
      {open && (
        <div className="chat-container">
          <div className="chat-header">Assistant</div>

          <div className="chat-body">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-message ${msg.role}`}>
                {msg.text}
              </div>
            ))}
            {loading && <div className="chat-message bot">Typing...</div>}
          </div>

          <div className="chat-footer">
            <input
              value={input}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setInput(e.target.value)
              }
              placeholder="Type a message..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}