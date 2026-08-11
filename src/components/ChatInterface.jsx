import React, { useState } from 'react';
import { SendButton } from './SendButton';
import { Sparkles, Bot, User, CornerDownLeft } from 'lucide-react';

export function ChatInterface({
  buttonState,
  onSendClick,
  disabled,
  onInteractionChange,
}) {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'assistant',
      text: 'Hello! I am ready to test stateful motion buttons. Type a message below and click Send to trigger the 80/20 async request simulation!',
      timestamp: 'Just now',
    },
  ]);

  const handleSend = async () => {
    const textToSend = inputText.trim() || 'Testing async message motion state';
    // Trigger button's execute logic
    await onSendClick(async () => {
      // Simulate 1.5s delay
      const delay = Math.floor(Math.random() * 2000) + 1000;
      await new Promise((resolve) => setTimeout(resolve, delay));

      const isSuccess = Math.random() < 0.8;
      if (!isSuccess) {
        throw new Error('Simulated network timeout (20% failure rate)');
      }

      // Add user message to log
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: 'user',
          text: textToSend,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
        {
          id: Date.now() + 1,
          sender: 'assistant',
          text: `Received: "${textToSend}". State transition completed cleanly!`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setInputText('');
      return true;
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const setSamplePrompt = (prompt) => {
    setInputText(prompt);
  };

  return (
    <div className="chat-card">
      <div className="chat-header">
        <div className="chat-header-title">
          <div className="sparkle-badge">
            <Sparkles size={16} />
          </div>
          <div>
            <h3>AI Assistant Workspace</h3>
            <span className="chat-status-sub">Connected • Stateful Motion Enabled</span>
          </div>
        </div>
      </div>

      <div className="chat-body">
        <div className="chat-messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`chat-bubble-wrapper ${msg.sender}`}>
              <div className="chat-avatar">
                {msg.sender === 'assistant' ? <Bot size={16} /> : <User size={16} />}
              </div>
              <div className="chat-bubble">
                <p>{msg.text}</p>
                <span className="bubble-time">{msg.timestamp}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Prompts */}
        <div className="quick-prompts">
          <button
            type="button"
            className="prompt-chip"
            onClick={() => setSamplePrompt('Explain motion timing choices for state transitions.')}
          >
            "Explain motion timing choices"
          </button>
          <button
            type="button"
            className="prompt-chip"
            onClick={() => setSamplePrompt('Test async response with loading & error handling.')}
          >
            "Test async response flow"
          </button>
        </div>
      </div>

      <div className="chat-footer">
        <div className="input-container">
          <textarea
            className="chat-textarea"
            placeholder="Type a message... (Press Enter or click Send)"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={2}
          />
          <div className="input-actions">
            <span className="input-hint">
              <CornerDownLeft size={12} /> Enter to send
            </span>
            <SendButton
              state={buttonState}
              onSend={handleSend}
              disabled={disabled}
              onInteractionChange={onInteractionChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
