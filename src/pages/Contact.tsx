import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MessageCircle, MapPin, Send, Sparkles, X, ChevronDown, Clock, Search } from 'lucide-react';
import { getChatResponse } from '../services/geminiService';

export default function Contact() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<{role: 'user'|'model', text: string}[]>([
    { role: 'model', text: "Namaste! I'm COROZO's Virtual Fashion Assistant. How can I help you today?" }
  ]);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSendMessage = async () => {
    if (!chatInput) return;
    const userMsg = chatInput;
    setChatInput("");
    setChatMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsChatLoading(true);

    try {
      const history = chatMessages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));
      const response = await getChatResponse(userMsg, history);
      setChatMessages(prev => [...prev, { role: 'model', text: response || "I'm having trouble connecting to our stylists. Can I help you with anything else?" }]);
    } catch (e) {
      console.error(e);
    } finally {
      setIsChatLoading(false);
    }
  };

  const faqs = [
    { q: "How long does delivery take?", a: "Most orders are delivered within 3-5 business days across India. International orders take 7-10 days." },
    { q: "Do you offer customization?", a: "Yes, we offer alterations and minor customizations for many styles. Please WhatsApp us for specific requests." },
    { q: "Is COD available?", a: "Cash on Delivery is available for all orders within India up to ₹10,000." },
    { q: "What is your return policy?", a: "We offer a 7-day hassle-free return policy for unworn items with original tags." },
    { q: "How do I track my order?", a: "Once dispatched, you'll receive a tracking link via WhatsApp and Email. You can also track it in this portal." }
  ];

  return (
    <div className="bg-ivory pb-32">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          {/* Contact Info */}
          <div className="space-y-12">
            <div className="space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-gold">Connect</span>
              <h1 className="text-5xl md:text-7xl tracking-tighter">Reach the Atelier</h1>
              <p className="text-sm text-forest/60 italic leading-relaxed max-w-sm">
                Inquiry about an order, a customization request, or simply sharing the love—we're here.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-forest/5 rounded-full flex items-center justify-center text-gold">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-forest/40">Email</p>
                    <p className="text-sm font-medium">concierge@corozo.in</p>
                  </div>
               </div>
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-forest/5 rounded-full flex items-center justify-center text-gold">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-forest/40">Phone</p>
                    <p className="text-sm font-medium">+91 9900 8821 00</p>
                  </div>
               </div>
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center text-gold">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-forest/40">WhatsApp</p>
                    <p className="text-sm font-medium">Quick Support 24/7</p>
                  </div>
               </div>
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-forest/5 rounded-full flex items-center justify-center text-gold">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-forest/40">Response Time</p>
                    <p className="text-sm font-medium">Within 1-2 Hours</p>
                  </div>
               </div>
            </div>

            {/* Tracking Widget */}
            <div className="bg-forest text-ivory p-8 shadow-2xl shadow-forest/20">
               <h3 className="text-xl font-serif mb-6 flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gold" /> Track Your Style
               </h3>
               <div className="flex gap-2">
                  <input type="text" placeholder="CRZ-2026-XXXX" className="flex-1 bg-white/10 border border-white/20 p-3 outline-none focus:border-gold text-sm" />
                  <button className="bg-gold text-ivory px-6 py-3 font-bold text-[10px] uppercase tracking-widest">Track</button>
               </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 md:p-12 border border-forest/5 shadow-xl shadow-forest/5">
             <h2 className="text-3xl font-serif mb-8">Send a Message</h2>
             <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-forest/40">Full Name</label>
                    <input type="text" className="w-full p-4 bg-ivory border border-forest/10 outline-none focus:border-gold text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-forest/40">Email Address</label>
                    <input type="email" className="w-full p-4 bg-ivory border border-forest/10 outline-none focus:border-gold text-sm" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-forest/40">Order Number (Optional)</label>
                  <input type="text" className="w-full p-4 bg-ivory border border-forest/10 outline-none focus:border-gold text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-forest/40">Subject</label>
                  <select className="w-full p-4 bg-ivory border border-forest/10 outline-none focus:border-gold text-sm appearance-none">
                     <option>General Inquiry</option>
                     <option>Customization Request</option>
                     <option>Shipping Concern</option>
                     <option>Return/Exchange</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-forest/40">Message</label>
                  <textarea rows={5} className="w-full p-4 bg-ivory border border-forest/10 outline-none focus:border-gold text-sm" />
                </div>
                <button type="submit" className="w-full bg-forest text-gold py-5 font-bold uppercase text-[10px] tracking-[0.2em] hover:bg-gold hover:text-ivory transition-all shadow-xl shadow-gold/5 flex items-center justify-center gap-2">
                   Send Message <Send className="w-4 h-4" />
                </button>
             </form>
          </div>
        </div>

        {/* FAQs */}
        <div className="mt-40 space-y-20">
           <div className="text-center">
             <h2 className="text-4xl font-serif">Frequently Asked Questions</h2>
             <div className="w-12 h-[1px] bg-gold mx-auto mt-6" />
           </div>
           <div className="max-w-3xl mx-auto divide-y border-y">
              {faqs.map((faq, i) => (
                <div key={i} className="py-8">
                   <button 
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                    className="w-full flex justify-between items-center text-left"
                   >
                     <span className="text-sm font-bold uppercase tracking-widest">{faq.q}</span>
                     <ChevronDown className={`w-5 h-5 transition-transform ${activeFaq === i ? 'rotate-180' : ''}`} />
                   </button>
                   <AnimatePresence>
                      {activeFaq === i && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="text-sm text-forest/60 italic pt-6 leading-relaxed">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                   </AnimatePresence>
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* Floating Chat Bubble */}
      <button 
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-24 right-6 z-50 bg-gold text-ivory p-4 rounded-full shadow-2xl hover:scale-110 transition-transform"
      >
        <Sparkles className="w-6 h-6" />
      </button>

      {/* AI Chat Drawer */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 w-[90vw] md:w-96 h-[500px] bg-white z-[101] shadow-2xl overflow-hidden flex flex-col rounded-xl border border-gold/10"
          >
            {/* Chat Header */}
            <div className="bg-forest p-4 text-ivory flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-gold" />
                 </div>
                 <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest">Atelier Assistant</h4>
                    <p className="text-[8px] text-gold uppercase tracking-[0.2em]">Powered by Gemini</p>
                 </div>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="text-ivory/40 hover:text-ivory">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-ivory/30">
               {chatMessages.map((msg, i) => (
                 <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: msg.role === 'user' ? 10 : -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                 >
                    <div className={`max-w-[80%] p-3 text-xs italic ${
                      msg.role === 'user' 
                        ? 'bg-gold text-ivory rounded-l-lg rounded-tr-lg' 
                        : 'bg-white text-forest shadow-sm rounded-r-lg rounded-tl-lg'
                    }`}>
                       {msg.text}
                    </div>
                 </motion.div>
               ))}
               {isChatLoading && (
                 <div className="flex justify-start">
                    <div className="bg-white p-3 rounded-r-lg rounded-tl-lg shadow-sm">
                       <motion.div 
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="flex gap-1"
                       >
                          <div className="w-1.5 h-1.5 bg-gold rounded-full" />
                          <div className="w-1.5 h-1.5 bg-gold rounded-full transition-delay-200" />
                          <div className="w-1.5 h-1.5 bg-gold rounded-full transition-delay-400" />
                       </motion.div>
                    </div>
                 </div>
               )}
               <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-forest/5 flex gap-2">
               <input 
                 value={chatInput}
                 onChange={e => setChatInput(e.target.value)}
                 onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                 placeholder="Ask anything..." 
                 className="flex-1 text-xs outline-none bg-ivory/50 px-3 py-2"
               />
               <button 
                onClick={handleSendMessage}
                disabled={!chatInput || isChatLoading}
                className="text-gold disabled:opacity-30"
               >
                 <Send className="w-5 h-5" />
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
