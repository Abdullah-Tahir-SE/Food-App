export const TIER1_CATEGORIES = [
  { id: 'pizzas', name: 'Pizzas', icon: '🍕' },
  { id: 'deals', name: 'Deals', icon: '🔥' },
  { id: 'burgers', name: 'Burgers', icon: '🍔' },
  { id: 'chicken', name: 'Crispy Chicken', icon: '🍗' },
  { id: 'sides', name: 'Loaded Fries & Sides', icon: '🍟' },
  { id: 'platters', name: 'Meltz & Platters', icon: '🥩' },
  { id: 'drinks', name: 'Drinks & Shakes', icon: '🥤' }
];

export const TIER2_SUB_CATEGORIES = {
  pizzas: ['All Pizzas', 'Classic Flavors', 'Favorite Flavors', 'Premium Flavors', 'Super Loaded', "Half 'N Half"],
  deals: ['All Deals', 'Midnight Flash', 'Duo Box', 'Mega Family Feasts', 'Solo Crunch'],
  burgers: ['All Burgers', 'Smash Beef', 'Crispy Zinger Stackers', 'Grilled Chicken', 'Mini Sliders'],
  chicken: ['All Chicken', 'Hot Wings', 'Crispy Tenders', 'Fried Chicken Buckets', 'Popcorn Bites'],
  sides: ['All Sides', 'Cheesy Jalapeño', 'Dynamite Fries', 'Mozzarella Sticks', 'Onion Rings'],
  platters: ['All Platters', 'Peppered Ribeye', 'Smokey Ribs', 'Meltz Platters'],
  drinks: ['All Drinks', 'Gourmet Shakes', 'Desserts & Lava Cake', 'Cold Sodas']
};

export const SPICE_LEVELS = [
  { id: 'all', label: 'All Spices', icon: '✨' },
  { id: 'mild', label: 'Mild 🌿', icon: '🌿' },
  { id: 'spicy', label: 'Spicy 🌶️', icon: '🌶️' },
  { id: 'fiery', label: 'Fiery Hot 🔥', icon: '🔥' }
];

export const MENU_ITEMS = [
  // PIZZAS (Realistic PKR fast-food prices: Rs. 950 - Rs. 2,450)
  {
    id: 'pz-stuffed-supreme',
    name: 'Gourmet Stuffed Crust Supreme',
    category: 'pizzas',
    subCategory: 'Premium Flavors',
    tag: 'Bestseller',
    price: 1490,
    rating: 4.9,
    reviewsCount: 342,
    spiceLevel: 'spicy',
    description: 'Golden oven-baked crust packed with molten mozzarella, pepperoni, smoked chicken, bell peppers, olives, and secret oregano drizzle.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop',
    calories: '980 kcal',
    prepTime: '18-22 min',
    variants: [
      { id: 'sm', name: 'Regular 10"', priceModifier: -350 },
      { id: 'md', name: 'Medium 12"', priceModifier: 0 },
      { id: 'lg', name: 'Large 14"', priceModifier: 490 },
      { id: 'stuffed', name: 'Monster Stuffed Crust 16"', priceModifier: 950 }
    ]
  },
  {
    id: 'pz-crown-crust-beef',
    name: 'Crown Crust Smoked Beef Feast',
    category: 'pizzas',
    subCategory: 'Super Loaded',
    tag: "Chef's Pick",
    price: 1690,
    rating: 4.95,
    reviewsCount: 218,
    spiceLevel: 'mild',
    description: 'Distinctive crown pockets filled with cream cheese & grilled beef cubes, topped with BBQ pulled beef and caramelized onions.',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=800&auto=format&fit=crop',
    calories: '1050 kcal',
    prepTime: '20 min',
    variants: [
      { id: 'md', name: 'Medium 12"', priceModifier: 0 },
      { id: 'lg', name: 'Large 14"', priceModifier: 490 },
      { id: 'crown-xl', name: 'Royal Crown XL 16"', priceModifier: 760 }
    ]
  },
  {
    id: 'pz-fiery-peri-chicken',
    name: 'Fiery Peri-Peri Chicken Melt',
    category: 'pizzas',
    subCategory: 'Favorite Flavors',
    tag: 'Hot & Spicy',
    price: 1390,
    rating: 4.85,
    reviewsCount: 189,
    spiceLevel: 'fiery',
    description: 'Flame-grilled Peri-Peri chicken chunks, bird’s eye chili paste, jalapeños, red onions, and smoky chipotle cream.',
    image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?q=80&w=800&auto=format&fit=crop',
    calories: '890 kcal',
    prepTime: '15 min',
    variants: [
      { id: 'sm', name: 'Regular 10"', priceModifier: -300 },
      { id: 'md', name: 'Medium 12"', priceModifier: 0 },
      { id: 'lg', name: 'Large 14"', priceModifier: 450 }
    ]
  },
  {
    id: 'pz-classic-pepperoni',
    name: 'Classic Double Pepperoni Feast',
    category: 'pizzas',
    subCategory: 'Classic Flavors',
    tag: 'Bestseller',
    price: 1290,
    rating: 4.88,
    reviewsCount: 512,
    spiceLevel: 'mild',
    description: 'Crispy artisan dough layered with double smoked beef pepperoni, melted mozzarella, and rich Italian tomato sauce.',
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=800&auto=format&fit=crop',
    calories: '910 kcal',
    prepTime: '15 min',
    variants: [
      { id: 'sm', name: 'Regular 10"', priceModifier: -300 },
      { id: 'md', name: 'Medium 12"', priceModifier: 0 },
      { id: 'lg', name: 'Large 14"', priceModifier: 450 }
    ]
  },
  {
    id: 'pz-half-half-duo',
    name: 'Half N Half Masterpiece',
    category: 'pizzas',
    subCategory: "Half 'N Half",
    tag: 'New',
    price: 1590,
    rating: 4.91,
    reviewsCount: 140,
    spiceLevel: 'spicy',
    description: 'Can’t decide? Choose 2 of your favorite pizza topping styles split down the middle on a single stuffed crust base.',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=800&auto=format&fit=crop',
    calories: '960 kcal',
    prepTime: '18 min',
    variants: [
      { id: 'md', name: 'Medium 12"', priceModifier: 0 },
      { id: 'lg', name: 'Large 14"', priceModifier: 490 }
    ]
  },

  // BURGERS (Realistic PKR fast-food prices: Rs. 490 - Rs. 890)
  {
    id: 'bg-zinger-stacker',
    name: 'Ultimate Zinger Double Stacker',
    category: 'burgers',
    subCategory: 'Crispy Zinger Stackers',
    tag: 'Bestseller',
    price: 690,
    rating: 4.95,
    reviewsCount: 520,
    spiceLevel: 'spicy',
    description: 'Two extra-crunchy secret-recipe spicy chicken fillets, double cheddar slice, tangy slaw, and signature Food Cart crunch sauce on brioche.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop',
    calories: '820 kcal',
    prepTime: '12 min',
    variants: [
      { id: 'single', name: 'Single Patty', priceModifier: -150 },
      { id: 'double', name: 'Double Stacker', priceModifier: 0 },
      { id: 'monster', name: 'Triple Monster Stacker', priceModifier: 200 }
    ]
  },
  {
    id: 'bg-smash-beef-bacon',
    name: 'Smokey Smash Beef & Crisp Bacon',
    category: 'burgers',
    subCategory: 'Smash Beef',
    tag: "Chef's Pick",
    price: 790,
    rating: 4.9,
    reviewsCount: 310,
    spiceLevel: 'mild',
    description: 'Seared Angus beef smash patties with lacy crispy edges, melted American cheese, smoked beef bacon, grilled onions, and truffle aioli.',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=800&auto=format&fit=crop',
    calories: '890 kcal',
    prepTime: '14 min',
    variants: [
      { id: 'double', name: 'Double Smash (Standard)', priceModifier: 0 },
      { id: 'triple', name: 'Triple Smash King', priceModifier: 200 }
    ]
  },
  {
    id: 'bg-grilled-peri-breast',
    name: 'Char-Grilled Peri Chicken Breast',
    category: 'burgers',
    subCategory: 'Grilled Chicken',
    tag: 'New',
    price: 590,
    rating: 4.82,
    reviewsCount: 175,
    spiceLevel: 'spicy',
    description: 'Flame-grilled marinated chicken breast fillet, fresh avocado slice, crisp lettuce, tomato, and tangy herb mayo.',
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?q=80&w=800&auto=format&fit=crop',
    calories: '620 kcal',
    prepTime: '12 min',
    variants: [
      { id: 'single', name: 'Single Fillet', priceModifier: 0 },
      { id: 'double', name: 'Double Fillet', priceModifier: 160 }
    ]
  },
  {
    id: 'bg-mini-sliders-trio',
    name: 'Gourmet Mini Sliders Trio',
    category: 'burgers',
    subCategory: 'Mini Sliders',
    tag: 'Popular',
    price: 850,
    rating: 4.86,
    reviewsCount: 210,
    spiceLevel: 'mild',
    description: 'Trio of mini brioche burgers: 1x Smash Beef, 1x Crispy Zinger, and 1x BBQ Pulled Beef slider.',
    image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?q=80&w=800&auto=format&fit=crop',
    calories: '750 kcal',
    prepTime: '12 min',
    variants: [
      { id: 'trio', name: '3 Sliders Box', priceModifier: 0 },
      { id: 'box6', name: '6 Sliders Party Box', priceModifier: 550 }
    ]
  },

  // CRISPY CHICKEN (Realistic PKR prices: Rs. 550 - Rs. 1,890)
  {
    id: 'ck-family-bucket-8pcs',
    name: 'Mega Crunch Bucket (8 Pcs)',
    category: 'chicken',
    subCategory: 'Fried Chicken Buckets',
    tag: 'Bestseller',
    price: 1890,
    rating: 4.96,
    reviewsCount: 680,
    spiceLevel: 'spicy',
    description: '8 pieces of hand-breaded, 11-secret spice pressure-fried chicken with 2 garlic dips and large slaw.',
    image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?q=80&w=800&auto=format&fit=crop',
    calories: '1850 kcal',
    prepTime: '15 min',
    variants: [
      { id: 'mix', name: '50/50 Original & Spicy Mix', priceModifier: 0 },
      { id: 'all-spicy', name: 'All Fiery Spicy', priceModifier: 80 },
      { id: 'all-original', name: 'All Golden Original', priceModifier: 0 }
    ]
  },
  {
    id: 'ck-hot-wings-12pcs',
    name: 'Inferno Hot Wings (12 Pcs)',
    category: 'chicken',
    subCategory: 'Hot Wings',
    tag: 'Hot & Spicy',
    price: 1090,
    rating: 4.88,
    reviewsCount: 390,
    spiceLevel: 'fiery',
    description: '12 crispy wingettes & drummettes tossed in glazed hot honey butter and buffalo spices.',
    image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?q=80&w=800&auto=format&fit=crop',
    calories: '920 kcal',
    prepTime: '14 min',
    variants: [
      { id: 'w6', name: '6 Pcs Wings', priceModifier: -450 },
      { id: 'w12', name: '12 Pcs Wings', priceModifier: 0 },
      { id: 'w18', name: '18 Pcs Party Wings', priceModifier: 450 }
    ]
  },
  {
    id: 'ck-tenders-strip-box',
    name: 'Golden Tenders Dipping Box (6 Pcs)',
    category: 'chicken',
    subCategory: 'Crispy Tenders',
    tag: "Chef's Pick",
    price: 890,
    rating: 4.89,
    reviewsCount: 295,
    spiceLevel: 'mild',
    description: '100% tender chicken breast strips breaded in cornflake crunch. Includes 3 signature dipping sauces.',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=800&auto=format&fit=crop',
    calories: '780 kcal',
    prepTime: '10 min',
    variants: [
      { id: 't4', name: '4 Pcs Box', priceModifier: -250 },
      { id: 't6', name: '6 Pcs Box', priceModifier: 0 },
      { id: 't10', name: '10 Pcs Box', priceModifier: 390 }
    ]
  },
  {
    id: 'ck-popcorn-bites-bucket',
    name: 'Crispy Popcorn Chicken Bites',
    category: 'chicken',
    subCategory: 'Popcorn Bites',
    tag: 'New',
    price: 550,
    rating: 4.79,
    reviewsCount: 160,
    spiceLevel: 'spicy',
    description: 'Bite-sized seasoned chicken popcorn nuggets fried to golden perfection with honey mustard dip.',
    image: 'https://images.unsplash.com/photo-1560684352-8497838a2229?q=80&w=800&auto=format&fit=crop',
    calories: '520 kcal',
    prepTime: '8 min',
    variants: [
      { id: 'reg', name: 'Regular Bucket', priceModifier: 0 },
      { id: 'jumbo', name: 'Jumbo Bucket', priceModifier: 240 }
    ]
  },

  // LOADED FRIES & SIDES (Realistic PKR prices: Rs. 390 - Rs. 650)
  {
    id: 'fr-cheesy-jalapeno-loaded',
    name: 'Monster Cheesy Jalapeño Fries',
    category: 'sides',
    subCategory: 'Cheesy Jalapeño',
    tag: 'Bestseller',
    price: 590,
    rating: 4.92,
    reviewsCount: 480,
    spiceLevel: 'spicy',
    description: 'Crispy crinkle fries smothered in liquid cheddar, chopped zinger bites, pickled jalapeños, and green onions.',
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?q=80&w=800&auto=format&fit=crop',
    calories: '620 kcal',
    prepTime: '8 min',
    variants: [
      { id: 'reg', name: 'Regular Size', priceModifier: 0 },
      { id: 'share', name: 'Monster Sharing Tray', priceModifier: 260 }
    ]
  },
  {
    id: 'fr-dynamite-fries-box',
    name: 'Dynamite Sriracha Loaded Fries',
    category: 'sides',
    subCategory: 'Dynamite Fries',
    tag: 'Hot & Spicy',
    price: 650,
    rating: 4.87,
    reviewsCount: 220,
    spiceLevel: 'fiery',
    description: 'Seasoned waffle fries topped with spicy dynamite mayo sauce, shredded beef bacon, and crispy fried garlic chips.',
    image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?q=80&w=800&auto=format&fit=crop',
    calories: '680 kcal',
    prepTime: '8 min',
    variants: [
      { id: 'reg', name: 'Regular Size', priceModifier: 0 },
      { id: 'lg', name: 'Large Size', priceModifier: 200 }
    ]
  },
  {
    id: 'fr-mozzarella-sticks-6',
    name: 'Oozing Mozzarella Cheese Sticks (6 Pcs)',
    category: 'sides',
    subCategory: 'Mozzarella Sticks',
    tag: "Chef's Pick",
    price: 520,
    rating: 4.85,
    reviewsCount: 310,
    spiceLevel: 'mild',
    description: 'Golden Italian-herb breaded mozzarella cheese sticks served hot with warm marinara dipping sauce.',
    image: 'https://images.unsplash.com/photo-1531749668029-2db88e4276c7?q=80&w=800&auto=format&fit=crop',
    calories: '490 kcal',
    prepTime: '6 min',
    variants: [
      { id: 'pcs6', name: '6 Pcs Box', priceModifier: 0 },
      { id: 'pcs10', name: '10 Pcs Mega Box', priceModifier: 280 }
    ]
  },
  {
    id: 'fr-onion-rings-basket',
    name: 'Beer-Battered Onion Rings Basket',
    category: 'sides',
    subCategory: 'Onion Rings',
    tag: 'New',
    price: 390,
    rating: 4.75,
    reviewsCount: 150,
    spiceLevel: 'mild',
    description: 'Thick sliced sweet onions in light crisp batter, served piping hot with smoked paprika dip.',
    image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?q=80&w=800&auto=format&fit=crop',
    calories: '450 kcal',
    prepTime: '6 min',
    variants: [
      { id: 'reg', name: 'Regular Basket', priceModifier: 0 },
      { id: 'lg', name: 'Large Basket', priceModifier: 150 }
    ]
  },

  // PLATTERS (Realistic PKR prices: Rs. 2,490 - Rs. 2,690)
  {
    id: 'pl-sizzling-beef-steak',
    name: 'Sizzling Peppered Ribeye Steak Platter',
    category: 'platters',
    subCategory: 'Peppered Ribeye',
    tag: "Chef's Pick",
    price: 2490,
    rating: 4.97,
    reviewsCount: 175,
    spiceLevel: 'mild',
    description: '250g grilled grass-fed ribeye steak served on a hot skillet with cracked peppercorn mushroom gravy, garlic wedges, and corn.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop',
    calories: '1150 kcal',
    prepTime: '20 min',
    variants: [
      { id: 'med-rare', name: 'Medium Rare', priceModifier: 0 },
      { id: 'med-well', name: 'Medium Well', priceModifier: 0 }
    ]
  },
  {
    id: 'pl-bbq-ribs-chicken-combo',
    name: 'Smokey BBQ Ribs & Wings Platter',
    category: 'platters',
    subCategory: 'Smokey Ribs',
    tag: 'Bestseller',
    price: 2690,
    rating: 4.93,
    reviewsCount: 198,
    spiceLevel: 'spicy',
    description: 'Half rack of fall-off-the-bone smoked beef ribs glaze, 4 crispy wings, onion rings, coleslaw, and waffle fries.',
    image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?q=80&w=800&auto=format&fit=crop',
    calories: '1380 kcal',
    prepTime: '22 min',
    variants: [
      { id: 'std', name: 'Standard Platter', priceModifier: 0 },
      { id: 'xl', name: 'XL Feast Platter', priceModifier: 600 }
    ]
  },

  // DRINKS & SHAKES (Realistic PKR prices: Rs. 590)
  {
    id: 'dr-nutella-brownie-shake',
    name: 'Monster Nutella & Fudge Brownie Shake',
    category: 'drinks',
    subCategory: 'Gourmet Shakes',
    tag: 'Bestseller',
    price: 590,
    rating: 4.94,
    reviewsCount: 540,
    spiceLevel: 'none',
    description: 'Thick Belgian chocolate ice cream blended with Nutella, topped with whipped cream, hot fudge, and a warm brownie cube.',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=800&auto=format&fit=crop',
    calories: '680 kcal',
    prepTime: '5 min',
    variants: [
      { id: 'reg', name: 'Regular 16oz', priceModifier: 0 },
      { id: 'jumbo', name: 'Jumbo Monster 24oz', priceModifier: 160 }
    ]
  },
  {
    id: 'dr-molten-lava-cake',
    name: 'Warm Lava Cake with Vanilla Gelato',
    category: 'drinks',
    subCategory: 'Desserts & Lava Cake',
    tag: "Chef's Pick",
    price: 590,
    rating: 4.88,
    reviewsCount: 210,
    spiceLevel: 'none',
    description: 'Decadent dark chocolate molten sponge cake with liquid fudge center. Served hot with a scoop of vanilla gelato.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=800&auto=format&fit=crop',
    calories: '550 kcal',
    prepTime: '8 min',
    variants: [
      { id: 'single', name: 'Single Lava Cake', priceModifier: 0 },
      { id: 'double', name: 'Duo Lava Cake', priceModifier: 450 }
    ]
  }
];
