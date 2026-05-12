import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Star, Share2, Ruler, ShieldCheck, Truck, RotateCcw, Plus, Minus, Sparkles, MessageSquare, X } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { recommendSize } from '../services/geminiService';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);

  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState<string | null>("description");

  // AI Size Assistant State
  const [showSizeAssistant, setShowSizeAssistant] = useState(false);
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bodyType, setBodyType] = useState("Average");
  const [aiSizeRec, setAiSizeRec] = useState<{size: string, confidence: string} | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  if (!product) return <div className="py-32 text-center font-serif text-2xl">Style not found</div>;

  const handleSizeAssistant = async () => {
    if (!height || !weight) return;
    setIsAiLoading(true);
    try {
      const rec = await recommendSize(parseInt(height), parseInt(weight), bodyType);
      setAiSizeRec(rec);
      setSelectedSize(rec.size);
    } catch (e) {
      console.error(e);
    } finally {
      setIsAiLoading(false);
    }
  };

  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="bg-ivory pt-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[10px] text-forest/40 uppercase tracking-widest mb-12">
          <Link to="/">Home</Link> <span>/</span> <Link to="/shop">Shop</Link> <span>/</span> <span className="text-forest">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Gallery */}
          <div className="space-y-6">
            <div className="aspect-[3/4] overflow-hidden bg-white relative">
               <motion.img 
                  key={activeImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  src={product.images[activeImage]} 
                  className="w-full h-full object-cover"
                />
                <button className="absolute top-6 right-6 p-3 bg-white/80 rounded-full hover:bg-white transition-colors">
                  <Share2 className="w-5 h-5 text-forest" />
                </button>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
               {product.images.map((img, idx) => (
                 <button 
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`flex-shrink-0 w-24 aspect-[3/4] border-2 transition-all ${activeImage === idx ? 'border-gold' : 'border-transparent'}`}
                 >
                   <img src={img} className="w-full h-full object-cover" />
                 </button>
               ))}
            </div>
          </div>

          {/* Right: Info */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1 text-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-gold' : 'text-gold/30'}`} />
                  ))}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-forest/40">({product.reviewCount} Reviews)</span>
              </div>
              <h1 className="text-4xl md:text-5xl tracking-tighter mb-4 leading-tight">{product.name}</h1>
              <div className="flex items-center gap-4 mb-2">
                <span className="text-2xl font-bold text-forest">₹{product.price.toLocaleString()}</span>
                {product.mrp > product.price && (
                  <span className="text-lg text-forest/30 line-through">₹{product.mrp.toLocaleString()}</span>
                )}
              </div>
              <p className="text-[10px] text-green-700 font-bold uppercase tracking-widest">In stock & ready to ship</p>
            </div>

            <p className="text-sm text-forest/70 leading-relaxed border-l-2 border-gold/20 pl-4 py-1 italic">
              {product.description}
            </p>

            {/* Size & AI Assistant */}
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <label className="text-[10px] font-bold uppercase tracking-widest border-b border-forest/10 pb-1">Select Size</label>
                <button 
                  onClick={() => setShowSizeAssistant(true)}
                  className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-gold hover:text-forest transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" /> AI Size Assistant
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map(size => (
                  <button 
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 flex items-center justify-center text-xs font-bold transition-all border ${
                      selectedSize === size ? 'bg-forest text-ivory border-forest' : 'hover:border-forest border-forest/10'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & CTA */}
            <div className="space-y-6 pt-4">
              <div className="flex items-center gap-6">
                <div className="flex items-center border border-forest/10 px-4 py-2 bg-white">
                  <button onClick={() => setQuantity(q => Math.max(1, q-1))}><Minus className="w-4 h-4" /></button>
                  <span className="w-12 text-center text-sm font-bold">{quantity}</span>
                  <button onClick={() => setQuantity(q => q+1)}><Plus className="w-4 h-4" /></button>
                </div>
                <div className="text-[10px] text-forest/40 uppercase tracking-widest font-bold">18 people are viewing this right now</div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 bg-forest text-ivory py-4 uppercase tracking-widest text-[10px] font-bold hover:bg-gold transition-colors">
                  Add to Bag
                </button>
                <button className="flex-1 bg-gold text-ivory py-4 uppercase tracking-widest text-[10px] font-bold hover:bg-forest transition-colors shadow-lg shadow-gold/20">
                  Buy It Now
                </button>
                <button className="p-4 border border-forest/10 hover:border-gold transition-colors flex items-center justify-center rounded">
                  <Heart className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-8 border-y border-forest/5">
              <div className="text-center space-y-2">
                <Truck className="w-5 h-5 mx-auto text-gold" />
                <p className="text-[8px] uppercase tracking-widest font-bold">Free Shipping</p>
              </div>
              <div className="text-center space-y-2">
                <RotateCcw className="w-5 h-5 mx-auto text-gold" />
                <p className="text-[8px] uppercase tracking-widest font-bold">7-Day Returns</p>
              </div>
              <div className="text-center space-y-2">
                <ShieldCheck className="w-5 h-5 mx-auto text-gold" />
                <p className="text-[8px] uppercase tracking-widest font-bold">Secure Pay</p>
              </div>
              <div className="text-center space-y-2">
                <MessageSquare className="w-5 h-5 mx-auto text-gold" />
                <p className="text-[8px] uppercase tracking-widest font-bold">Authentic</p>
              </div>
            </div>

            {/* Accordions */}
            <div className="space-y-4 pt-4 text-sm">
               {[
                 { id: 'description', title: 'Fabric & Care', content: 'Premium Mulberry Silk Blend. Dry clean only. Iron inside out on low heat.' },
                 { id: 'shipping', title: 'Shipping & Returns', content: 'Dispatched within 24 hours. Delivered in 3-5 business days across India.' },
                 { id: 'styling', title: 'Styling Tips', content: 'Pair with ivory churidars and tan mojris for a classic festive look.' }
               ].map(item => (
                 <div key={item.id} className="border-b border-forest/10 pb-4">
                    <button 
                      onClick={() => setActiveAccordion(activeAccordion === item.id ? null : item.id)}
                      className="w-full flex justify-between items-center text-xs font-bold uppercase tracking-widest"
                    >
                      {item.title}
                      <Plus className={`w-4 h-4 transition-transform ${activeAccordion === item.id ? 'rotate-45' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {activeAccordion === item.id && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="text-forest/60 pt-4 leading-relaxed italic">{item.content}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                 </div>
               ))}
            </div>
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="mt-32 pb-24 border-t border-forest/5 pt-20">
          <h2 className="text-3xl font-serif mb-12">Complete the Look</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>

      {/* AI Size Assistant Modal */}
      <AnimatePresence>
        {showSizeAssistant && (
          <div 
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-forest/80 backdrop-blur-sm"
            onClick={() => setShowSizeAssistant(false)}
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="bg-ivory w-full max-w-md p-8 rounded shadow-2xl relative"
            >
               <button onClick={() => setShowSizeAssistant(false)} className="absolute top-4 right-4 text-forest/40"><X className="w-5 h-5" /></button>
               <div className="flex items-center gap-2 mb-8">
                  <Sparkles className="w-5 h-5 text-gold" />
                  <h3 className="text-xl font-serif">Find Your Perfect Fit</h3>
               </div>
               <div className="space-y-6 mb-8">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold uppercase tracking-widest text-forest/40">Height (cm)</label>
                       <input value={height} onChange={e => setHeight(e.target.value)} type="number" placeholder="175" className="w-full p-3 bg-white border border-forest/10 outline-none" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold uppercase tracking-widest text-forest/40">Weight (kg)</label>
                       <input value={weight} onChange={e => setWeight(e.target.value)} type="number" placeholder="70" className="w-full p-3 bg-white border border-forest/10 outline-none" />
                    </div>
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-bold uppercase tracking-widest text-forest/40">Body Type</label>
                     <select value={bodyType} onChange={e => setBodyType(e.target.value)} className="w-full p-3 bg-white border border-forest/10 outline-none appearance-none">
                        <option>Slim</option>
                        <option>Average</option>
                        <option>Athletic</option>
                        <option>Curvy</option>
                        <option>Fuller</option>
                     </select>
                  </div>
               </div>

               <button 
                  onClick={handleSizeAssistant}
                  disabled={isAiLoading || !height || !weight}
                  className={`w-full py-4 text-[10px] font-bold uppercase tracking-widest transition-all ${
                    isAiLoading ? 'bg-gold/40 text-white cursor-not-allowed' : 'bg-gold text-white hover:bg-forest'
                  }`}
               >
                  {isAiLoading ? "Calculating..." : "Find My Size"}
               </button>

               {aiSizeRec && (
                 <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-8 p-6 bg-forest text-ivory text-center"
                 >
                    <p className="text-[10px] uppercase tracking-[0.2em] mb-2 text-ivory/60">Recommended Size</p>
                    <h4 className="text-5xl font-serif mb-2">{aiSizeRec.size}</h4>
                    <p className="text-[10px] uppercase tracking-widest text-gold font-bold">Confidence: {aiSizeRec.confidence}</p>
                    <button 
                      onClick={() => setShowSizeAssistant(false)}
                      className="mt-6 text-[10px] uppercase tracking-widest border-b border-ivory/20 pb-1 hover:border-gold transition-colors"
                    >
                      Select & Continue
                    </button>
                 </motion.div>
               )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
