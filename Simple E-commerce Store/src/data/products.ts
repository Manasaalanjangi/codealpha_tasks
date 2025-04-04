import { Product } from '../contexts/CartContext';

export const products: Product[] = [
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
    id: 4,
    name: "Laptop Backpack",
    price: 59.99,
    description: "Stylish and durable backpack with padded compartment for laptops up to 15 inches.",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
    category: "accessories"
  },
  {
    id: 34,
    name: "Wireless Charger",
    price: 29.99,
    description: "Fast wireless charging pad compatible with all Qi-enabled devices.",
    image: "https://images.unsplash.com/photo-1615526675659-48cf5a80e8e1?auto=format&fit=crop&w=800&q=80",
    category: "electronics"
  },
  {
    id: 43,
    name: "Smart Home Hub",
    price: 129.99,
    description: "Control all your smart home devices from a single interface with voice commands.",
    image: "https://images.unsplash.com/photo-1558002038-1055e2dae1d7?auto=format&fit=crop&w=800&q=80",
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
  // Kitchen Groceries (renamed from Kitchen & Groceries)
  {
    id: 5,
    name: "Blender Set",
    price: 89.99,
    description: "Multi-function blender set with various attachments for all your kitchen needs.",
    image: "https://images.unsplash.com/photo-1525097596740-cb2a76b21d83?auto=format&fit=crop&w=800&q=80",
    category: "kitchen"
  },
  {
    id: 6,
    name: "Organic Tea Set",
    price: 34.99,
    description: "Premium organic tea collection with five different flavors.",
    image: "https://images.unsplash.com/photo-1563911892437-1feda0179e1b?auto=format&fit=crop&w=800&q=80",
    category: "groceries"
  },
  {
    id: 7,
    name: "Pasta Assortment",
    price: 18.99,
    description: "Artisanal Italian pasta varieties made from premium ingredients.",
    image: "https://images.unsplash.com/photo-1556761223-4c4282c73f77?auto=format&fit=crop&w=800&q=80",
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
    id: 9,
    name: "Spice Collection",
    price: 29.99,
    description: "Set of 12 essential cooking spices in elegant glass containers.",
    image: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&w=800&q=80",
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
    id: 36,
    name: "Cast Iron Cookware Set",
    price: 149.99,
    description: "Pre-seasoned cast iron cookware set with multiple pots and pans.",
    image: "https://images.unsplash.com/photo-1620812067844-0775acb5c35b?auto=format&fit=crop&w=800&q=80",
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
    id: 38,
    name: "Copper Cookware Set",
    price: 199.99,
    description: "Elegant copper cookware set with stainless steel interior.",
    image: "https://images.unsplash.com/photo-1584990347449-651fc556100c?auto=format&fit=crop&w=800&q=80",
    category: "kitchen"
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
    id: 47,
    name: "Non-Stick Bakeware Set",
    price: 59.99,
    description: "Complete set of non-stick baking pans, sheets, and molds for all your baking needs.",
    image: "https://images.unsplash.com/photo-1621607950042-60c4dc16a926?auto=format&fit=crop&w=800&q=80",
    category: "kitchen"
  },
  {
    id: 48,
    name: "Electric Pasta Maker",
    price: 119.99,
    description: "Automatic pasta maker with multiple attachments for different pasta shapes.",
    image: "https://images.unsplash.com/photo-1604503468420-98a7cb0b6f81?auto=format&fit=crop&w=800&q=80",
    category: "kitchen"
  },
  // Clothing - Men
  {
    id: 10,
    name: "Men's Casual Shirt",
    price: 39.99,
    description: "Comfortable cotton casual shirt perfect for everyday wear.",
    image: "https://images.unsplash.com/photo-1589310243389-96a5483213a8?auto=format&fit=crop&w=800&q=80",
    category: "clothing",
    subCategory: "men"
  },
  {
    id: 11,
    name: "Men's Jeans",
    price: 59.99,
    description: "Classic fit denim jeans with stretch for comfort.",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80",
    category: "clothing",
    subCategory: "men"
  },
  {
    id: 12,
    name: "Men's Formal Suit",
    price: 199.99,
    description: "Tailored formal suit perfect for business and special occasions.",
    image: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=800&q=80",
    category: "clothing",
    subCategory: "men"
  },
  // Clothing - Women
  {
    id: 13,
    name: "Women's Blouse",
    price: 44.99,
    description: "Elegant blouse with floral pattern made from breathable fabric.",
    image: "https://images.unsplash.com/photo-1564257555966-c2f544b263c8?auto=format&fit=crop&w=800&q=80",
    category: "clothing",
    subCategory: "women"
  },
  {
    id: 14,
    name: "Women's Cardigan",
    price: 49.99,
    description: "Soft knit cardigan perfect for layering in any season.",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80",
    category: "clothing",
    subCategory: "women"
  },
  {
    id: 15,
    name: "Women's Trousers",
    price: 54.99,
    description: "Comfortable stretch trousers suitable for work or casual wear.",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80",
    category: "clothing",
    subCategory: "women"
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
    id: 16,
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
    id: 18,
    name: "Evening Gown",
    price: 199.99,
    description: "Elegant floor-length evening gown for formal occasions.",
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80",
    category: "dresses",
    subCategory: "formal"
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
    id: 20,
    name: "Wrap Dress",
    price: 79.99,
    description: "Versatile wrap dress that flatters all body types.",
    image: "https://images.unsplash.com/photo-1614251055814-e4b960403e69?auto=format&fit=crop&w=800&q=80",
    category: "dresses",
    subCategory: "wrap"
  },
  {
    id: 21,
    name: "Shift Dress",
    price: 64.99,
    description: "Classic shift dress for a timeless, elegant look.",
    image: "https://images.unsplash.com/photo-1623609163859-ca93c646146b?auto=format&fit=crop&w=800&q=80",
    category: "dresses",
    subCategory: "shift"
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
    id: 52,
    name: "Summer Dress",
    price: 59.99,
    description: "Light, breezy summer dress with vibrant patterns.",
    image: "https://images.unsplash.com/photo-1572122384815-5444edd80c9b?auto=format&fit=crop&w=800&q=80",
    category: "dresses",
    subCategory: "casual"
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
    id: 22,
    name: "Silver Necklace",
    price: 129.99,
    description: "Elegant sterling silver necklace with pendant design.",
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=800&q=80",
    category: "jewelry"
  },
  {
    id: 23,
    name: "Gold Earrings",
    price: 199.99,
    description: "14K gold earrings with minimalist design.",
    image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=800&q=80",
    category: "jewelry"
  },
  {
    id: 24,
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
    id: 26,
    name: "Luxury Watch",
    price: 299.99,
    description: "Luxury watch with stainless steel strap and automatic movement.",
    image: "https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&w=800&q=80",
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
    id: 41,
    name: "Emerald Necklace",
    price: 499.99,
    description: "Stunning emerald pendant necklace with diamond halo.",
    image: "https://images.unsplash.com/photo-1608042314453-ae338d80c427?auto=format&fit=crop&w=800&q=80",
    category: "jewelry"
  },
  {
    id: 42,
    name: "Platinum Wedding Band",
    price: 699.99,
    description: "Classic platinum wedding band with sleek, timeless design.",
    image: "https://images.unsplash.com/photo-1595781518471-b9585d2dfb82?auto=format&fit=crop&w=800&q=80",
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
  // Accessories
  {
    id: 28,
    name: "Sunglasses",
    price: 119.99,
    description: "Polarized sunglasses with UV protection and stylish frame.",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80",
    category: "accessories"
  },
  {
    id: 29,
    name: "Wallet",
    price: 49.99,
    description: "Genuine leather wallet with multiple card slots and coin pocket.",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80",
    category: "accessories"
  },
  {
    id: 30,
    name: "Water Bottle",
    price: 24.99,
    description: "Insulated stainless steel water bottle that keeps drinks cold for 24 hours or hot for 12 hours.",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80",
    category: "accessories"
  },
  {
    id: 31,
    name: "Scarf",
    price: 34.99,
    description: "Soft and stylish scarf perfect for all seasons.",
    image: "https://images.unsplash.com/photo-1520903920243-568b289614a7?auto=format&fit=crop&w=800&q=80",
    category: "accessories"
  },
  // Home Decor
  {
    id: 32,
    name: "Desk Lamp",
    price: 49.99,
    description: "Adjustable LED desk lamp with multiple brightness levels and color temperatures.",
    image: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=800&q=80",
    category: "home"
  },
  {
    id: 33,
    name: "Throw Pillows Set",
    price: 39.99,
    description: "Set of decorative throw pillows to enhance your living space.",
    image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=800&q=80",
    category: "home"
  },
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
  },
  {
    id: 64,
    name: "Bookshelf Decor Set",
    price: 39.99,
    description: "Curated set of decorative objects to style your bookshelf with professional flair.",
    image: "https://images.unsplash.com/photo-1594640405464-99a171036392?auto=format&fit=crop&w=800&q=80",
    category: "home"
  }
];

export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  if (category === 'all') return products;
  return products.filter(product => product.category === category);
};

export const categories = [
  { name: 'All Products', value: 'all' },
  { name: 'Electronics', value: 'electronics' },
  { name: 'Kitchen Groceries', value: 'groceries' },
  { name: 'Kitchen Appliances', value: 'kitchen' },
  { name: 'Clothing', value: 'clothing' },
  { name: 'Dresses', value: 'dresses' },
  { name: 'Jewelry', value: 'jewelry' },
  { name: 'Accessories', value: 'accessories' },
  { name: 'Home Decor', value: 'home' }
];

export const priceRanges = [
  { name: 'All Prices', min: 0, max: 1000 },
  { name: 'Under $50', min: 0, max: 50 },
  { name: '$50 - $100', min: 50, max: 100 },
  { name: '$100 - $200', min: 100, max: 200 },
  { name: 'Over $200', min: 200, max: 1000 }
];
