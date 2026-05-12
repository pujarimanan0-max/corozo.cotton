import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { CheckCircle2, CreditCard, Truck, ShieldCheck, ArrowLeft, ChevronRight } from 'lucide-react';
import { products } from '../data/products';

export default function Checkout() {
  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-12 max-w-lg w-full text-center shadow-2xl"
        >
          <div className="w-20 h-20 bg-gold/10 text-gold rounded-full flex items-center justify-center mx-auto mb-8">
             <CheckCircle2 className="w-10 h-10" />
          </div>
          <h1 className="text-4xl tracking-tighter mb-4">Gratitude.</h1>
          <p className="text-sm text-forest/60 mb-2">Your order #CRZ-2026-9821 has been placed successfully.</p>
          <p className="text-[10px] uppercase font-bold tracking-widest text-gold mb-12">Estimated delivery: May 18 - May 21</p>
          <Link to="/" className="inline-block bg-forest text-ivory px-10 py-5 font-bold uppercase tracking-widest text-[10px] transition-all hover:bg-gold">
            Continue Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-ivory min-h-screen py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Checkout Forms */}
        <div className="lg:col-span-8">
          <div className="flex items-center gap-4 mb-12 overflow-x-auto pb-4 no-scrollbar">
             {[1, 2, 3].map(i => (
               <div key={i} className="flex items-center gap-2 flex-shrink-0">
                 <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold ${
                   step === i ? 'bg-gold text-ivory' : step > i ? 'bg-forest text-ivory' : 'bg-forest/5 text-forest/40'
                 }`}>
                   {i}
                 </div>
                 <span className={`text-[10px] uppercase font-bold tracking-widest ${step === i ? 'text-forest' : 'text-forest/30'}`}>
                    {i === 1 ? 'Information' : i === 2 ? 'Shipping' : 'Payment'}
                 </span>
                 {i < 3 && <ChevronRight className="w-4 h-4 text-forest/10" />}
               </div>
             ))}
          </div>

          <motion.div 
            key={step}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-10"
          >
            {step === 1 && (
              <div className="space-y-8">
                <h2 className="text-3xl font-serif">Contact Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-forest/40">Email or Mobile Number</label>
                    <input type="text" placeholder="artisan@corozo.in" className="w-full p-4 bg-white border border-forest/10 outline-none focus:border-gold" />
                  </div>
                </div>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="accent-gold h-4 w-4" />
                  <span className="text-xs text-forest/60 group-hover:text-forest transition-colors">Keep me updated on WhatsApp with delivery alerts</span>
                </label>
                <div className="pt-8">
                   <button onClick={nextStep} className="bg-gold text-ivory px-12 py-5 font-bold uppercase tracking-widest text-[10px] hover:bg-forest transition-all">
                      Continue to Shipping
                   </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8">
                <h2 className="text-3xl font-serif">Delivery Address</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input placeholder="First Name" className="w-full p-4 bg-white border border-forest/10 outline-none focus:border-gold" />
                  <input placeholder="Last Name" className="w-full p-4 bg-white border border-forest/10 outline-none focus:border-gold" />
                  <div className="md:col-span-2">
                    <input placeholder="Address Line 1" className="w-full p-4 bg-white border border-forest/10 outline-none focus:border-gold" />
                  </div>
                  <input placeholder="Appartment, suite, etc. (optional)" className="w-full p-4 bg-white border border-forest/10 outline-none focus:border-gold" />
                  <input placeholder="City" className="w-full p-4 bg-white border border-forest/10 outline-none focus:border-gold" />
                  <input placeholder="State" className="w-full p-4 bg-white border border-forest/10 outline-none focus:border-gold" />
                  <input placeholder="Pincode" className="w-full p-4 bg-white border border-forest/10 outline-none focus:border-gold" />
                </div>
                <div className="flex gap-4 pt-8">
                   <button onClick={prevStep} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-forest/40 hover:text-forest">
                      <ArrowLeft className="w-4 h-4" /> Back
                   </button>
                   <button onClick={nextStep} className="bg-gold text-ivory px-12 py-5 font-bold uppercase tracking-widest text-[10px] hover:bg-forest transition-all">
                      Continue to Payment
                   </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8">
                <h2 className="text-3xl font-serif">Payment Method</h2>
                <div className="border border-forest/10 divide-y bg-white">
                   <label className="p-6 flex items-center justify-between cursor-pointer hover:bg-forest/5 transition-colors">
                      <div className="flex items-center gap-4">
                        <input type="radio" name="pay" className="accent-gold h-4 w-4" defaultChecked />
                        <span className="text-sm font-medium">UPI / GPay / PhonePe</span>
                      </div>
                      <div className="text-[10px] font-bold text-gold">Razorpay Secured</div>
                   </label>
                   <label className="p-6 flex items-center justify-between cursor-pointer hover:bg-forest/5 transition-colors">
                      <div className="flex items-center gap-4">
                        <input type="radio" name="pay" className="accent-gold h-4 w-4" />
                        <span className="text-sm font-medium">Credit / Debit Card</span>
                      </div>
                      <div className="flex gap-2">
                         <div className="w-8 h-5 bg-forest/5 rounded" />
                         <div className="w-8 h-5 bg-forest/5 rounded" />
                      </div>
                   </label>
                   <label className="p-6 flex items-center gap-4 cursor-pointer hover:bg-forest/5 transition-colors">
                      <input type="radio" name="pay" className="accent-gold h-4 w-4" />
                      <span className="text-sm font-medium">Cash on Delivery (COD)</span>
                   </label>
                </div>
                <div className="flex gap-4 pt-8">
                   <button onClick={prevStep} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-forest/40 hover:text-forest">
                      <ArrowLeft className="w-4 h-4" /> Back
                   </button>
                   <button onClick={() => setIsSuccess(true)} className="bg-forest text-gold px-12 py-5 font-bold uppercase tracking-widest text-[10px] hover:bg-gold hover:text-ivory transition-all shadow-xl shadow-gold/10">
                      Complete Purchase
                   </button>
                </div>
              </div>
            )}
          </motion.div>

          <footer className="mt-20 pt-12 border-t border-forest/5 grid grid-cols-2 md:grid-cols-3 gap-8">
             <div className="flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-gold" />
                <span className="text-[8px] uppercase font-bold tracking-widest text-forest/60">SSL Secure Checkout</span>
             </div>
             <div className="flex items-center gap-3">
                <Truck className="w-6 h-6 text-gold" />
                <span className="text-[8px] uppercase font-bold tracking-widest text-forest/60">Pan India Delivery</span>
             </div>
          </footer>
        </div>

        {/* Order Review Sidebar */}
        <div className="lg:col-span-4 lg:border-l lg:border-forest/5 lg:pl-12">
          <div className="sticky top-32 space-y-8">
            <h3 className="text-xl font-serif">Review Order</h3>
            <div className="space-y-6">
               <div className="flex gap-4">
                  <div className="w-16 aspect-[3/4] bg-white border">
                    <img src={products[0].images[0]} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-tight">{products[0].name}</p>
                    <p className="text-[10px] text-forest/40 uppercase tracking-widest">Qty: 1 | Size: L</p>
                    <p className="text-xs font-bold pt-2">₹{products[0].price.toLocaleString()}</p>
                  </div>
               </div>
            </div>

            <div className="pt-8 border-t border-forest/10 space-y-4">
               <div className="flex justify-between text-sm">
                 <span className="text-forest/60">Subtotal</span>
                 <span>₹{products[0].price.toLocaleString()}</span>
               </div>
               <div className="flex justify-between text-sm">
                 <span className="text-forest/60">Shipping</span>
                 <span className="text-green-700">FREE</span>
               </div>
               <div className="pt-4 flex justify-between font-bold text-lg">
                 <span>Total</span>
                 <span>₹{products[0].price.toLocaleString()}</span>
               </div>
            </div>

            <div className="p-4 bg-gold/10 border border-gold/20 italic text-[10px] text-forest/80">
              "You're making a great choice. This piece is part of our limited 'Marigold Edit'."
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
