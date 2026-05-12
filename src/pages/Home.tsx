import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Sparkles, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { getStylingAdvice } from '../services/geminiService';

export default function Home() {
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiAdvice, setAiAdvice] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [showAiModal, setShowAiModal] = useState(false);
  const [showNewsletter, setShowNewsletter] = useState(false);

  const handleAiStylist = async () => {
    if (!aiPrompt) return;
    setIsAiLoading(true);
    try {
      const advice = await getStylingAdvice(aiPrompt);
      setAiAdvice(advice || "Our stylists are currently busy, but we recommend our Silk Sherwanis for a classic look!");
    } catch (e) {
      setAiAdvice("Something went wrong. Try imagining a forest green coord set!");
    } finally {
      setIsAiLoading(false);
    }
  };

  const categories = [
    { name: "Indo-Western Men", img: "https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?q=80&w=800", path: "/shop?cat=men" },
    { name: "Indo-Western Women", img: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?q=80&w=800", path: "/shop?cat=women" },
    { name: "Ethnic Kurtas", img: "https://images.unsplash.com/photo-1624372927054-0373809631fc?q=80&w=800", path: "/shop?cat=kurta" },
    { name: "Festive Wear", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800", path: "/shop?cat=festive" },
  ];

  return (
    <div className="overflow-x-hidden bg-ivory">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex flex-col md:flex-row border-b border-border-subtle overflow-hidden">
        <div className="flex-1 p-8 md:p-16 flex flex-col justify-center">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-[#E9F1EE] border border-forest px-3 py-1 rounded-full text-[10px] font-bold text-forest mb-6 w-fit uppercase tracking-tighter"
          >
            <Sparkles className="w-3 h-3 text-forest" />
            Gemini AI Style Assistant
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl lg:text-8xl leading-tight mb-6 tracking-tighter text-forest"
          >
            Where Heritage <br /> Meets Edge
          </motion.h1>
          <p className="text-sm md:text-base text-muted mb-10 max-w-sm leading-relaxed">
            Discover our Festive 2026 collection: A dialogue between ancestral craftsmanship and modern silhouettes.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/shop" className="bg-forest text-ivory px-10 py-4 text-[11px] uppercase tracking-[0.2em] font-bold hover:opacity-90 transition-all">
              Shop Now
            </Link>
            <Link to="/lookbook" className="border border-gold text-gold px-10 py-4 text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-gold hover:text-ivory transition-all">
              Explore Lookbook
            </Link>
          </div>
        </div>
        <div className="flex-[1.2] bg-[#E8E5D8] relative overflow-hidden hidden md:block">
           <img 
            src="https://images.unsplash.com/photo-1598533036066-511ce5f0535a?q=80&w=1200" 
            className="absolute inset-0 w-full h-full object-cover grayscale opacity-30 mix-blend-multiply" 
           />
           <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-[12vw] font-serif text-forest/5 select-none tracking-tighter uppercase">Editorial</span>
           </div>
           <div className="absolute bottom-[-10%] right-[-10%] font-serif text-[200px] text-forest/5 leading-none select-none pointer-events-none rotate-12">
             ❦
           </div>
        </div>
      </section>

      {/* Grid Categories */}
      <section className="grid grid-cols-1 md:grid-cols-4 border-b border-border-subtle">
        {categories.map((cat, i) => (
          <Link 
            key={cat.name} 
            to={cat.path}
            className={`group p-8 md:p-10 border-b md:border-b-0 md:border-r border-border-subtle transition-colors hover:bg-gold/5 flex flex-col min-h-[300px]`}
          >
            <div className="aspect-[4/5] bg-[#E8E5D8] mb-8 overflow-hidden">
               <img src={cat.img} className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105" />
            </div>
            <div className="mt-auto">
               <p className="text-[10px] uppercase tracking-[0.3em] text-muted mb-2">{cat.name.split(' ').slice(0, 1).join(' ')} Edit</p>
               <h3 className="text-2xl font-serif mb-1 group-hover:text-gold transition-colors">{cat.name}</h3>
               <p className="text-[10px] font-bold text-gold uppercase tracking-widest mt-2">Explore <span>→</span></p>
            </div>
          </Link>
        ))}
      </section>

      {/* Bestsellers */}
      <section className="py-32 bg-ivory">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-baseline gap-6 mb-16">
            <div>
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-gold">The Collection</span>
              <h2 className="text-4xl md:text-6xl tracking-tighter mt-4 text-forest">The Atelier Bestsellers</h2>
            </div>
            <Link to="/shop" className="text-[11px] font-bold uppercase tracking-widest border-b border-gold/40 pb-1 hover:text-gold transition-colors">
              View Entire Boutique
            </Link>
          </div>
          
          <div className="flex overflow-x-auto gap-10 pb-12 custom-scrollbar scroll-smooth no-scrollbar">
            {products.slice(0, 6).map((p) => (
              <div key={p.id} className="min-w-[320px]">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Intervention Strip */}
      <section className="bg-forest text-ivory py-24 relative overflow-hidden">
         <div className="absolute top-0 right-0 p-20 font-serif text-[150px] text-ivory/5 select-none pointer-events-none">
           ✧
         </div>
         <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-xl">
               <div className="text-[10px] uppercase tracking-[0.4em] text-gold mb-4 font-bold">AI Concierge</div>
               <h2 className="text-4xl md:text-5xl tracking-tighter mb-6 font-serif">Not sure where to start?</h2>
               <p className="text-sm md:text-base opacity-70 leading-relaxed max-w-sm italic">
                 Invite Gemini to curate a personalized festive look based on your skin tone, occasion, and heritage preferences.
               </p>
            </div>
            <button 
              onClick={() => setShowAiModal(true)}
              className="px-12 py-5 border border-ivory/30 text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-ivory hover:text-forest transition-all"
            >
              Consult Gemini AI
            </button>
         </div>
      </section>

      {/* Brand Ethos */}
      <section className="py-40 bg-ivory text-center px-4 overflow-hidden relative border-b border-border-subtle">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] text-gold/5 font-serif select-none pointer-events-none whitespace-nowrap uppercase tracking-tighter">
           Atelier Corozo
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10"
        >
          <span className="text-[10px] uppercase tracking-[0.5em] text-gold font-bold block mb-10">Our Philosophy</span>
          <h2 className="text-4xl md:text-7xl font-serif max-w-5xl mx-auto leading-[1.1] tracking-tighter text-forest italic">
            "Crafted at the intersection <br /> of heritage and modernity."
          </h2>
          <div className="w-16 h-[1px] bg-gold mx-auto mt-16" />
        </motion.div>
      </section>

      {/* Modern Newsletter */}
      <section className="py-32 bg-ivory">
         <div className="max-w-3xl mx-auto px-6 text-center">
            <h3 className="text-2xl font-serif italic mb-8">Join the Inner Circle</h3>
            <p className="text-muted text-sm mb-12 italic leading-relaxed">Early access to new edits, behind-the-scenes at the atelier, and artisanal stories delivered to your inbox.</p>
            <div className="flex flex-col sm:flex-row gap-4">
               <input type="email" placeholder="Email Address" className="flex-1 bg-white border border-border-subtle p-4 text-sm outline-none focus:border-gold" />
               <button className="bg-forest text-ivory px-10 py-4 text-[10px] uppercase tracking-widest font-bold">Subscribe</button>
            </div>
         </div>
      </section>

      {/* AI Modal */}
      <AnimatePresence>
        {showAiModal && (
          <div 
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-forest/80 backdrop-blur-sm"
            onClick={() => setShowAiModal(false)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-ivory w-full max-w-lg p-8 rounded shadow-2xl relative"
            >
              <button 
                onClick={() => setShowAiModal(false)}
                className="absolute top-4 right-4 text-forest/40 hover:text-forest"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-5 h-5 text-gold" />
                <h3 className="text-xl font-serif">AI Style Assistant</h3>
              </div>
              <p className="text-sm text-forest/60 mb-6">
                Tell us about the occasion you're dressing for, and our AI stylist will suggest the perfect look.
              </p>
              <textarea 
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="e.g. I need an outfit for a cocktail party in Jaipur next week..."
                className="w-full h-32 p-4 bg-white border border-gold/20 rounded-md outline-none focus:border-gold text-sm mb-4"
              />
              <button 
                onClick={handleAiStylist}
                disabled={isAiLoading || !aiPrompt}
                className={`w-full py-4 uppercase tracking-widest text-[10px] font-bold transition-all ${
                  isAiLoading ? 'bg-gold/20 text-gold/40' : 'bg-gold text-ivory hover:bg-forest'
                }`}
              >
                {isAiLoading ? "Consulting Stylists..." : "Get Advice"}
              </button>
              
              {aiAdvice && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-6 p-4 bg-gold/5 border-l-2 border-gold text-sm italic text-forest/80"
                >
                  {aiAdvice}
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
