
import React, { useState, useRef, useEffect } from 'react';
import { geminiService } from '../services/geminiService';
import { Message } from '../types';

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Bienvenue dans cet espace de douceur. Je suis là pour vous écouter, sans jugement. Comment vous sentez-vous aujourd'hui ?", timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      const timeout = setTimeout(scrollToBottom, 100);
      return () => clearTimeout(timeout);
    }
  }, [messages, isLoading, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const history = messages.map(m => ({ role: m.role, text: m.text }));
    const responseText = await geminiService.generateEmpatheticResponse(input, history);

    const botMsg: Message = { role: 'model', text: responseText, timestamp: new Date() };
    setMessages(prev => [...prev, botMsg]);
    setIsLoading(false);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-violet-perso text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center group"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 group-hover:ml-2 whitespace-nowrap">Besoin de parler ?</span>
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-violet-100 flex flex-col h-[500px] animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-violet-perso p-4 text-white flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-white/20 rounded-full flex items-center justify-center text-xl">✨</div>
              <div>
                <p className="font-bold text-sm">L'Éclat de l'Espoir</p>
                <p className="text-[10px] opacity-80">Écoute bienveillante</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/60 hover:text-white transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-cream-perso/30 scroll-smooth">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${
                  msg.role === 'user' 
                  ? 'bg-horizon-perso text-white rounded-br-none' 
                  : 'bg-white text-gray-700 shadow-sm border border-violet-50 rounded-bl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-2xl rounded-bl-none shadow-sm flex space-x-1">
                  <div className="h-2 w-2 bg-violet-200 rounded-full animate-bounce"></div>
                  <div className="h-2 w-2 bg-violet-200 rounded-full animate-bounce [animation-delay:-.3s]"></div>
                  <div className="h-2 w-2 bg-violet-200 rounded-full animate-bounce [animation-delay:-.5s]"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} className="h-2" />
          </div>

          <div className="p-4 bg-white border-t border-gray-100">
            <div className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Exprimez ce que vous avez sur le cœur..."
                className="w-full pl-4 pr-12 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-violet-perso outline-none text-sm"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="absolute right-2 text-violet-perso hover:scale-110 disabled:opacity-30 transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>
            <p className="text-[10px] text-gray-400 mt-2 text-center">
              Espace de parole libre • IA de soutien mémoriel
            </p>
          </div>
        </div>
      )}
    </>
  );
}
