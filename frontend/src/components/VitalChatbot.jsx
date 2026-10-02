import { useState } from "react";
import { getVitalChatResponse } from "../ai/chatbotEngine";

function VitalChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi! I'm Vital 👋 How can I help you today?",
    },
  ]);

  function sendMessage(text) {
    if (!text.trim()) return;

    let response;

    try {
      response = getVitalChatResponse(text);
    } catch (error) {
      console.error(error);

      response = {
        message: "Sorry, I couldn't process that request right now.",
        suggestions: [],
        links: [],
      };
    }

    setMessages((old) => [
      ...old,
      {
        sender: "user",
        text: text,
      },
      {
        sender: "bot",
        text: response.message || response.text || "",
        suggestions: response.suggestions || [],
        links: response.links || [],
      },
    ]);

    setInput("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    sendMessage(input);
  }

  return (
    <>
      <button
        type="button"
        className="vital-chat-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "×" : "💬"}
      </button>

      {isOpen && (
        <div className="vital-chatbot">

          <div className="vital-chat-header">
            <div>
              <strong>Vital Assistant</strong>
              <span>Your personal health helper</span>
            </div>

            <button
              type="button"
              className="vital-chat-close"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
          </div>

          <div className="vital-chat-messages">

            {messages.map((message, index) => (
              <div
                key={index}
                className={`chat-message ${message.sender}`}
              >
                <div className="chat-bubble">
                  {message.text.split("\n").map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>

                {/* Recipe / external links */}
                {message.sender === "bot" &&
                  message.links &&
                  message.links.length > 0 && (
                    <div className="chat-links">
                      {message.links.map((link, i) => (
                        <a
                          key={i}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="chat-link"
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  )}

                {/* Suggestions */}
                {message.sender === "bot" &&
                  message.suggestions &&
                  message.suggestions.length > 0 && (
                    <div className="chat-suggestions">
                      {message.suggestions.map((suggestion, i) => (
                        <button
                          type="button"
                          key={i}
                          onClick={() => sendMessage(suggestion)}
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
              </div>
            ))}

          </div>

          <form
            className="vital-chat-input"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Vital anything..."
            />

            <button type="submit">➤</button>
          </form>

        </div>
      )}
    </>
  );
}

export default VitalChatbot;