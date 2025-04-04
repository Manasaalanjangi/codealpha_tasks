const products = [
  // Electronics
  {
    id: 1,
    name: "Wireless Headphones",
    price: 149.99,
    description: "Premium wireless headphones with noise cancellation and long battery life. Perfect for music lovers and travelers.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    category: "electronics"
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 249.99,
    description: "Track your fitness, receive notifications, and more with this advanced smart watch.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    category: "electronics"
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    price: 79.99,
    description: "Portable Bluetooth speaker with 20 hours of battery life and water resistance.",
    image: "https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&w=800&q=80",
    category: "electronics"
  },
 
 
  {
    id: 44,
    name: "Noise-Canceling Earbuds",
    price: 199.99,
    description: "Wireless earbuds with advanced noise-cancellation technology and premium sound quality.",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80",
    category: "electronics"
  },
  // Kitchen Groceries
  
  {
    id: 6,
    name: "Organic Tea Set",
    price: 34.99,
    description: "Premium organic tea collection with five different flavors.",
    image: "https://images.unsplash.com/photo-1563911892437-1feda0179e1b?auto=format&fit=crop&w=800&q=80",
    category: "groceries"
  },
  {
    id: 8,
    name: "Gourmet Olive Oil",
    price: 24.99,
    description: "Extra virgin olive oil from Mediterranean olive groves, perfect for cooking and dressings.",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80",
    category: "groceries"
  },
  {
    id: 35,
    name: "Premium Knife Set",
    price: 129.99,
    description: "Professional-grade kitchen knife set with hardwood block storage.",
    image: "https://images.unsplash.com/photo-1593618998160-e34014e67546?auto=format&fit=crop&w=800&q=80",
    category: "kitchen"
  },
  
  {
    id: 37,
    name: "Artisanal Cheese Selection",
    price: 49.99,
    description: "Curated selection of fine cheeses from around the world.",
    image: "https://images.unsplash.com/photo-1452195100486-9cc805987862?auto=format&fit=crop&w=800&q=80",
    category: "groceries"
  },
  
  {
    id: 45,
    name: "Artisanal Bread Basket",
    price: 28.99,
    description: "Fresh assortment of handcrafted breads made with organic flour.",
    image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=800&q=80",
    category: "groceries"
  },
  {
    id: 46,
    name: "Gourmet Spice Collection",
    price: 42.99,
    description: "Set of premium spices from around the world in elegant glass jars.",
    image: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&w=800&q=80",
    category: "groceries"
  },
  
 
  
  {
    id: 49,
    name: "Women's Cardigan",
    price: 54.99,
    description: "Soft, warm cardigan perfect for layering in cooler weather.",
    image: "https://images.unsplash.com/photo-1534481016308-0fca71578ae5?auto=format&fit=crop&w=800&q=80",
    category: "clothing",
    subCategory: "women"
  },
  {
    id: 50,
    name: "Women's Tailored Blazer",
    price: 89.99,
    description: "Professional tailored blazer that transitions easily from office to evening.",
    image: "https://images.unsplash.com/photo-1591085686350-798c0f9faa7f?auto=format&fit=crop&w=800&q=80",
    category: "clothing",
    subCategory: "women"
  },
  // Dresses
  {
    id: 12,
    name: "Cocktail Dress",
    price: 89.99,
    description: "Elegant cocktail dress perfect for parties and events.",
    image: "https://images.unsplash.com/photo-1572804013427-4d7ca7268217?auto=format&fit=crop&w=800&q=80",
    category: "dresses",
    subCategory: "cocktail"
  },
  {
    id: 17,
    name: "Maxi Dress",
    price: 69.99,
    description: "Flowing maxi dress with floral print, perfect for summer.",
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80",
    category: "dresses",
    subCategory: "maxi"
  },

  {
    id: 19,
    name: "Casual Sundress",
    price: 49.99,
    description: "Light and comfortable sundress for casual outings.",
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80",
    category: "dresses",
    subCategory: "casual"
  },
  {
    id: 51,
    name: "Evening Gown",
    price: 199.99,
    description: "Elegant floor-length gown for formal events and galas.",
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80",
    category: "dresses",
    subCategory: "formal"
  },
  
  {
    id: 53,
    name: "Midi Dress",
    price: 74.99,
    description: "Stylish midi-length dress with modern design.",
    image: "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?auto=format&fit=crop&w=800&q=80",
    category: "dresses",
    subCategory: "midi"
  },
  // Jewelry
  {
    id: 16,
    name: "Silver Necklace",
    price: 129.99,
    description: "Elegant sterling silver necklace with pendant design.",
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=800&q=80",
    category: "jewelry"
  },
  {
    id: 18,
    name: "Diamond Ring",
    price: 999.99,
    description: "Stunning diamond ring set in white gold.",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80",
    category: "jewelry"
  },
  {
    id: 25,
    name: "Pearl Bracelet",
    price: 149.99,
    description: "Elegant freshwater pearl bracelet with silver clasp.",
    image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=800&q=80",
    category: "jewelry"
  },
  {
    id: 27,
    name: "Gemstone Pendant",
    price: 179.99,
    description: "Vibrant gemstone pendant with adjustable silver chain.",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80",
    category: "jewelry"
  },
  {
    id: 39,
    name: "Sapphire Earrings",
    price: 349.99,
    description: "Exquisite sapphire earrings set in 18K white gold.",
    image: "https://images.unsplash.com/photo-1589128777073-263566ae5e4d?auto=format&fit=crop&w=800&q=80",
    category: "jewelry"
  },
  {
    id: 40,
    name: "Rose Gold Bracelet",
    price: 159.99,
    description: "Delicate rose gold bracelet with cubic zirconia accents.",
    image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=800&q=80",
    category: "jewelry"
  },
  {
    id: 54,
    name: "Gold Chain Necklace",
    price: 279.99,
    description: "Luxurious 18K gold chain with contemporary design.",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80",
    category: "jewelry"
  },
  {
    id: 55,
    name: "Emerald Drop Earrings",
    price: 399.99,
    description: "Stunning emerald drop earrings with diamond accents.",
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=800&q=80",
    category: "jewelry"
  },
  {
    id: 56,
    name: "Men's Watch Collection",
    price: 499.99,
    description: "Set of three luxury watches for various occasions.",
    image: "https://images.unsplash.com/photo-1622434641406-a158123450f9?auto=format&fit=crop&w=800&q=80",
    category: "jewelry"
  },
  // Home Decor
  {
    id: 57,
    name: "Decorative Wall Mirror",
    price: 89.99,
    description: "Elegant wall mirror with decorative frame to enhance any room's decor.",
    image: "https://images.unsplash.com/photo-1622372738946-62e02505feb3?auto=format&fit=crop&w=800&q=80",
    category: "home"
  },
  {
    id: 58,
    name: "Ceramic Vase Set",
    price: 59.99,
    description: "Set of three ceramic vases in varying sizes and complementary colors.",
    image: "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=800&q=80",
    category: "home"
  },
  {
    id: 59,
    name: "Artificial Plant",
    price: 34.99,
    description: "Lifelike artificial plant that requires no maintenance but adds natural beauty to your space.",
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80",
    category: "home"
  },
  {
    id: 60,
    name: "Scented Candle Collection",
    price: 42.99,
    description: "Set of luxury scented candles with long burn time and natural fragrances.",
    image: "https://images.unsplash.com/photo-1608831540955-35094d48694a?auto=format&fit=crop&w=800&q=80",
    category: "home"
  },
  {
    id: 61,
    name: "Decorative Throw Blanket",
    price: 48.99,
    description: "Soft, cozy throw blanket with stylish pattern to add warmth and style to any room.",
    image: "https://images.unsplash.com/photo-1580893246395-52aead8960dc?auto=format&fit=crop&w=800&q=80",
    category: "home"
  },
  {
    id: 62,
    name: "Wall Art Canvas Print",
    price: 75.99,
    description: "Beautiful canvas print artwork to serve as a focal point in your living space.",
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
    category: "home"
  },
  {
    id: 63,
    name: "Table Lamp",
    price: 65.99,
    description: "Modern table lamp with adjustable brightness for ambient lighting.",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
    category: "home"
  }
  
];

module.exports = products;