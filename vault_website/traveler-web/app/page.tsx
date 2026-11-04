"use client";
import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ASIA_DATA_VAULT } from "./AsiaData"; 

const CATEGORIES = ["Mountains", "Coastal", "City Vibes", "Hiking", "Party"];

// FULL SCALE ANIMATION VARIANTS
const containerVars: Variants = {
  hidden: { 
    opacity: 0 
  },
  visible: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.3, 
      delayChildren: 0.4 
    }
  },
  exit: { 
    opacity: 0, 
    transition: { duration: 0.6 } 
  }
};

const itemVars: Variants = {
  hidden: { 
    opacity: 0, 
    y: 40 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 1.4, 
      ease: [0.22, 1, 0.36, 1] 
    }
  }
};

export default function MasterAsiaPlatform() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [activeCat, setActiveCat] = useState("");
  
  // PLANNER SYSTEM STATES
  const [showPlanner, setShowPlanner] = useState<string | null>(null);
  const [days, setDays] = useState(1);
  const [itinerary, setItinerary] = useState<any>(null);

  const handleSearch = (selectedCat?: string, isCategoryClick: boolean = false) => {
    if (isCategoryClick && selectedCat) {
      setActiveCat(selectedCat);
      return; 
    }

    if (query.trim() === "" && activeCat === "") {
      setResults(null);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      try {
        const data = ASIA_DATA_VAULT.fetch(query, activeCat);
        setResults(data);
      } catch (err) {
        console.error("Fetch error:", err);
      }
      setLoading(false);
    }, 800);
  };

  const generatePlan = (districtData: any) => {
    const plan = [];
    const totalVisits = districtData.mustVisit.length;
    const totalStays = districtData.stayOptions.length;
    const itemsPerDay = Math.ceil(totalVisits / days); 
    
    for (let i = 0; i < days; i++) {
      plan.push({
        day: i + 1,
        stay: districtData.stayOptions[i % totalStays], 
        visits: districtData.mustVisit.slice(i * itemsPerDay, (i + 1) * itemsPerDay),
        hidden: districtData.hiddenPlaces.slice(i * itemsPerDay, (i + 1) * itemsPerDay),
        food: districtData.mustTryFood.slice(i * itemsPerDay, (i + 1) * itemsPerDay),
      });
    }
    setItinerary(plan);
  };

  return (
    <main className="relative min-h-screen text-[#111] font-sans bg-white overflow-x-hidden selection:bg-blue-100">
      
      {/* FIXED 4K MAIN BACKGROUND */}
      <div className="fixed inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2400&q=100" 
          className="w-full h-full object-cover opacity-100"
          alt="Sharp Landscape"
        />
        <div className="absolute inset-0 bg-white/15" />
      </div>

      {/* FULL NAVIGATION COMPONENT */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.8, ease: "circOut" }}
        className="fixed top-0 w-full z-[100] px-12 py-8 flex justify-between items-center bg-white/40 backdrop-blur-md border-b border-black/5"
      >
        <div className="text-lg font-[900] tracking-tighter uppercase italic text-black font-black">VOYAGER.</div>
        <div className="hidden lg:flex gap-10 text-[9px] font-black uppercase tracking-[0.4em] text-black italic">
          <span>Expedia Rapid</span> <span>Amadeus</span> <span>UN Tourism</span> <span>GIATA</span>
        </div>
        <div className="text-[10px] font-black border-2 border-black text-black px-5 py-2 rounded-full uppercase tracking-widest italic">
          PLATFORM v15.0
        </div>
      </motion.nav>

      <div className="relative z-10 pt-56 px-6 max-w-7xl mx-auto">
        
        {/* HERO SECTION */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 2, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h1 className="text-[8vw] font-[1000] leading-none tracking-tighter uppercase mb-6 text-black italic drop-shadow-[0_5px_15px_rgba(255,255,255,0.8)]">
            VOYAGER<span className="text-blue-600">.</span>
          </h1>
          <p className="text-[10px] uppercase tracking-[0.8em] text-black font-black italic opacity-90">
            Continental Intelligence • Categorized Discovery
          </p>
        </motion.div>

        {/* CATEGORY SELECTOR SYSTEM */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {CATEGORIES.map((cat) => (
            <button 
              key={cat}
              onClick={() => handleSearch(cat, true)} 
              className={`px-10 py-4 rounded-full text-[11px] font-black uppercase tracking-[0.2em] transition-all shadow-xl ${
                activeCat === cat ? 'bg-black text-white shadow-2xl' : 'bg-white/90 text-black border border-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* SEARCH INTERFACE WITH HIGH-VISIBILITY GUIDANCE */}
        <div className="max-w-2xl mx-auto mb-32">
          
          {/* ENHANCED VISIBILITY GUIDANCE MESSAGE */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-6"
          >
            <p className="bg-white/80 backdrop-blur-sm px-6 py-2 rounded-full text-[10px] font-[1000] uppercase tracking-[0.4em] italic text-black shadow-lg border border-black/5">
              SEARCH BY <span className="text-blue-700 underline underline-offset-4">NEAREST DISTRICT</span> FOR INTELLIGENCE
            </p>
          </motion.div>
          
          <div className="flex bg-white/95 border border-white rounded-full p-1.5 shadow-[0_30px_60px_rgba(0,0,0,0.15)]">
            <input 
              type="text" value={query} onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter District Name..."
              className="flex-1 bg-transparent px-10 py-5 outline-none text-[15px] text-black font-bold tracking-tight"
            />
            <button onClick={() => handleSearch()} className="px-12 bg-black text-white font-black uppercase text-[11px] tracking-[0.2em] rounded-full hover:bg-blue-600 transition-all font-black">
              {loading ? "..." : "EXPLORE"}
            </button>
          </div>
        </div>

        {/* ASIA DATA VAULT DISPLAY ENGINE */}
        <AnimatePresence mode="wait">
          {results && results.stays && results.stays.length > 0 && (
            <motion.div 
              key={activeCat + query}
              variants={containerVars} initial="hidden" animate="visible" exit="exit"
              className="pb-60"
            >
              {results.stays.map((s: any, i: number) => (
                <div key={s.id || i}>
                  <motion.div variants={itemVars} className="flex flex-col items-center mb-24 text-center">
                    <span className="text-[13px] bg-black text-white px-8 py-3 rounded-full font-black uppercase tracking-[0.3em] mb-10 italic shadow-2xl">
                      {s.statusTag} • {s.weather}
                    </span>
                    <h2 className="text-7xl font-[1000] text-black uppercase italic tracking-tighter leading-none">{s.name}</h2>
                    <p className="text-[18px] text-blue-700 font-[900] uppercase tracking-widest mt-6 italic">{s.location}</p>
                  </motion.div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-32">
                    <motion.div variants={itemVars} whileHover={{ y: -15 }} className="bg-white/95 backdrop-blur-3xl p-14 rounded-[60px] border border-white shadow-xl">
                      <span className="text-[12px] font-black uppercase text-black/20 block mb-12 tracking-[0.5em]">01. The Stays</span>
                      <div className="space-y-6">
                        {s.stayOptions?.map((stay: string, idx: number) => (
                          <p key={idx} className="text-[16px] font-[900] italic uppercase tracking-tight text-black">• {stay}</p>
                        ))}
                      </div>
                    </motion.div>
                    <motion.div variants={itemVars} whileHover={{ y: -15 }} className="bg-white/95 backdrop-blur-3xl p-14 rounded-[60px] border border-white shadow-xl">
                      <span className="text-[12px] font-black uppercase text-black/20 block mb-12 tracking-[0.5em]">02. Must Visit</span>
                      <div className="space-y-6">
                        {s.mustVisit?.map((item: string, idx: number) => (
                          <p key={idx} className="text-[16px] font-[900] italic uppercase tracking-tight text-black">• {item}</p>
                        ))}
                      </div>
                    </motion.div>
                    <motion.div variants={itemVars} whileHover={{ y: -15 }} className="bg-white/95 backdrop-blur-3xl p-14 rounded-[60px] border border-white shadow-xl">
                      <span className="text-[12px] font-black uppercase text-black/20 block mb-12 tracking-[0.5em]">03. Hidden Gems</span>
                      <div className="space-y-6">
                        {s.hiddenPlaces?.map((item: string, idx: number) => (
                          <p key={idx} className="text-[16px] font-[900] italic uppercase tracking-tight text-black">• {item}</p>
                        ))}
                      </div>
                    </motion.div>
                    <motion.div variants={itemVars} whileHover={{ y: -15 }} className="bg-white/95 backdrop-blur-3xl p-14 rounded-[60px] border border-white shadow-xl">
                      <span className="text-[12px] font-black uppercase text-black/20 block mb-12 tracking-[0.5em]">04. Local Food</span>
                      <div className="space-y-6">
                        {s.mustTryFood?.map((item: string, idx: number) => (
                          <p key={idx} className="text-[16px] font-[900] italic uppercase tracking-tight text-blue-700">• {item}</p>
                        ))}
                      </div>
                    </motion.div>
                    <motion.div variants={itemVars} whileHover={{ y: -15 }} className="bg-white/95 backdrop-blur-3xl p-14 rounded-[60px] border border-white shadow-xl lg:col-span-2">
                      <span className="text-[12px] font-black uppercase text-black/20 block mb-12 tracking-[0.5em]">05. Transit & Travel</span>
                      <p className="text-[16px] font-[900] text-black italic uppercase leading-relaxed tracking-tight">{s.travelType || "Optimized for Mobility."}</p>
                    </motion.div>
                  </div>

                  {s.plannerEnabled && (
                    <motion.div variants={itemVars} className="w-full flex justify-center mt-20 px-6">
                      <button 
                        onClick={() => setShowPlanner(s.name)}
                        className="w-full max-w-6xl min-h-[100px] bg-black text-white rounded-[40px] shadow-2xl flex items-center justify-center text-center px-10 py-8 transition-all font-black uppercase tracking-[0.4em] italic"
                      >
                        LAUNCH CUSTOM TRIP PLANNER FOR {s.name.toUpperCase()}
                      </button>
                    </motion.div>
                  )}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* FULL SCALE ALTERNATING GUIDE OVERLAY */}
      <AnimatePresence>
        {showPlanner && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: 50 }}
            className="fixed inset-0 z-[200] bg-black/80 flex flex-col items-center p-10 overflow-y-auto"
          >
            <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center">
              <button 
                onClick={() => { setShowPlanner(null); setItinerary(null); }}
                className="self-end text-[10px] font-black border-2 border-black px-6 py-2 rounded-full uppercase tracking-widest italic bg-white shadow-xl"
              >
                CLOSE GUIDE [X]
              </button>
              
              {!itinerary ? (
                // INPUT SCREEN
                <div className="relative max-w-4xl w-full text-center mt-32 p-16 bg-white rounded-[60px] shadow-2xl overflow-hidden">
                  <div className="absolute inset-0 z-0">
                    <img 
                      src="https://images.unsplash.com/photo-1733169312713-fd0c6963487a?q=100&auto=format&fit=crop&w=2400" 
                      className="w-full h-full object-cover" alt="Guide Backdrop"
                    />
                    <div className="absolute inset-0 bg-white/70" />
                  </div>
                  <div className="relative z-10">
                    <span className="text-blue-600 font-black uppercase tracking-[0.5em] text-[12px] mb-4 block italic">Intelligence Module</span>
                    <h2 className="text-6xl font-[1000] italic uppercase tracking-tighter mb-12">PLANNING: {showPlanner}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left mb-16">
                      <div className="border-b-2 border-black/10 py-4">
                        <label className="text-[9px] font-black uppercase tracking-widest opacity-40">Number of Days</label>
                        <input type="number" value={days} onChange={(e) => setDays(Number(e.target.value))} className="w-full bg-transparent text-3xl font-black outline-none py-2" />
                      </div>
                      <div className="border-b-2 border-black/10 py-4">
                        <label className="text-[9px] font-black uppercase tracking-widest opacity-40">Party Size</label>
                        <input type="text" placeholder="02 ADULTS" className="w-full bg-transparent text-3xl font-black outline-none py-2" />
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        const active = results.stays.find((s: any) => s.name === showPlanner);
                        generatePlan(active);
                      }}
                      className="bg-black text-white px-24 py-10 rounded-full font-black uppercase tracking-[0.4em] italic shadow-2xl"
                    >
                      GENERATE SECURE GUIDE
                    </button>
                  </div>
                </div>
              ) : (
                // ITINERARY RESULT VIEW
                <div className="w-full mt-20 pb-40 overflow-hidden rounded-[80px] shadow-3xl bg-white">
                  <div className="p-20 bg-white border-b border-black/5">
                    <span className="text-blue-600 font-black uppercase tracking-[0.5em] text-[12px] mb-4 block italic">Official Itinerary Report</span>
                    <h2 className="text-5xl font-[1000] italic uppercase tracking-tighter mb-20 border-b-8 border-black pb-8 text-black uppercase leading-tight">
                      {showPlanner}
                    </h2>
                  </div>
                  
                  <div className="space-y-0">
                    {itinerary.map((d: any, idx: number) => {
                      const isOdd = idx % 2 === 0;
                      
                      return (
                        <div key={d.day} className="grid grid-cols-1 md:grid-cols-4 gap-12 p-20 relative border-b border-black/5 last:border-0">
                          
                          {/* ALTERNATING SHARP BACKGROUND */}
                          <div className="absolute inset-0 z-0">
                            {isOdd ? (
                              <>
                                <img 
                                  src="https://images.unsplash.com/photo-1733169312713-fd0c6963487a?q=100&auto=format&fit=crop&w=2400" 
                                  className="w-full h-full object-cover" 
                                  alt={`Day ${d.day}`}
                                />
                                <div className="absolute inset-0 bg-white/75" />
                              </>
                            ) : (
                              <div className="w-full h-full bg-white" />
                            )}
                          </div>
                          
                          <div className="relative z-10 md:col-start-1 md:col-end-2">
                            <div className="text-[12rem] font-[1000] opacity-10 leading-none sticky top-20 text-black">
                              0{d.day}
                            </div>
                          </div>
                          
                          <div className="relative z-10 md:col-span-3 space-y-12">
                            <div>
                              <h3 className="text-blue-600 font-black text-[12px] uppercase tracking-widest mb-4 italic">Recommended Luxury Node</h3>
                              <p className="text-2xl font-[1000] uppercase italic tracking-tighter leading-tight text-black">• {d.stay}</p>
                            </div>
                            <div>
                              <h3 className="text-black/30 font-black text-[12px] uppercase tracking-widest mb-4 italic">Core Destinations</h3>
                              <p className="text-2xl font-[1000] uppercase italic tracking-tighter leading-tight text-black">{d.visits.join(" • ")}</p>
                            </div>
                            <div>
                              <h3 className="text-black/30 font-black text-[12px] uppercase tracking-widest mb-4 italic">Hidden Intelligence Nodes</h3>
                              <p className="text-2xl font-[1000] uppercase italic tracking-tighter text-black/50 leading-tight">{d.hidden.join(" • ")}</p>
                            </div>
                            <div>
                              <h3 className="text-black font-black text-[12px] uppercase tracking-widest mb-4 italic">Culinary Node</h3>
                              <p className="text-xl font-[1000] uppercase italic tracking-tighter underline underline-offset-8 leading-tight text-black">{d.food.join(" & ")}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}