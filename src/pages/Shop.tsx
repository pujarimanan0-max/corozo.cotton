import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, SlidersHorizontal, Sparkles, X, ChevronDown } from 'lucide-react';
import { products, Product } from '../data/products';
import ProductCard from '../components/ProductCard';
import { getAISearchResults } from '../services/geminiService';

export default function Shop() {
  const [searchQuery, setSearchQuery] = useState("");
  const [aiSearchResults, setAiSearchResults] = useState<Product[] | null>(null);
  const [isAiSearching, setIsAiSearching] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    category: [] as string[],
    occasion: [] as string[],
    price: 50000,
  });
  const [sortBy, setSortBy] = useState("newest");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const categories = ["Indo-Western Men", "Indo-Western Women", "Ethnic Kurtas", "Festive Wear"];
  const occasions = ["Casual", "Festive", "Wedding", "Office Ethnic"];

  const filteredProducts = useMemo(() => {
    let list = aiSearchResults || products;

    if (activeFilters.category.length > 0) {
      list = list.filter(p => activeFilters.category.includes(p.category));
    }
    
    list = list.filter(p => p.price <= activeFilters.price);

    // Sorting
    if (sortBy === "price-low") list = [...list].sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") list = [...list].sort((a, b) => b.price - a.price);

    return list;
  }, [aiSearchResults, activeFilters, sortBy]);

  const handleAiSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) {
      setAiSearchResults(null);
      return;
    }
    setIsAiSearching(true);
    try {
      const results = await getAISearchResults(searchQuery);
      setAiSearchResults(results);
    } catch (e) {
      console.error(e);
    } finally {
      setIsAiSearching(false);
    }
  };

  const toggleFilter = (type: 'category' | 'occasion', value: string) => {
    setActiveFilters(prev => {
      const current = prev[type];
      const next = current.includes(value) 
        ? current.filter(i => i !== value) 
        : [...current, value];
      return { ...prev, [type]: next };
    });
  };

  return (
    <div className="bg-ivory min-h-screen">
      {/* Header */}
      <div className="bg-white border-b py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-xs text-forest/40 uppercase tracking-widest mb-4">
            <span>Home</span> <span>/</span> <span>Shop</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <h1 className="text-4xl md:text-5xl tracking-tighter">Collection</h1>
            
            {/* AI Search Bar */}
            <form onSubmit={handleAiSearch} className="relative w-full md:max-w-md">
              <div className="flex items-center bg-ivory border-b border-gold/30 focus-within:border-gold transition-all">
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ask our AI Stylist (e.g. 'burgundy kurtas under ₹5000')"
                  className="w-full py-3 bg-transparent outline-none text-sm placeholder:italic"
                />
                <button type="submit" className="p-2 text-gold">
                  {isAiSearching ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
                       <Sparkles className="w-5 h-5" />
                    </motion.div>
                  ) : <Search className="w-5 h-5" />}
                </button>
              </div>
              {aiSearchResults && (
                <button 
                  onClick={() => {setAiSearchResults(null); setSearchQuery("");}}
                  className="absolute -bottom-6 right-0 text-[10px] text-gold font-bold uppercase tracking-widest"
                >
                  Clear Results
                </button>
              )}
            </form>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar - Desktop */}
          <aside className="hidden lg:block w-64 space-y-12">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-6">Categories</h4>
              <div className="space-y-3">
                {categories.map(cat => (
                  <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      className="accent-gold h-4 w-4" 
                      checked={activeFilters.category.includes(cat)}
                      onChange={() => toggleFilter('category', cat)}
                    />
                    <span className="text-sm text-forest/70 group-hover:text-forest transition-colors">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-6">Price Range</h4>
              <input 
                type="range" 
                min="1000" 
                max="50000" 
                step="1000"
                value={activeFilters.price}
                onChange={(e) => setActiveFilters(prev => ({ ...prev, price: parseInt(e.target.value) }))}
                className="w-full accent-gold bg-transparent h-1.5 rounded-lg appearance-none cursor-pointer border border-gold/10"
              />
              <div className="flex justify-between mt-2 text-[10px] uppercase font-bold tracking-widest">
                <span>₹1,000</span>
                <span className="text-gold">Up to ₹{activeFilters.price.toLocaleString()}</span>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Sort & Mobile Filter Toggle */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setShowMobileFilters(true)}
                  className="lg:hidden flex items-center gap-2 text-xs font-bold uppercase tracking-widest border border-forest/10 px-4 py-2"
                >
                  <SlidersHorizontal className="w-4 h-4" /> Filters
                </button>
                <div className="text-[10px] uppercase tracking-widest text-forest/40">
                  Showing {filteredProducts.length} Products
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-widest text-forest/40">Sort By:</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-xs font-bold uppercase tracking-widest outline-none cursor-pointer"
                >
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="best-selling">Best Selling</option>
                </select>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-12">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </AnimatePresence>
            </div>

            {filteredProducts.length === 0 && (
              <div className="py-32 text-center">
                 <h3 className="text-2xl font-serif mb-4">No results found</h3>
                 <p className="text-sm text-forest/60 max-w-sm mx-auto mb-8">
                   Try adjusting your filters or asking our AI Stylist for something else.
                 </p>
                 <button onClick={() => {setActiveFilters({category: [], occasion: [], price: 50000}); setAiSearchResults(null);}} className="text-xs font-bold uppercase tracking-widest border-b border-gold pb-1 text-gold">
                   Reset All
                 </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Overlay */}
      <AnimatePresence>
        {showMobileFilters && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-forest/60 lg:hidden"
            onClick={() => setShowMobileFilters(false)}
          >
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="absolute right-0 top-0 bottom-0 w-80 bg-ivory p-8 overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-12">
                <h3 className="text-xl font-serif">Filters</h3>
                <button onClick={() => setShowMobileFilters(false)}><X className="w-6 h-6" /></button>
              </div>
              
              {/* Reuse Filter Logic for Mobile */}
              <div className="space-y-12">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-6">Categories</h4>
                  <div className="space-y-4">
                    {categories.map(cat => (
                      <label key={cat} className="flex justify-between items-center w-full cursor-pointer">
                        <span className="text-sm">{cat}</span>
                        <input 
                          type="checkbox" 
                          className="accent-gold h-4 w-4"
                          checked={activeFilters.category.includes(cat)}
                          onChange={() => toggleFilter('category', cat)}
                        />
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                   <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-6">Price Range</h4>
                   <input 
                      type="range" 
                      min="1000" 
                      max="50000" 
                      step="1000"
                      value={activeFilters.price}
                      onChange={(e) => setActiveFilters(prev => ({ ...prev, price: parseInt(e.target.value) }))}
                      className="w-full accent-gold h-1.5"
                    />
                    <div className="flex justify-between mt-2 text-[10px] font-bold">
                       <span>₹1,000</span>
                       <span>₹{activeFilters.price.toLocaleString()}</span>
                    </div>
                </div>

                <button 
                  onClick={() => setShowMobileFilters(false)}
                  className="w-full bg-forest text-ivory py-4 uppercase tracking-widest text-[10px] font-bold"
                >
                  View Products
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
