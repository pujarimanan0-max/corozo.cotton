import { useState } from 'react';
import { motion } from 'motion/react';
import { Droplet, Wind, Shield, HelpCircle, Sparkles } from 'lucide-react';
import { recommendSize } from '../services/geminiService';

export default function Care() {
  const [activeTab, setActiveTab] = useState("Sizing");
  
  // AI Size Assistant State
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [aiSizeRec, setAiSizeRec] = useState<{size: string, confidence: string} | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const handleAiSize = async () => {
    if (!height || !weight) return;
    setIsAiLoading(true);
    try {
      const rec = await recommendSize(parseInt(height), parseInt(weight), "Average");
      setAiSizeRec(rec);
    } catch (e) {
      console.error(e);
    } finally {
      setIsAiLoading(false);
    }
  };

  const fabricCare = [
    { name: "Silk & Blends", icon: <Shield className="w-5 h-5" />, list: ["Dry clean only", "Iron inside out on silk setting", "Store in a breathable fabric bag"] },
    { name: "Hand-Block Cotton", icon: <Droplet className="w-5 h-5" />, list: ["Hand wash in cold water", "Mild liquid detergent only", "Dry in shade to avoid fading"] },
    { name: "Velvet", icon: <Wind className="w-5 h-5" />, list: ["Dry clean recommended", "Never iron directly; use steam", "Brush with a soft-bristle brush"] }
  ];

  const sizeChart = [
    { size: "XS", chest: "86cm / 34\"", waist: "71cm / 28\"", hips: "91cm / 36\"" },
    { size: "S", chest: "91cm / 36\"", waist: "76cm / 30\"", hips: "96cm / 38\"" },
    { size: "M", chest: "96cm / 38\"", waist: "81cm / 32\"", hips: "101cm / 40\"" },
    { size: "L", chest: "101cm / 40\"", waist: "86cm / 34\"", hips: "106cm / 42\"" },
    { size: "XL", chest: "106cm / 42\"", waist: "91cm / 36\"", hips: "111cm / 44\"" },
    { size: "2XL", chest: "111cm / 44\"", waist: "96cm / 38\"", hips: "116cm / 46\"" }
  ];

  return (
    <div className="bg-ivory pb-32 pt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h1 className="text-5xl md:text-7xl tracking-tighter mb-16 text-center">Care & Sizing</h1>
        
        <div className="flex justify-center gap-12 mb-20 border-b border-forest/5">
           {["Sizing", "Fabric Care", "Returns"].map(tab => (
             <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-[10px] font-bold uppercase tracking-widest pb-4 transition-all border-b-2 ${
                activeTab === tab ? 'border-gold text-forest' : 'border-transparent text-forest/40 hover:text-forest'
              }`}
             >
               {tab}
             </button>
           ))}
        </div>

        {activeTab === "Sizing" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-24">
            {/* AI Assistant */}
            <div className="bg-forest text-ivory p-8 md:p-16 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                 <div className="flex items-center gap-2 text-gold mb-6">
                    <Sparkles className="w-5 h-5" />
                    <span className="text-xs uppercase font-bold tracking-widest">AI Size Intelligence</span>
                 </div>
                 <h2 className="text-3xl md:text-5xl tracking-tighter mb-8 leading-tight">Find your perfect fit in seconds.</h2>
                 <p className="text-sm text-ivory/60 italic leading-relaxed max-w-sm mb-12">
                   Skip the measurements. Our AI uses global data points to recommend the size that will feel bespoke to you.
                 </p>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                       <label className="text-[10px] uppercase tracking-widest font-bold">Height (cm)</label>
                       <input value={height} onChange={e => setHeight(e.target.value)} type="number" placeholder="170" className="w-full bg-ivory/10 border border-ivory/20 p-4 outline-none focus:border-gold" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] uppercase tracking-widest font-bold">Weight (kg)</label>
                       <input value={weight} onChange={e => setWeight(e.target.value)} type="number" placeholder="65" className="w-full bg-ivory/10 border border-ivory/20 p-4 outline-none focus:border-gold" />
                    </div>
                 </div>
                 <button 
                  onClick={handleAiSize}
                  disabled={isAiLoading || !height || !weight}
                  className="w-full bg-gold text-ivory py-4 uppercase font-bold text-[10px] tracking-widest mt-6 hover:bg-white hover:text-forest transition-colors"
                 >
                   {isAiLoading ? "Processing..." : "Find My Size"}
                 </button>

                 {aiSizeRec && (
                   <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 pt-8 border-t border-ivory/10">
                      <p className="text-[10px] uppercase tracking-widest text-ivory/40">We recommend</p>
                      <h4 className="text-4xl font-serif text-gold">Size {aiSizeRec.size}</h4>
                      <p className="text-[10px] italic text-ivory/60 mt-1">Confidence rating: {aiSizeRec.confidence}</p>
                   </motion.div>
                 )}
              </div>
              <div className="hidden md:block">
                 <img src="https://images.unsplash.com/photo-1598533036066-511ce5f0535a?q=80&w=800" className="w-full aspect-[3/4] object-cover grayscale opacity-50" />
              </div>
            </div>

            {/* Size Table */}
            <div>
              <h3 className="text-xl font-serif text-center mb-12">Detailed Measurements</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-forest text-ivory">
                      <th className="p-4 text-left font-serif uppercase tracking-widest text-[10px]">Size</th>
                      <th className="p-4 text-left font-serif uppercase tracking-widest text-[10px]">Chest</th>
                      <th className="p-4 text-left font-serif uppercase tracking-widest text-[10px]">Waist</th>
                      <th className="p-4 text-left font-serif uppercase tracking-widest text-[10px]">Hips</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sizeChart.map((row, i) => (
                      <tr key={i} className="border-b border-forest/10 hover:bg-forest/5 transition-colors">
                        <td className="p-4 font-bold text-gold">{row.size}</td>
                        <td className="p-4 text-forest/60 italic">{row.chest}</td>
                        <td className="p-4 text-forest/60 italic">{row.waist}</td>
                        <td className="p-4 text-forest/60 italic">{row.hips}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "Fabric Care" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-3 gap-12">
             {fabricCare.map((item, i) => (
               <div key={i} className="bg-white p-12 border border-forest/5 shadow-xl shadow-forest/5 text-center space-y-6">
                  <div className="w-16 h-16 bg-gold/10 text-gold rounded-full flex items-center justify-center mx-auto">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-serif italic">{item.name}</h3>
                  <ul className="text-xs text-forest/60 space-y-3 italic">
                    {item.list.map((l, idx) => <li key={idx}>— {l}</li>)}
                  </ul>
               </div>
             ))}
          </motion.div>
        )}

        {activeTab === "Returns" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto space-y-12">
            <div className="bg-white p-12 border border-forest/5 italic text-sm leading-relaxed text-forest/70 space-y-6">
               <p>We take pride in our artisan-crafted pieces. However, if you're not entirely satisfied, we offer a hassle-free 7-day return policy.</p>
               <div className="space-y-4">
                  <p className="font-bold text-forest">Standard Returns:</p>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>Initiate a return request within 7 days of delivery.</li>
                    <li>Ensure the garment is unworn with original tags intact.</li>
                    <li>We will schedule a reverse pickup from your address.</li>
                    <li>Refund will be processed to your original payment method.</li>
                  </ol>
               </div>
               <p className="text-[10px] uppercase font-bold tracking-widest text-gold">* Custom orders and final sale items are not eligible for returns.</p>
            </div>
            <div className="flex items-center gap-4 bg-forest text-ivory p-6">
               <HelpCircle className="w-5 h-5 text-gold" />
               <p className="text-[10px] uppercase font-bold tracking-widest">Need help with a return? WhatsApp us for instant support.</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
