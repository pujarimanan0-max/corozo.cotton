import React from 'react';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Product } from '../data/products';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group"
    >
      <Link to={`/product/${product.id}`} className="block relative overflow-hidden bg-[#E8E5D8] mb-6">
        {/* Image */}
        <div className="aspect-[4/5] relative overflow-hidden">
          <img 
            src={product.images[0]} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          {product.images[1] && (
            <img 
              src={product.images[1]} 
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 opacity-0 group-hover:opacity-100"
            />
          )}
        </div>

        {/* Status Badge */}
        {product.stock < 5 && (
          <div className="absolute top-4 left-4 bg-forest text-ivory text-[8px] font-bold uppercase tracking-widest px-2 py-1">
            Limited Edition
          </div>
        )}
      </Link>

      <div className="space-y-2">
        <div className="flex justify-between items-baseline gap-2">
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted font-bold">{product.category}</p>
          <div className="flex items-center gap-1 text-[8px] text-gold uppercase font-bold tracking-widest">
            <Star className="w-2.5 h-2.5 fill-gold" />
            <span>{product.rating}</span>
          </div>
        </div>

        <h3 className="text-xl font-serif text-forest group-hover:text-gold transition-colors leading-tight">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>
        
        <div className="flex items-center gap-3">
          <span className="text-lg font-serif italic text-gold">₹{product.price.toLocaleString()}</span>
          {product.mrp > product.price && (
            <span className="text-[10px] text-muted line-through opacity-50 italic">₹{product.mrp.toLocaleString()}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
