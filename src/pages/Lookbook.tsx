import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, X, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';

export default function Lookbook() {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedLook, setSelectedLook] = useState<any>(null);

  const tabs = ["All", "Wedding", "Casual", "Festival", "Office Ethnic"];
  
  const looks = [
    { 
      id: 1, 
      name: "The Marigold Edit", 
      img: "https://images.unsplash.com/photo-1598533036066-511ce5f0535a?q=80&w=800",
      tag: "Wedding",
      description: "A celebration of sun-drenched hues and intricate gold accents.",
      items: [products[0], products[1]]
    },
    { 
      id: 2, 
      name: "Forest Whisper", 
      img: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?q=80&w=800",
      tag: "Festival",
      description: "Deep greens meet fluid silks for a contemporary festive statement.",
      items: [products[2], products[4]]
    },
    { 
      id: 3, 
      name: "Ivory Minimalism", 
      img: "https://images.unsplash.com/photo-1624372927054-0373809631fc?q=80&w=800",
      tag: "Casual",
      description: "The purity of ivory in organic cotton hand-block prints.",
      items: [products[3]]
    },
    { 
      id: 4, 
      name: "Velvet Nights", 
      img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800",
      tag: "Festival",
      description: "Rich textures and sharp tailoring for winter celebrations.",
      items: [products[5]]
    }
  ];

  const filteredLooks = activeTab === "All" ? looks : looks.filter(l => l.tag === activeTab);

  return (
    <div className="bg-ivory pb-32">
      {/* Campaign Hero */}
      <section className="h-[80vh] relative overflow-hidden flex items-center justify-center">
        <img 
          src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1920" 
          className="absolute inset-0 w-full h-full object-cover scale-105" 
          alt="Campaign Hero"
        />
        <div className="absolute inset-0 bg-forest/20" />
        <div className="relative text-center px-4">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-ivory text-xs uppercase tracking-[0.5em] font-bold mb-4"
          >
            Festive 2026
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-ivory text-6xl md:text-9xl tracking-tighter"
          >
            The Marigold Edit
          </motion.h1>
        </div>
      </section>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-12 mb-20 flex justify-center overflow-x-auto no-scrollbar gap-8">
        {tabs.map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-[10px] font-bold uppercase tracking-widest pb-2 transition-all border-b-2 whitespace-nowrap ${
              activeTab === tab ? 'border-gold text-forest' : 'border-transparent text-forest/40 hover:text-forest'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Look Grid */}
      <section className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
          {filteredLooks.map((look, i) => (
            <motion.div 
              key={look.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
              onClick={() => setSelectedLook(look)}
            >
              <div className="aspect-[4/5] overflow-hidden bg-forest/5 mb-8 relative">
                 <img src={look.img} className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105" />
                 <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                       <Plus className="w-6 h-6 text-forest" />
                    </div>
                 </div>
              </div>
              <div className="flex justify-between items-baseline border-b border-forest/10 pb-4">
                 <h3 className="text-2xl font-serif italic">{look.name}</h3>
                 <span className="text-[10px] uppercase tracking-widest font-bold text-gold">{look.tag}</span>
              </div>
              <p className="text-xs text-forest/60 italic pt-4 leading-relaxed">{look.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Style Editorial Section */}
      <section className="mt-40 bg-gold/5 py-32 px-4">
        <div className="max-w-2xl mx-auto text-center space-y-8">
           <h2 className="text-4xl font-serif">A Note on Style</h2>
           <div className="text-sm text-forest/70 leading-relaxed space-y-6 italic">
              <p>
                The art of Indo-Western dressing lies in the harmony of balance. Pair crisp tailored sherwanis with fluid georgette dupattas for a silhouette that commands attention yet feels effortless.
              </p>
              <p>
                In 2026, we see a shift towards organic textures—raw silk, hand-woven chanderi, and breathable linens—styled with antique gold accessories that carry the patina of time.
              </p>
              <p>
                Remember, heritage is not a constraint, but a playground. Wear it with edge.
              </p>
           </div>
        </div>
      </section>

      {/* Instagram Wall Teaser */}
      <section className="mt-32 max-w-7xl mx-auto px-4 md:px-8 text-center">
         <h2 className="text-xs uppercase font-bold tracking-[0.4em] text-gold mb-12">#WearCorozo</h2>
         <div className="grid grid-cols-3 md:grid-cols-6 gap-2 opacity-60">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="aspect-square bg-forest/5 overflow-hidden">
                <img src={`https://images.unsplash.com/photo-${1500000000000 + i * 1000}?q=80&w=400`} className="w-full h-full object-cover" />
              </div>
            ))}
         </div>
      </section>

      {/* Look Modal */}
      <AnimatePresence>
        {selectedLook && (
          <div 
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-forest/80 backdrop-blur-sm"
            onClick={() => setSelectedLook(null)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={e => e.stopPropagation()}
              className="bg-ivory w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8 rounded shadow-2xl relative custom-scrollbar"
            >
               <button onClick={() => setSelectedLook(null)} className="absolute top-4 right-4 text-forest/40"><X className="w-6 h-6" /></button>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="aspect-[3/4] overflow-hidden">
                     <img src={selectedLook.img} className="w-full h-full object-cover" />
                  </div>
                  <div className="space-y-12">
                     <div>
                        <h3 className="text-3xl font-serif mb-4 italic">{selectedLook.name}</h3>
                        <p className="text-sm text-forest/60 italic leading-relaxed">{selectedLook.description}</p>
                     </div>
                     
                     <div className="space-y-6">
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-gold border-b border-gold/20 pb-2">Shop the look</h4>
                        <div className="space-y-8">
                           {selectedLook.items.map((item: any) => (
                             <div key={item.id} className="flex gap-6 group">
                                <div className="w-20 aspect-[3/4] overflow-hidden bg-white">
                                   <img src={item.images[0]} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 space-y-1">
                                   <p className="text-sm font-medium">{item.name}</p>
                                   <p className="text-xs font-bold text-gold">₹{item.price.toLocaleString()}</p>
                                   <Link to={`/product/${item.id}`} className="inline-block text-[10px] uppercase font-bold tracking-widest border-b border-forest/10 hover:border-gold transition-colors pt-2">View Style</Link>
                                </div>
                                <button className="p-3 bg-forest text-ivory flex items-center justify-center h-fit hover:bg-gold transition-colors">
                                   <ShoppingBag className="w-4 h-4" />
                                </button>
                             </div>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
