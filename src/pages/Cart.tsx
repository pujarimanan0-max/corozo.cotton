import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Sparkles } from 'lucide-react';
import { products } from '../data/products';

export default function Cart() {
  const [cartItems, setCartItems] = useState([
    { ...products[0], quantity: 1, size: 'L' },
    { ...products[1], quantity: 2, size: 'M' }
  ]);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const freeShippingThreshold = 999;
  const shipping = subtotal > freeShippingThreshold ? 0 : 150;
  const total = subtotal + shipping;

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen pt-32 text-center px-4">
        <div className="max-w-md mx-auto">
          <ShoppingBag className="w-16 h-16 mx-auto text-forest/10 mb-8" />
          <h1 className="text-4xl tracking-tighter mb-4">Your bag is empty</h1>
          <p className="text-forest/60 text-sm mb-12">Looks like you haven't added anything yet. Discover our latest Indo-Western collection.</p>
          <Link to="/shop" className="inline-block bg-gold text-ivory px-10 py-4 font-bold uppercase tracking-widest text-[10px]">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-ivory min-h-screen py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl tracking-tighter mb-12 text-center">Your Bag</h1>
        
        <div className="flex flex-col xl:flex-row gap-16">
          {/* Cart Items */}
          <div className="flex-1 space-y-8">
            <div className="bg-gold/5 p-4 flex items-center justify-between">
               <p className="text-[10px] uppercase font-bold tracking-widest">
                  {subtotal >= freeShippingThreshold 
                    ? "Congratulations! You qualify for Free Shipping." 
                    : `Add ₹${(freeShippingThreshold - subtotal).toLocaleString()} more for Free Shipping.`}
               </p>
               <div className="w-32 h-1 bg-white rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, (subtotal/freeShippingThreshold)*100)}%` }}
                    className="h-full bg-gold"
                  />
               </div>
            </div>

            <div className="divide-y border-y">
              <AnimatePresence mode="popLayout">
                {cartItems.map(item => (
                  <motion.div 
                    key={item.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="py-8 flex flex-col sm:flex-row gap-8 relative"
                  >
                    <div className="w-32 aspect-[3/4] bg-white">
                      <img src={item.images[0]} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 space-y-2">
                       <div className="flex justify-between items-start">
                          <h3 className="text-lg font-serif">{item.name}</h3>
                          <span className="text-sm font-bold">₹{(item.price * item.quantity).toLocaleString()}</span>
                       </div>
                       <p className="text-[10px] uppercase tracking-widest text-forest/40">Size: {item.size} | Color: Default</p>
                       <div className="flex items-center gap-6 mt-6">
                          <div className="flex items-center border border-forest/10 px-3 py-1.5 bg-white">
                            <button onClick={() => updateQuantity(item.id, -1)}><Minus className="w-3 h-3 transition-colors hover:text-gold" /></button>
                            <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)}><Plus className="w-3 h-3 transition-colors hover:text-gold" /></button>
                          </div>
                          <button onClick={() => removeItem(item.id)} className="text-xs text-red-700/60 hover:text-red-700 underline underline-offset-4 flex items-center gap-1">
                             <Trash2 className="w-3 h-3" /> Remove
                          </button>
                       </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* AI Upsell Area */}
            <div className="mt-12 p-8 bg-forest text-ivory">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-4 h-4 text-gold" />
                <h3 className="text-lg font-serif">Complete the Look</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 <div className="flex gap-4 p-4 border border-ivory/10 hover:bg-ivory/5 transition-colors cursor-pointer group">
                    <img src={products[2].images[0]} className="w-16 h-20 object-cover" />
                    <div>
                       <p className="text-xs font-medium mb-1 line-clamp-1">{products[2].name}</p>
                       <p className="text-xs font-bold text-gold">₹{products[2].price.toLocaleString()}</p>
                       <button className="text-[10px] uppercase tracking-widest font-bold mt-2 text-ivory/40 group-hover:text-gold transition-colors">Quick Add +</button>
                    </div>
                 </div>
                 <div className="flex gap-4 p-4 border border-ivory/10 hover:bg-ivory/5 transition-colors cursor-pointer group">
                    <img src={products[3].images[0]} className="w-16 h-20 object-cover" />
                    <div>
                       <p className="text-xs font-medium mb-1 line-clamp-1">{products[3].name}</p>
                       <p className="text-xs font-bold text-gold">₹{products[3].price.toLocaleString()}</p>
                       <button className="text-[10px] uppercase tracking-widest font-bold mt-2 text-ivory/40 group-hover:text-gold transition-colors">Quick Add +</button>
                    </div>
                 </div>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="w-full xl:w-96">
            <div className="bg-white p-8 sticky top-32 border border-forest/5 shadow-xl shadow-forest/5">
              <h2 className="text-xl font-serif mb-8 border-b border-forest/5 pb-4">Order Summary</h2>
              <div className="space-y-4 mb-8">
                 <div className="flex justify-between text-sm">
                   <span className="text-forest/60">Subtotal</span>
                   <span>₹{subtotal.toLocaleString()}</span>
                 </div>
                 <div className="flex justify-between text-sm">
                   <span className="text-forest/60">Estimated Delivery</span>
                   <span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
                 </div>
                 <div className="flex justify-between text-sm">
                   <span className="text-forest/60">Tax (IGST 12%)</span>
                   <span>Calculated at checkout</span>
                 </div>
                 <div className="border-t border-forest/5 pt-4 flex justify-between font-bold text-lg">
                   <span>Estimated Total</span>
                   <span>₹{total.toLocaleString()}</span>
                 </div>
              </div>

              <Link to="/checkout" className="w-full bg-gold text-ivory py-4 flex items-center justify-center gap-2 uppercase tracking-widest text-[10px] font-bold hover:bg-forest shadow-lg shadow-gold/20 transition-all group">
                Proceed to Checkout <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <div className="mt-8 space-y-4">
                 <p className="text-[10px] py-1 px-3 bg-gold/10 text-gold font-bold inline-block rounded-full">Secure Checkout</p>
                 <p className="text-[10px] text-forest/40 italic">
                   Applicable taxes and shipping charges calculated at next step. Your transaction is covered by COROZO Trust Seal.
                 </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
