import { motion } from 'motion/react';
import { Award, Globe, Heart, ShieldCheck } from 'lucide-react';

export default function About() {
  return (
    <div className="bg-ivory pb-24">
      {/* Hero */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1598533036066-511ce5f0535a?q=80&w=1920" 
          className="absolute inset-0 w-full h-full object-cover scale-105" 
          alt="Artisan at work"
        />
        <div className="absolute inset-0 bg-forest/40 backdrop-blur-[1px]" />
        <div className="relative text-center px-4 max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-ivory text-5xl md:text-8xl tracking-tighter"
          >
            Crafted with Intention
          </motion.h1>
        </div>
      </section>

      {/* Founder's Note */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] overflow-hidden bg-forest/10">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2a?q=80&w=800" className="w-full h-full object-cover grayscale" />
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 p-8 bg-gold text-ivory hidden md:block">
               <p className="text-xl font-serif">"Tradition is not the worship of ashes, but the preservation of fire."</p>
            </div>
          </motion.div>
          <div className="space-y-8">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-gold">The Journey</span>
            <h2 className="text-4xl md:text-5xl tracking-tighter">A Note from the Atelier</h2>
            <div className="space-y-6 text-sm text-forest/70 leading-relaxed italic">
              <p>
                COROZO began in a small workshop in Jaipur, motivated by a simple observation: Indian craft is timeless, but our silhouettes should evolve with our lives.
              </p>
              <p>
                We believe that every stitch carries a story of the artisan who made it. By blending ancient block-printing techniques with sharp, contemporary tailoring, we aim to create garments that feel as at home in Manhattan as they do at a Mehendi in Mumbai.
              </p>
              <p>
                Our commitment is to quality, consciousness, and the preservation of heritage through design that speaks to the modern culturalist.
              </p>
            </div>
            <div className="pt-8">
               <p className="font-serif text-2xl">Rishi Vardhan</p>
               <p className="text-[10px] uppercase tracking-widest font-bold text-gold">Founder & Creative Director</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="bg-forest text-ivory py-32 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl tracking-tighter mb-4">Our Foundations</h2>
            <div className="w-16 h-[1px] bg-gold mx-auto" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="space-y-6">
              <Award className="w-10 h-10 mx-auto text-gold" />
              <h3 className="text-2xl font-serif italic">Heritage Craft</h3>
              <p className="text-sm text-ivory/60 leading-relaxed">
                Partnering directly with artisan communities to preserve dying techniques like hand-block printing and gold zardosi.
              </p>
            </div>
            <div className="space-y-6">
              <Globe className="w-10 h-10 mx-auto text-gold" />
              <h3 className="text-2xl font-serif italic">Contemporary Design</h3>
              <p className="text-sm text-ivory/60 leading-relaxed">
                Reimagining traditional silhouettes for modern utility, creating fluid garments for the global traveler.
              </p>
            </div>
            <div className="space-y-6">
              <Heart className="w-10 h-10 mx-auto text-gold" />
              <h3 className="text-2xl font-serif italic">Conscious Sourcing</h3>
              <p className="text-sm text-ivory/60 leading-relaxed">
                Sourcing only natural fibers and ethically produced silks, ensuring a kinder footprint on our planet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Numbers Strip */}
      <section className="py-24 border-b border-forest/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <div>
              <p className="text-4xl font-serif text-gold mb-2">500+</p>
              <p className="text-[10px] uppercase font-bold tracking-widest">Original Styles</p>
            </div>
            <div>
              <p className="text-4xl font-serif text-gold mb-2">12k+</p>
              <p className="text-[10px] uppercase font-bold tracking-widest">Global Patrons</p>
            </div>
            <div>
              <p className="text-4xl font-serif text-gold mb-2">18</p>
              <p className="text-[10px] uppercase font-bold tracking-widest">Artisan Clusters</p>
            </div>
            <div>
              <p className="text-4xl font-serif text-gold mb-2">32</p>
              <p className="text-[10px] uppercase font-bold tracking-widest">Cities Shipped To</p>
            </div>
          </div>
        </div>
      </section>

      {/* Press Mentions */}
      <section className="py-24 grayscale opacity-30 h-32 flex items-center justify-center gap-12 md:gap-24 overflow-hidden px-8">
         <span className="text-2xl font-serif italic border-x border-forest/20 px-8">VOGUE</span>
         <span className="text-2xl font-serif italic border-x border-forest/20 px-8">GQ</span>
         <span className="text-2xl font-serif italic border-x border-forest/20 px-8">BAZAAR</span>
         <span className="text-2xl font-serif italic border-x border-forest/20 px-8">ELLE</span>
      </section>
    </div>
  );
}
