import React, { useState, useRef, useEffect } from 'react';

const ChatMessage = ({ message, isBot }) => (
  <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}>
    <div
      className={`max-w-[80%] rounded-lg p-4 ${
        isBot
          ? 'bg-gray-100 text-gray-800'
          : 'bg-pink-100 text-pink-800'
      }`}
    >
      {isBot && (
        <div className="flex items-center mb-2">
          <div className="w-6 h-6 rounded-full bg-pink-500 flex items-center justify-center text-white text-xs mr-2">
            AI
          </div>
          <span className="font-medium text-pink-600">Dr. Lisa</span>
        </div>
      )}
      <p>{message}</p>
    </div>
  </div>
);

const ChatWindow = () => {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    {
      id: 1,
      message: "Hey! I'm Dr. Lisa. I'm here to help you with your sexual & reproductive healthcare issues",
      isBot: true
    }
  ]);
  
  const messagesEndRef = useRef(null);

  // Auto-scroll to the bottom of chat when messages change
  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Format messages for API request
  const formatMessagesForAPI = () => {
    return chatHistory.map(chat => ({
      role: chat.isBot ? 'assistant' : 'user',
      content: chat.message
    }));
  };

  const callChatAPI = async (userInput) => {
    // Prepare messages for API
    const apiMessages = [
      ...formatMessagesForAPI(),
      { role: 'user', content: userInput }
    ];

    try {
      // Call the API
      const response = await fetch('https://ai.gynocare.kilush.com/chat', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ messages: apiMessages })
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error('API Error:', error);
      return "I'm sorry, I'm having trouble connecting to my knowledge base right now. Please try again in a moment.";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    const userMessage = message.trim();
    setMessage('');

    // Add user message to chat
    setChatHistory(prev => [
      ...prev,
      { id: prev.length + 1, message: userMessage, isBot: false }
    ]);

    // Show loading state
    setIsLoading(true);

    try {
      // Get response from API
      const botResponse = await callChatAPI(userMessage);

      // Add bot response to chat
      setChatHistory(prev => [
        ...prev,
        { id: prev.length + 1, message: botResponse, isBot: true }
      ]);
    } catch (error) {
      console.error('Error:', error);
      
      // Add error message
      setChatHistory(prev => [
        ...prev,
        { 
          id: prev.length + 1, 
          message: "I'm sorry, I encountered an error. Please try again later.", 
          isBot: true 
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Chat Header */}
      <div className="bg-pink-50 p-4 border-b border-pink-100">
        <h3 className="text-lg font-semibold text-gray-800">Chat with Dr. Lisa</h3>
        <p className="text-sm text-gray-600">AI Health Assistant</p>
      </div>

      {/* Chat Messages */}
      <div className="h-[400px] overflow-y-auto p-4">
        {chatHistory.map((chat) => (
          <ChatMessage
            key={chat.id}
            message={chat.message}
            isBot={chat.isBot}
          />
        ))}
        
        {/* Loading indicator */}
        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="bg-gray-100 rounded-lg p-4 max-w-[80%]">
              <div className="flex items-center mb-2">
                <div className="w-6 h-6 rounded-full bg-pink-500 flex items-center justify-center text-white text-xs mr-2">
                  AI
                </div>
                <span className="font-medium text-pink-600">Dr. Lisa</span>
              </div>
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{animationDelay: '0.2s'}}></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>
          </div>
        )}
        
        {/* This ref helps scroll to bottom */}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your question here..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            disabled={isLoading}
          />
          <button
            type="submit"
            className={`px-6 py-2 bg-pink-500 text-white rounded-full transition-colors ${
              isLoading || !message.trim() 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-pink-600'
            }`}
            disabled={isLoading || !message.trim()}
          >
            Send
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Not a substitute for professional medical advice
        </p>
      </form>
    </div>
  );
};

export default ChatWindow;