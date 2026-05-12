import { Instagram, Youtube, Pin as Pinterest, CreditCard, Truck, RefreshCw, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-ivory text-forest mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 border-t border-border-subtle py-20 px-4">
          {/* Brand Info */}
          <div>
            <h3 className="text-2xl font-serif mb-6 tracking-tighter">COROZO</h3>
            <p className="text-xs text-muted leading-relaxed mb-8 max-w-[240px]">
              Crafted at the intersection of heritage and modernity. We create timeless ethnic and fusion wear for the conscious individual.
            </p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-gold transition-colors text-xs uppercase tracking-widest font-medium">Instagram</a>
              <a href="#" className="hover:text-gold transition-colors text-xs uppercase tracking-widest font-medium">Pinterest</a>
              <a href="#" className="hover:text-gold transition-colors text-xs uppercase tracking-widest font-medium">WhatsApp</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-gold mb-8">Atelier</h4>
            <ul className="space-y-4 text-[11px] uppercase tracking-widest font-medium">
              <li><Link to="/shop" className="hover:text-gold transition-colors">Shop Boutique</Link></li>
              <li><Link to="/lookbook" className="hover:text-gold transition-colors">Lookbook Index</Link></li>
              <li><Link to="/about" className="hover:text-gold transition-colors">Our Story</Link></li>
              <li><Link to="/care" className="hover:text-gold transition-colors">Care Guide</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-gold mb-8">Guest Care</h4>
            <ul className="space-y-4 text-[11px] uppercase tracking-widest font-medium">
              <li><Link to="/contact" className="hover:text-gold transition-colors">Concierge</Link></li>
              <li><Link to="/care" className="hover:text-gold transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/care" className="hover:text-gold transition-colors">Bespoke Fitting</Link></li>
              <li><Link to="/contact" className="hover:text-gold transition-colors">Track Style</Link></li>
            </ul>
          </div>

          {/* Location */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-gold mb-8">Base</h4>
            <p className="text-[11px] uppercase tracking-widest font-medium leading-loose">
              102 Artisan Lane<br />
              Jaipur, Rajasthan 302001<br />
              India
            </p>
            <p className="mt-8 text-[11px] uppercase tracking-widest font-medium">
              +91 9900 8821 00
            </p>
          </div>
        </div>

        {/* Bottom Bar (Minimalist like snippet) */}
        <div className="border-t border-border-subtle h-16 flex items-center justify-between px-4 text-[9px] uppercase tracking-[0.2em] text-muted">
          <div>© 2026 COROZO ATELIER</div>
          <div className="hidden md:block">Crafted with Intention in India</div>
          <div className="flex gap-8">
            <span>Privacy</span>
            <span>Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
