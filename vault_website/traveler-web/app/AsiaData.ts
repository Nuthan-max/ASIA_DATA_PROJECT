// THE DATA VAULT - STATIC ARRAY
const allNodes = [
  { 
    name: "Idukki District Intelligence", 
    location: "Idukki, Kerala",
    category: "Mountains", 
    statusTag: "Verified Luxe", 
    weather: "Mist & Bloom | 18°C", 
    id: "VAULT-IND-001",
    // 6-8 PREMIUM STAYS (ARRAY FORMAT)
    stayOptions: [
      "Blanket Luxury Villa",
      "Fragrant Nature Munnar",
      "Chandys Windy Woods",
      "Elixir Hills Resort",
      "The Fog Munnar",
      "Spice Tree Resort",
      "Tall Trees Leisure",
      "Amber Dale Luxury Hotel"
    ],
    mustVisit: [
      "Eravikulam National Park", "Mattupetty Dam", "Top Station Viewpoint", 
      "Anamudi Peak", "Tea Museum Hub", "Echo Point", 
      "Kundala Glacial Lake", "Pothamedu View"
    ],
    hiddenPlaces: [
      "Attukad Secret Falls", "Lockhart Gap Cloud View", "Chinnar Wildlife Sanctuary", 
      "Anayirangal Elephant Node", "Kolukkumalai (Highest Tea Estate)", 
      "Meesapulimala Peak", "Thommankuthu 7-Step Falls"
    ],
    mustTryFood: [
      "Kerala Beef Ularthiyathu", "Munnar Cocoa Truffles", "Appam with Stew", 
      "Malabar Parotta", "Nadan Meen Curry", "Puttu Kadala", 
      "Pazham Pori", "Ela Ada (Steamed Rice)"
    ],
    travelType: "Optimized for Private 4x4 Snow Jeeps and high-altitude trekking nodes.",
    plannerEnabled: true
  },
  { 
    name: "Alappuzha District Intelligence", 
    location: "Alappuzha, Kerala",
    category: "Coastal", 
    statusTag: "Coastal Elite", 
    weather: "Tropical Humid | 29°C", 
    id: "VAULT-IND-002",
    stayOptions: [
      "Purity at Lake Vembanad",
      "Carnoustie Ayurveda & Wellness",
      "Raheem Residency",
      "Vasundhara Sarovar Premiere",
      "Lemon Tree Vembanad",
      "Ramada by Wyndham Alleppey",
      "Sterling Lake Palace",
      "The Zuri Kumarakom Node"
    ],
    mustVisit: [
      "Alappuzha Ancient Pier", "Vembanad Lake Node", "Marari Beach Shoreline", 
      "Pathiramanal Island", "Kuttanad Rice Bowl", "Ambalappuzha Temple", 
      "Arthunkal Basilica", "Revi Karunakaran Museum"
    ],
    hiddenPlaces: [
      "Thottappally Spillway", "Andhakaranazhi Lagoon", "Thumpoly Hidden Beach", 
      "Kayamkulam Backreach", "Mannarasala Sree Nagaraja", 
      "Pallathuruthy River Node", "Kodikunnil Secret Island"
    ],
    mustTryFood: [
      "Karimeen Pollichattu", "Alappuzha Duck Roast", "Prawn Coconut Roast", 
      "Toddy Shop Fish Curry", "Steamed Puttu", "Kuttanadan Mappas", 
      "Banana Leaf Sadya", "Fresh Sweet Toddy"
    ],
    travelType: [
      "Optimized for Luxury Houseboat Nodes and Shikkara Boat transit.",
      "Private Tourist Cabs",
      "Local KSRTC Green Buses",
      "Self-Drive Jeep Rentals",
      "Guided Trekking Routes",
      "Eco-Auto Rickshaws",
      "Bicycle Rentals",
      "Internal Shuttle Vans",
      "Motorcycle Rentals"
    ],
    plannerEnabled: true
  },
  { 
    name: "Ernakulam District Intelligence", 
    location: "Ernakulam, Kerala",
    category: "City Vibes", 
    statusTag: "Urban Elite", 
    weather: "Coastal Urban | 31°C", 
    id: "VAULT-IND-003",
    stayOptions: [
      "Grand Hyatt Kochi Bolgatty",
      "Taj Malabar Resort & Spa",
      "Kochi Marriott Hotel",
      "Le Méridien Kochi",
      "Brunton Boatyard",
      "Crowne Plaza Kochi",
      "Fragrant Nature Fort Kochi",
      "Radisson Blu Kochi"
    ],
    mustVisit: [
      "Fort Kochi Streets", "Mattancherry Dutch Palace", "Jewish Synagogue", 
      "Chinese Fishing Nets", "Marine Drive Promenade", "Lulu Mall Hub", 
      "Bolgatty Palace", "Hill Palace Museum"
    ],
    hiddenPlaces: [
      "Biennale Arts District", "Princess Street Boutiques", "Kochi Water Metro Route", 
      "Kadamakkudy Island Node", "Kumbalangi Village", 
      "Mangalavanam Bird Sanctuary", "Puthuvype Lighthouse"
    ],
    mustTryFood: [
      "Kochi Beef Kurumulaku", "Kappa Meen Mulakittathu", "Fort Kochi Grilled Snails", 
      "Street Style Shawarma", "Kayees Rahmathullah Biriyani", 
      "Pazham Pori Beef", "Kulikki Sarbath", "Traditional Sadya"
    ],
    travelType: "Optimized for Kochi Water Metro, Metro Rail, and heritage walking nodes.",
    plannerEnabled: true
  }
];

// THE SEARCH ENGINE
export const ASIA_DATA_VAULT = {
  fetch: (query: string, activeCat: string) => {
    return {
      stays: allNodes.filter(s => {
        const matchesQuery = query === "" || 
                             s.name.toLowerCase().includes(query.toLowerCase()) || 
                             s.location.toLowerCase().includes(query.toLowerCase());
        
        const matchesCategory = activeCat === "" || s.category === activeCat;
        
        return matchesQuery && matchesCategory;
      })
    };
  }
};

// default export for easy imports in components
export default allNodes;