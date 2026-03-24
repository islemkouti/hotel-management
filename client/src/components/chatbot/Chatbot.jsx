import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Minimize2 } from 'lucide-react';

const initialMessages = [
  {
    id: '1',
    role: 'assistant',
    content: "Hi! I'm your StayEase assistant. How can I help you today? I can help you find hotels, answer questions about bookings, or provide travel recommendations.",
  },
];

const quickReplies = [
  "Find hotels in Miami",
  "What's your cancellation policy?",
  "I need help with my booking",
  "Show me deals",
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text = input) => {
    if (!text.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text.trim(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate bot response (in production, this would call an API)
    setTimeout(() => {
      const botResponse = generateResponse(text.toLowerCase());
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: botResponse,
      }]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const generateResponse = (input) => {
    if (input.includes('hotel') || input.includes('find') || input.includes('search')) {
      return "I'd be happy to help you find the perfect hotel! You can use our search feature on the homepage to browse available properties by location, dates, and number of guests. Would you like me to guide you through the search process?";
    }
    if (input.includes('cancel') || input.includes('policy')) {
      return "Our cancellation policy varies by hotel. Most hotels offer free cancellation up to 24-48 hours before check-in. You can find the specific cancellation policy on each hotel's page before booking. If you need to cancel an existing booking, please visit your Dashboard > My Bookings.";
    }
    if (input.includes('booking') || input.includes('reservation')) {
      return "I can help with your booking! To view or manage existing reservations, go to Dashboard > My Bookings. From there you can see all your upcoming stays, view details, or cancel if needed. Is there a specific booking you need help with?";
    }
    if (input.includes('deal') || input.includes('discount') || input.includes('offer')) {
      return "Great question! We regularly feature special deals and promotions on our homepage. Look for the 'Featured Hotels' section for properties with the best current offers. You can also sign up for our newsletter to get exclusive deals sent directly to your inbox!";
    }
    if (input.includes('payment') || input.includes('pay')) {
      return "We accept all major credit cards (Visa, Mastercard, American Express) as well as PayPal. Payment is typically processed at the time of booking, though some hotels offer pay-at-property options. Your payment information is always encrypted and secure.";
    }
    if (input.includes('contact') || input.includes('support') || input.includes('help')) {
      return "For direct support, you can email us at support@stayease.com or call our 24/7 helpline at 1-800-STAYEASE. You can also visit your Dashboard to manage bookings or submit support requests through your account.";
    }
    if (input.includes('hi') || input.includes('hello') || input.includes('hey')) {
      return "Hello! Welcome to StayEase. How can I assist you today? I can help you find hotels, answer questions about our services, or assist with existing bookings.";
    }
    if (input.includes('thank')) {
      return "You're welcome! Is there anything else I can help you with? Feel free to ask any questions about hotels, bookings, or travel tips!";
    }
    return "I'm here to help! I can assist you with finding hotels, answering questions about bookings and cancellations, or providing information about our services. What would you like to know more about?";
  };

  const handleQuickReply = (reply) => {
    handleSend(reply);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-teal-600 text-white rounded-full shadow-lg hover:bg-teal-700 transition-all hover:scale-110"
        aria-label="Open chat"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden transition-all ${isMinimized ? 'h-14' : 'h-[500px]'}`}>
      {/* Header */}
      <div className="bg-teal-600 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold">StayEase Assistant</h3>
            <p className="text-xs text-teal-100">Always here to help</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 hover:bg-white/20 rounded transition-colors"
          >
            <Minimize2 className="h-5 w-5" />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-white/20 rounded transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="h-[340px] overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start gap-2 max-w-[85%] ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === 'user' ? 'bg-teal-100' : 'bg-slate-200'
                  }`}>
                    {message.role === 'user' ? (
                      <User className="h-4 w-4 text-teal-700" />
                    ) : (
                      <Bot className="h-4 w-4 text-slate-600" />
                    )}
                  </div>
                  <div className={`px-4 py-2.5 rounded-2xl ${
                    message.role === 'user'
                      ? 'bg-teal-600 text-white rounded-tr-none'
                      : 'bg-white text-slate-700 rounded-tl-none border border-slate-200'
                  }`}>
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
                    <Bot className="h-4 w-4 text-slate-600" />
                  </div>
                  <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-none border border-slate-200">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />

            {/* Quick Replies */}
            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {quickReplies.map((reply) => (
                  <button
                    key={reply}
                    onClick={() => handleQuickReply(reply)}
                    className="px-3 py-1.5 bg-white border border-slate-200 rounded-full text-sm text-slate-600 hover:bg-slate-100 hover:border-slate-300 transition-colors"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-slate-200 bg-white">
            <form
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-slate-200 rounded-full focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="p-2.5 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
