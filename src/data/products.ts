export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  mrp: number;
  colors: string[];
  sizes: string[];
  images: string[];
  rating: number;
  reviewCount: number;
  stock: number;
  tags: string[];
  description: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Embroidered Silk Sherwani",
    category: "Indo-Western Men",
    price: 14500,
    mrp: 18000,
    colors: ["#1B2D2A", "#C5A059", "#FDFCF8"],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?q=80&w=800",
      "https://images.unsplash.com/photo-1598533036066-511ce5f0535a?q=80&w=800"
    ],
    rating: 4.8,
    reviewCount: 124,
    stock: 5,
    tags: ["Wedding", "Festive", "Luxury"],
    description: "A masterfully crafted silk sherwani with intricate hand-embroidery, blending traditional motifs with a modern sharp silhouette."
  },
  {
    id: "2",
    name: "Aged Gold Anarkali Set",
    category: "Indo-Western Women",
    price: 8900,
    mrp: 11000,
    colors: ["#C5A059", "#FDFCF8"],
    sizes: ["XS", "S", "M", "L"],
    images: [
      "https://images.unsplash.com/photo-1583391733956-6c78276477e2?q=80&w=800",
      "https://images.unsplash.com/photo-1583391733975-64bcbd60751a?q=80&w=800"
    ],
    rating: 4.9,
    reviewCount: 89,
    stock: 2,
    tags: ["Festive", "Women", "Ethnic"],
    description: "This fluid Anarkali set in aged gold georgette features delicate block prints and a contemporary slit for added grace."
  },
  {
    id: "3",
    name: "Forest Green Fusion Co-ord",
    category: "Indo-Western Women",
    price: 5600,
    mrp: 7200,
    colors: ["#1B2D2A", "#FDFCF8"],
    sizes: ["S", "M", "L"],
    images: [
      "https://images.unsplash.com/photo-1610030469668-935359197e3c?q=80&w=800",
      "https://images.unsplash.com/photo-1610030469915-9988299bc1b0?q=80&w=800"
    ],
    rating: 4.7,
    reviewCount: 56,
    stock: 12,
    tags: ["Casual", "Fusion", "Co-ord"],
    description: "Effortless forest green co-ord set with a tailored tunic and wide-leg trousers, perfect for office ethnic or casual evenings."
  },
  {
    id: "4",
    name: "Hand-Block Print Kurta",
    category: "Ethnic Kurtas",
    price: 2800,
    mrp: 3500,
    colors: ["#FDFCF8", "#1B2D2A"],
    sizes: ["S", "M", "L", "XL", "2XL"],
    images: [
      "https://images.unsplash.com/photo-1624372927054-0373809631fc?q=80&w=800",
      "https://images.unsplash.com/photo-1624372927163-95240bc1ca02?q=80&w=800"
    ],
    rating: 4.5,
    reviewCount: 230,
    stock: 25,
    tags: ["Daily", "Cotton", "Ethnic"],
    description: "Celebrate heritage with our hand-block printed cotton kurta, breathable and refined for everyday wear."
  },
  {
    id: "5",
    name: "Ivory Silk Cape Set",
    category: "Festive Wear",
    price: 12000,
    mrp: 15000,
    colors: ["#FDFCF8"],
    sizes: ["S", "M"],
    images: [
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800",
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=800"
    ],
    rating: 5.0,
    reviewCount: 42,
    stock: 3,
    tags: ["Festive", "Luxury", "Cape"],
    description: "An ethereal ivory silk set featuring a floor-length sheer cape with gold zardosi work. A true statement piece."
  },
  {
    id: "6",
    name: "Crimson Velvet Nehru Jacket",
    category: "Indo-Western Men",
    price: 6500,
    mrp: 8500,
    colors: ["#b91c1c", "#1B2D2A"],
    sizes: ["M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800",
      "https://images.unsplash.com/photo-1444491741275-3747c33cc99b?q=80&w=800"
    ],
    rating: 4.6,
    reviewCount: 78,
    stock: 8,
    tags: ["Wedding", "Festive", "Men"],
    description: "Rich crimson velvet Nehru jacket with antique gold buttons. Pairs perfectly with both kurtas and shirts."
  }
];
