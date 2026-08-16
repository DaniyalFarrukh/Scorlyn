"use client";
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Check, ChevronDown, Minus, Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';

const sharedFeatures = [
  "The scoreboard",
  "Wireless button (paired, with battery)",
  "Two contactless IR sensors",
  "Side mounting brackets and fixings",
  "Power lead and charger"
];

const hardwareSpecs = [
  { label: "Display", value: "P5 LED matrix, 64 × 32, red/blue dual score" },
  { label: "Display area", value: "576 × 288 mm" },
  { label: "Dimensions", value: "640 × 350 × 80 mm" },
  { label: "Weight", value: "~4.5 kg" },
  { label: "Enclosure", value: "1.5 mm powder-coated mild steel, matte black" },
  { label: "Mounting", value: "Side brackets — wall or pole" },
  { label: "Weatherproofing", value: "IP54, vented, rated for outdoor courts" },
  { label: "Power", value: "Mains via bottom cable entry; optional battery ~4 hrs" },
  { label: "Controls", value: "Bluetooth wireless button + two contactless sensors" },
  { label: "Servicing", value: "Removable rear panel" }
];

const products = [
  {
    id: "scorlyn",
    name: "SCORLYN",
    label: "Standalone Setup",
    desc: "A straightforward single-court scoreboard setup",
    features: [
      "No network or app required",
      "5 built-in game modes",
      "Updates over Wi-Fi when connected",
      "1-year manufacturer warranty"
    ],
    price: "Rs 32,000",
    cta: "ADD TO CART",
    specifications: [
      { label: "Game modes", value: "Points & Sets, Timed, Tie-break, Training, Court timer" },
      { label: "Connectivity", value: "Wi-Fi for over-the-air updates only" },
      { label: "Warranty", value: "1-year manufacturer warranty" },
      ...hardwareSpecs
    ]
  }
];

const Accordion = ({ title, children }: { title: string, children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-t border-black/10 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left font-bold uppercase tracking-wider text-black text-sm"
      >
        {title}
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <ChevronDown size={16} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-6 pb-2">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const ProductTiers = () => {
  const [activeId, setActiveId] = useState("scorlyn");
  const activeProduct = products.find(p => p.id === activeId)!;
  const [quantity, setQuantity] = useState(1);
  const [powerOption, setPowerOption] = useState("Mains");
  const [isSpecsOpen, setIsSpecsOpen] = useState(false);
  
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    // Parse numeric price for calculation (e.g., "Rs 32,000" -> 32000)
    const numericPrice = parseInt(activeProduct.price.replace(/[^0-9]/g, ''), 10);
    
    addToCart({
      id: `${activeProduct.id}-${powerOption.toLowerCase().replace(/[^a-z]/g, '')}`,
      productId: activeProduct.id,
      name: activeProduct.name,
      price: activeProduct.price,
      numericPrice: numericPrice,
      quantity: quantity,
      powerOption: activeProduct.id === "club" ? powerOption : undefined,
      image: '/scoreboard-front.png'
    });
  };

  // Filter out duplicate servicing if overridden for club
  const uniqueSpecs = activeProduct.specifications?.reduce((acc, current) => {
    const x = acc.find(item => item.label === current.label);
    if (!x) {
      return acc.concat([current]);
    } else {
      x.value = current.value; // override with latest
      return acc;
    }
  }, [] as { label: string, value: string }[]);

  return (
    <>
      <section id="models" className="relative z-20 py-24 md:py-32 border-t border-black/5 bg-brand-cream overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 relative z-10">

          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase text-black mb-8">
              Choose Your Scorlyn
            </h2>

            {/* Product Selector */}
            {products.length > 1 && (
              <div
                role="tablist"
                className="flex flex-col sm:flex-row justify-center gap-2 max-w-2xl mx-auto"
              >
                {products.map(product => {
                  const isActive = activeId === product.id;
                  return (
                    <button
                      key={product.id}
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => {
                        setActiveId(product.id);
                        setQuantity(1);
                        setPowerOption("Mains");
                      }}
                      className={cn(
                        "px-6 py-3 rounded-full font-bold uppercase tracking-wider text-sm transition-all duration-300 border outline-none focus-visible:ring-2 focus-visible:ring-black",
                        isActive
                          ? "bg-black text-brand-cream border-black shadow-md scale-105"
                          : "bg-transparent text-gray-500 border-black/10 hover:border-black/30 hover:text-black"
                      )}
                    >
                      {product.name}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Dynamic Showcase Panel */}
          <div className="bg-brand-cream border border-black/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] rounded-[2rem] overflow-hidden min-h-[600px] flex flex-col lg:flex-row mb-12 relative">

            {/* Left: Content */}
            <div className="w-full lg:w-[45%] p-8 lg:p-12 flex flex-col justify-center relative bg-white z-10 overflow-y-auto max-h-[800px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProduct.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="flex flex-col h-full"
                >
                  <div className="text-xs font-black uppercase tracking-widest text-black/50 mb-2">
                    {activeProduct.label}
                  </div>
                  <h3 className="text-4xl lg:text-5xl font-black tracking-tighter uppercase text-black mb-4">
                    {activeProduct.name}
                  </h3>
                  <p className="text-gray-700 text-lg font-medium leading-relaxed mb-8">
                    {activeProduct.desc}
                  </p>

                  {activeProduct.featuresDetailed ? (
                    <div className="mb-10 flex-grow space-y-6">
                      <h4 className="text-xs font-black uppercase tracking-widest text-black/40 mb-4">
                        Everything Scorlyn Club gives you
                      </h4>
                      {activeProduct.featuresDetailed.map((feature, idx) => (
                        <div key={idx} className="text-black">
                          <div className="font-bold mb-1 flex gap-2 items-center">
                            <Check size={16} className="text-[#ccff00]" />
                            {feature.title}
                          </div>
                          <div className="text-gray-600 text-sm ml-6">{feature.desc}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <ul className="space-y-4 mb-10 flex-grow">
                      {activeProduct.features?.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-black font-medium">
                          <Check size={20} className="text-[#ccff00] flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="border-t border-black/10 pt-8 mt-auto">
                    <div className="text-3xl font-bold mb-6 font-mono tracking-tight text-black">
                      {activeProduct.price}
                    </div>

                    {activeProduct.id === "club" && (
                      <div className="mb-6 space-y-4">
                        <div>
                          <span className="text-xs font-black uppercase tracking-widest text-black/40 block mb-2">Power</span>
                          <div className="flex flex-wrap gap-2">
                            {["Mains", "Mains + battery backup"].map(opt => (
                              <button
                                key={opt}
                                onClick={() => setPowerOption(opt)}
                                className={cn(
                                  "px-4 py-2 rounded-full border text-sm font-medium transition-colors",
                                  powerOption === opt ? "border-black bg-black text-white" : "border-black/10 text-gray-600 hover:border-black/30"
                                )}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          <span className="text-sm font-medium text-gray-600">In stock</span>
                        </div>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-4 mb-4">
                      {activeProduct.id === "club" && (
                        <div className="flex items-center border border-black/20 rounded-full px-4 py-3 gap-6">
                          <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-gray-500 hover:text-black">
                            <Minus size={16} />
                          </button>
                          <span className="font-bold w-4 text-center">{quantity}</span>
                          <button onClick={() => setQuantity(quantity + 1)} className="text-gray-500 hover:text-black">
                            <Plus size={16} />
                          </button>
                        </div>
                      )}

                      <button 
                        onClick={handleAddToCart}
                        className="flex-1 px-10 py-4 rounded-full border border-black font-bold uppercase tracking-widest text-sm bg-transparent text-black hover:bg-black hover:text-brand-cream transition-all duration-300 flex justify-center items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black"
                      >
                        {activeProduct.cta}
                        <span>→</span>
                      </button>
                    </div>

                    <button
                      onClick={() => setIsSpecsOpen(true)}
                      className="text-sm font-bold uppercase tracking-wider text-black underline underline-offset-4 mb-6 hover:text-gray-600 transition-colors inline-block"
                    >
                      View full specifications
                    </button>

                    {activeProduct.subtext && (
                      <p className="text-xs text-gray-500 mb-6">{activeProduct.subtext}</p>
                    )}

                    {activeProduct.inTheBox && (
                      <Accordion title="In the box">
                        <ul className="space-y-3">
                          {activeProduct.inTheBox.map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                              <Check size={16} className="text-[#ccff00] flex-shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </Accordion>
                    )}

                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right: Visual */}
            <div className="w-full lg:w-[55%] bg-black/5 flex items-center justify-center p-8 relative overflow-hidden lg:border-l border-black/10 min-h-[400px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeProduct.id}-visual`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="w-full flex items-center justify-center cursor-pointer"
                  onClick={() => setIsSpecsOpen(true)}
                >
                  <div className="w-full aspect-[4/3] md:aspect-video relative rounded-2xl overflow-hidden shadow-2xl group">
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 z-10 flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 bg-black text-white text-sm font-bold uppercase tracking-widest px-6 py-3 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        View Specs
                      </span>
                    </div>
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover"
                    >
                      <source src="/hero-bg1.mp4" type="video/mp4" />
                    </video>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Shared Features Row */}
          <div className="pt-8 border-t border-black/10 max-w-4xl mx-auto">
            <div className="text-center text-xs font-black uppercase tracking-widest text-black/40 mb-6">
              Included with every Scorlyn
            </div>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
              {sharedFeatures.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm text-black font-medium">
                  <Check size={16} className="text-black/30 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Full-Screen Specifications Modal */}
      <AnimatePresence>
        {isSpecsOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6"
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsSpecsOpen(false)} />

            <div className="relative z-10 w-full h-[100dvh] md:h-auto md:max-h-[90vh] max-w-5xl bg-brand-cream md:rounded-[2rem] shadow-2xl flex flex-col overflow-hidden">
              <button
                onClick={() => setIsSpecsOpen(false)}
                className="absolute top-4 right-4 md:top-8 md:right-8 w-12 h-12 flex items-center justify-center bg-black text-white rounded-full hover:bg-black/80 transition-colors z-20 shadow-lg"
              >
                <X size={24} />
              </button>

              <div className="flex-1 overflow-y-auto p-6 pt-20 pb-32 md:p-12 lg:p-16">
                <div className="max-w-4xl mx-auto">
                  <div className="mb-16">
                    <p className="text-gray-500 font-black tracking-widest text-sm mb-2 uppercase">Technical Specifications</p>
                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase text-black">{activeProduct.name}</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                    {/* General Specs */}
                    <div>
                      <h3 className="text-2xl font-black tracking-tighter uppercase mb-6 pb-2 border-b-2 border-black text-black">General</h3>
                      <div className="space-y-6">
                        {activeProduct.specifications.slice(0, 3).map((spec, idx) => (
                          <div key={idx}>
                            <p className="text-gray-500 font-bold text-xs uppercase tracking-widest mb-1">{spec.label}</p>
                            <p className="text-black font-medium text-lg leading-snug">{spec.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Hardware Specs */}
                    <div>
                      <h3 className="text-2xl font-black tracking-tighter uppercase mb-6 pb-2 border-b-2 border-black text-black">Hardware</h3>
                      <div className="space-y-6">
                        {activeProduct.specifications.slice(3).map((spec, idx) => (
                          <div key={idx}>
                            <p className="text-gray-500 font-bold text-xs uppercase tracking-widest mb-1">{spec.label}</p>
                            <p className="text-black font-medium text-lg leading-snug">{spec.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-16 text-center">
                    <button
                      onClick={() => setIsSpecsOpen(false)}
                      className="px-8 py-4 rounded-full bg-black text-white font-bold uppercase tracking-wider text-sm hover:bg-black/80 transition-colors"
                    >
                      Close Specifications
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
