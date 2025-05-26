import React from "react";
import LanguageSelector from "../../components/chat/LanguageSelector";
import QuickTopics from "../../components/chat/QuickTopics";
import ChatWindow from "../../components/chat/ChatWindow";
import ConsultationCTA from "../../components/chat/ConsultationCTA";

const ChatPage = () => {
  return (
    <div className="max-w-[1500px] mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Chat Support</h1>
      <p className="text-gray-600 mb-8">
        Our innovative chatbot is here to provide guidance in health questions.
        Our AI assistant is available 24/7 to provide guidance and information.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Sidebar */}
        <div className="space-y-6">
          <LanguageSelector />
          <QuickTopics />
        </div>

        {/* Chat Window */}
        <div className="md:col-span-2">
          <ChatWindow />
          <ConsultationCTA />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
