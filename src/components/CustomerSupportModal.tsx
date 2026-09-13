import React, { useState } from 'react';
import { MessageSquare, X, Send, Bot, HelpCircle, Phone, Mail, ExternalLink } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { FAQS } from '../data/mockData';

interface ChatMessage {
  sender: 'bot' | 'user';
  text: string;
  time: string;
}

export const CustomerSupportModal: React.FC = () => {
  const { isSupportOpen, setIsSupportOpen, orders, navigateTo } = useShop();

  const [activeTab, setActiveTab] = useState<'chat' | 'faq' | 'contact'>('chat');
  const [inputVal, setInputVal] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'bot',
      text: 'Greetings. I am SAVARA Concierge AI. How may I assist your style journey or order today?',
      time: 'Just now',
    },
  ]);

  const quickPrompts = [
    'Track my latest order',
    'Return or exchange policy',
    'Size recommendation help',
    'Heavyweight cotton fabric care',
  ];

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputVal;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputVal('');

    // Generate intelligent bot response
    setTimeout(() => {
      let reply = "Thank you for reaching out. Our concierge desk is reviewing your query.";
      const lower = text.toLowerCase();

      if (lower.includes('track') || lower.includes('order')) {
        const latest = orders[0];
        if (latest) {
          reply = `Your recent order #${latest.orderNumber} is currently "${latest.status}" with ${latest.courierPartner}. Tracking ID: ${latest.trackingId}. Estimated delivery: ${latest.estimatedDeliveryDate}.`;
        } else {
          reply = 'You currently have no active orders placed under this account.';
        }
      } else if (lower.includes('return') || lower.includes('exchange')) {
        reply = 'SAVARA provides a seamless 7-day doorstep return & exchange window. You can initiate this anytime from your Account > Orders tab with free pickup.';
      } else if (lower.includes('size') || lower.includes('fit')) {
        reply = 'Our garments feature contemporary tailored boxy cuts. We recommend using our interactive Size Guide tool on any product page, or sizing up for an exaggerated streetwear drape.';
      } else if (lower.includes('care') || lower.includes('wash')) {
        reply = 'For our 280+ GSM and 420 GSM garments, wash inside out in cold water on delicate cycle and hang dry in the shade to maintain matte pigment intensity.';
      } else if (lower.includes('shipping') || lower.includes('delivery')) {
        reply = 'We provide Free Express Shipping on all orders above ₹1,999. Metro deliveries typically arrive in 24–48 hours.';
      } else {
        reply = `I have logged your question regarding "${text}". A dedicated SAVARA fashion specialist is also on standby via WhatsApp (+91 98765 43210).`;
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 600);
  };

  return (
    <>
      {/* Floating Widget Launcher Button */}
      <div className="fixed bottom-20 sm:bottom-6 right-5 z-40 flex flex-col items-end gap-2">
        <button
          onClick={() => setIsSupportOpen(!isSupportOpen)}
          className="px-4 py-3 bg-neutral-950 hover:bg-black text-white rounded-full shadow-2xl flex items-center gap-2.5 transition-all duration-300 hover:scale-105 border border-neutral-700 cursor-pointer"
          aria-label="Customer Support Concierge"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-amber-400" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
          </div>
          <span className="text-xs font-bold tracking-wider hidden sm:inline uppercase">
            SAVARA Concierge
          </span>
        </button>
      </div>

      {/* Concierge Dialog */}
      {isSupportOpen && (
        <div className="fixed bottom-24 sm:bottom-20 right-4 sm:right-6 z-50 w-full max-w-[380px] bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col h-[520px] animate-fade-in">
          {/* Header */}
          <div className="p-4 bg-neutral-950 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center">
                <Bot className="w-4 h-4 text-amber-400" />
              </div>
              <div>
                <h4 className="text-xs font-bold tracking-wider uppercase font-serif-luxury">
                  SAVARA Concierge
                </h4>
                <div className="flex items-center gap-1.5 text-[10px] text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>Instant Response Active</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsSupportOpen(false)}
              className="p-1 text-neutral-400 hover:text-white rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Sub-tabs */}
          <div className="flex border-b border-neutral-200 bg-neutral-50 text-xs font-semibold text-neutral-600">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex-1 py-2.5 text-center transition-colors cursor-pointer ${
                activeTab === 'chat'
                  ? 'bg-white text-neutral-950 border-b-2 border-neutral-950'
                  : 'hover:text-black'
              }`}
            >
              Live Chat
            </button>
            <button
              onClick={() => setActiveTab('faq')}
              className={`flex-1 py-2.5 text-center transition-colors cursor-pointer ${
                activeTab === 'faq'
                  ? 'bg-white text-neutral-950 border-b-2 border-neutral-950'
                  : 'hover:text-black'
              }`}
            >
              FAQs
            </button>
            <button
              onClick={() => setActiveTab('contact')}
              className={`flex-1 py-2.5 text-center transition-colors cursor-pointer ${
                activeTab === 'contact'
                  ? 'bg-white text-neutral-950 border-b-2 border-neutral-950'
                  : 'hover:text-black'
              }`}
            >
              WhatsApp & Desk
            </button>
          </div>

          {/* Chat Tab Body */}
          {activeTab === 'chat' && (
            <div className="flex-1 flex flex-col justify-between overflow-hidden bg-neutral-50/50">
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((m, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col ${
                      m.sender === 'user' ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div
                      className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                        m.sender === 'user'
                          ? 'bg-neutral-900 text-white rounded-br-xs'
                          : 'bg-white text-neutral-800 border border-neutral-200 shadow-xs rounded-bl-xs'
                      }`}
                    >
                      {m.text}
                    </div>
                    <span className="text-[9px] text-neutral-400 mt-1 px-1">{m.time}</span>
                  </div>
                ))}
              </div>

              {/* Quick Prompts */}
              <div className="p-2 bg-white border-t border-neutral-100 flex gap-1.5 overflow-x-auto no-scrollbar">
                {quickPrompts.map((qp, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(qp)}
                    className="px-2.5 py-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-[10px] font-medium rounded-full shrink-0 transition-colors cursor-pointer"
                  >
                    {qp}
                  </button>
                ))}
              </div>

              {/* Input */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="p-3 bg-white border-t border-neutral-200 flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="Ask anything about orders or styles..."
                  className="flex-1 text-xs border border-neutral-200 rounded-full px-3.5 py-2 focus:outline-none focus:border-neutral-900"
                />
                <button
                  type="submit"
                  className="p-2 bg-neutral-900 hover:bg-black text-white rounded-full transition-colors shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          )}

          {/* FAQ Tab Body */}
          {activeTab === 'faq' && (
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-neutral-50/50">
              {FAQS.map((faq, i) => (
                <div key={i} className="p-3 bg-white rounded-xl border border-neutral-200 shadow-xs">
                  <h5 className="text-xs font-bold text-neutral-950 mb-1 flex items-start gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
                    <span>{faq.q}</span>
                  </h5>
                  <p className="text-[11px] text-neutral-600 leading-relaxed pl-5">{faq.a}</p>
                </div>
              ))}
            </div>
          )}

          {/* Contact Tab Body */}
          {activeTab === 'contact' && (
            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-white">
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
                  <Phone className="w-4 h-4" />
                  <span>WhatsApp Priority Stylist</span>
                </div>
                <p className="text-[11px] text-emerald-700 mt-1">
                  Chat directly with our luxury styling team in Mumbai for personalized recommendations.
                </p>
                <a
                  href="https://wa.me/919876543210?text=Hi%20SAVARA%20Stylist,%20I%20need%20help%20with%20my%20order"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg transition-colors"
                >
                  <span>Open WhatsApp</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-neutral-900 font-bold text-xs">
                  <Mail className="w-4 h-4" />
                  <span>Email Support Desk</span>
                </div>
                <p className="text-[11px] text-neutral-600">
                  concierge@savara.luxury | response within 2 hours
                </p>
              </div>

              <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-xl">
                <p className="text-xs font-bold text-neutral-900">SAVARA Flagship Atelier</p>
                <p className="text-[11px] text-neutral-600 mt-1 leading-relaxed">
                  100ft Road, Indiranagar, Bengaluru, KA 560038
                  <br />
                  Mon–Sun: 10:00 AM – 09:30 PM IST
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
