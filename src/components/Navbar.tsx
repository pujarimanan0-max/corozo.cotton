import { useState, useEffect } from 'react';
import { Search, ShoppingBag, Heart, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Shop', path: '/shop' },
    { name: 'Lookbook', path: '/lookbook' },
    { name: 'Our Story', path: '/about' },
    { name: 'Care Guide', path: '/care' },
  ];

  return (
    <>
      <div className="bg-gold text-white text-[10px] md:text-[10px] py-2 text-center tracking-[0.15em] font-semibold uppercase z-50 relative">
        Free shipping on orders above ₹999 | Easy 7-day returns
      </div>
      
      <nav 
        className={`sticky top-0 z-40 transition-all duration-300 border-b ${
          isScrolled ? 'bg-ivory/95 backdrop-blur-md py-4 shadow-sm border-border-subtle' : 'bg-ivory py-6 border-border-subtle'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Desktop Nav Links (Left) */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.slice(0, 3).map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className={`text-[11px] uppercase tracking-[0.2em] font-medium hover:text-gold transition-colors ${
                  location.pathname === link.path ? 'text-gold' : 'text-forest'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Logo (Center) */}
          <Link to="/" className="text-3xl md:text-4xl font-serif tracking-[0.2em] text-forest hover:text-gold transition-colors md:absolute md:left-1/2 md:-translate-x-1/2">
            COROZO
          </Link>

          {/* Icons & Actions (Right) */}
          <div className="flex items-center gap-6 md:gap-8">
            <button className="text-forest hover:text-gold transition-colors p-1 hidden md:block text-[11px] uppercase tracking-widest font-medium">
              Search
            </button>
            <Link to="/wishlist" className="text-forest hover:text-gold transition-colors p-1 hidden md:block text-[11px] uppercase tracking-widest font-medium">
              Wishlist
            </Link>
            <Link to="/cart" className="relative text-forest hover:text-gold transition-colors p-1 text-[11px] uppercase tracking-widest font-medium">
              <span className="hidden md:inline">Bag</span>
              <ShoppingBag className="w-5 h-5 md:hidden" />
              <span className="absolute -top-2 -right-3 bg-forest text-ivory text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                0
              </span>
            </Link>
            <button 
              className="md:hidden text-forest p-1"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 bg-ivory flex flex-col md:hidden"
          >
            <div className="p-6 flex justify-end">
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X className="w-8 h-8 text-forest" />
              </button>
            </div>
            <div className="flex flex-col items-center gap-8 mt-10">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path}
                  className="text-2xl font-serif hover:text-gold transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <Link to="/wishlist" className="text-2xl font-serif hover:text-gold transition-colors">
                Wishlist
              </Link>
            </div>
            <div className="mt-auto p-12 text-center">
              <p className="text-xs text-forest/40 uppercase tracking-widest">© 2026 COROZO STUDIO</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
