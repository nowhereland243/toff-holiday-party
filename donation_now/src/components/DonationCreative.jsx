import React, { useEffect, useRef, useState } from 'react';
import Experience from '../webgl/Experience';
import gsap from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';
import useUmamiTracking from '../hooks/useUmamiTracking';

const DonationCreative = () => {
    const canvasRef = useRef(null);
    const experienceRef = useRef(null);
    const containerRef = useRef(null);
    const [activeTier, setActiveTier] = useState('aroused');

    const [hoveredTier, setHoveredTier] = useState(null);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Initialize Umami custom tracking
    useUmamiTracking();

    useEffect(() => {
        if (canvasRef.current) {
            experienceRef.current = new Experience(canvasRef.current);
        }

        // Initial Reveal Animation
        const ctx = gsap.context(() => {
            gsap.from('.reveal-text', {
                y: 50,
                opacity: 0,
                duration: 1.5,
                stagger: 0.1,
                ease: 'power3.out',
                delay: 0.5
            });
        }, containerRef);

        return () => {
            if (experienceRef.current) {
                experienceRef.current.destroy();
            }
            ctx.revert();
        };
    }, []);

    const tiers = [
        {
            id: 'aroused',
            title: '[I. Artists-in-Residence]',
            description: 'Empower artists to bring bold, boundary-pushing visions to life.',
        },
        {
            id: 'scholars',
            title: '[II. The Archives]',
            description: 'Help us further our goal of preserving history and keeping legacies alive.',
        },
        {
            id: 'extra',
            title: '[III. Scholarship]',
            description: 'Protect the past and future of Queer art by supporting research that illuminates our  history.',
        },
        {
            id: 'programming',
            title: '[IV. Public Programming]',
            description: 'Activate the community with contributions to global programming development.',
        }
    ];

    const content = {
        aroused: {
            intro: "For patrons who are moved by the power of creation itself. Your support directly fuels our Artists-in-Residence Program, giving them the time, space, and resources to imagine boldly, work freely, and continue shaping the future of Queer art. Every contribution touches a different part of their journey at TOM House.",
            items: []
        },
        scholars: {
            intro: "We maintain the world's largest known collections of erotic art and ephemera. This is our defense against censorship in a time where our history is more important than ever. Your donations keep our systems up to date so this important resource grows, is well maintained and made accessible online.",
            items: []
        },
        extra: {
            intro: "Legitimizing Queer culture requires scholarship that represents its value. We aim to develop ongoing initiatives that center experts from all aspects of the Queer life, but need your contribution to set the path. Help define the future of Queer art.",
            items: []
        },
        programming: {
            intro: "We bring the fight for queer liberation to a global stage. From our home in Los Angeles to our recent collaboration with Berghain in Berlin, we transform spaces into hubs of education and artistic resistance. Join the cause through donation.",
            items: []
        }
    };

    return (
        <div ref={containerRef} className="relative w-full min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans overflow-x-hidden">
            {/* Fixed WebGL Background */}
            <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none" />
            
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-20 flex flex-col items-center">
                
                {/* Back Button */}
                <button 
                    onClick={() => window.location.href = '/v7/index_v3.html'}
                    className={`fixed top-8 left-8 z-50 flex items-center gap-2 text-white/60 hover:text-white transition-all duration-500 group ${scrolled ? 'bg-black/50 backdrop-blur-md p-3 rounded-full' : ''}`}
                    aria-label="Go back"
                >
                    <svg className="w-6 h-6 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className={`text-sm font-roboto uppercase tracking-wider overflow-hidden transition-all duration-500 ${scrolled ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>Back</span>
                </button>
                
                {/* Header Section */}
                <div className="text-center max-w-4xl mb-16">
                    <div className="mb-8 reveal-text flex justify-center">
                         <img 
                            src="/assets/toff-logo-white.svg" 
                            alt="TOFF Logo" 
                            className="h-[85px] md:h-[122px] w-auto opacity-80"
                            onError={(e) => {e.target.style.display='none'}}
                        />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 reveal-text font-oswald uppercase tracking-wider leading-none">
                        THE NEXT CHAPTER<br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">STARTS WITH YOU</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 reveal-text font-light leading-relaxed max-w-3xl mx-auto">
                        Queer community is shaped by the acts and the contributions of its members. Support for Tom of Finland Foundation directly impacts artistry, preservation, and research for generations to come. Your gift ignites the work that keeps our legacy alive.
                    </p>
                    <p className="mt-4 text-gray-400 text-sm reveal-text font-light">
                        All donations are tax-deductible to the extent allowed by law. Thank you for supporting a Queer 501(c)(3) nonprofit organization.
                    </p>
                </div>

                {/* Desktop: Interactive Tiers Navigation */}
                <div 
                    className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12 reveal-text"
                    style={{ maxWidth: '72rem', width: '100%' }}
                    onMouseLeave={() => setHoveredTier(null)}
                >
                    {tiers.map((tier) => (
                        <motion.button
                            key={tier.id}
                            onMouseEnter={() => {
                                setActiveTier(tier.id);
                                setHoveredTier(tier.id);
                            }}
                            className={`relative p-8 border border-white/20 text-left transition-all duration-500 group overflow-hidden ${activeTier === tier.id ? 'bg-white/10 border-white' : 'hover:border-white/50'}`}
                            animate={{
                                filter: hoveredTier && hoveredTier === tier.id ? 'blur(4px)' : 'blur(0px)',
                                opacity: hoveredTier && hoveredTier === tier.id ? 0.5 : 1,
                                scale: hoveredTier && hoveredTier === tier.id ? 0.98 : 1
                            }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-500 ${activeTier === tier.id ? 'opacity-100' : 'group-hover:opacity-50'}`} />
                            <h3 className="text-xl font-oswald font-bold mb-3 uppercase tracking-wider relative z-10">{tier.title}</h3>
                            <p className="text-sm text-gray-400 font-roboto relative z-10 leading-relaxed">{tier.description}</p>
                            
                            {/* Active Indicator */}
                            {activeTier === tier.id && (
                                <motion.div 
                                    layoutId="activeIndicator"
                                    className="absolute bottom-0 left-0 w-full h-1 bg-white"
                                />
                            )}
                        </motion.button>
                    ))}
                </div>

                {/* Desktop: Dynamic Content Area */}
                <div className="hidden md:block w-full max-w-5xl min-h-[400px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTier}
                            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="bg-black/40 backdrop-blur-md border border-white/10 p-8 md:p-12 rounded-sm"
                        >
                            <h2 className="text-3xl font-oswald font-bold mb-6 text-white uppercase tracking-widest border-b border-white/20 pb-4">
                                {tiers.find(t => t.id === activeTier).title.replace('[', '').replace(']', '')}
                            </h2>
                            
                            <p className="text-lg text-gray-300 font-roboto font-light mb-12 leading-relaxed max-w-4xl">
                                {content[activeTier].intro}
                            </p>

                            <div className="mt-12 text-center">
                                {activeTier === 'aroused' && (
                                    <div className="mt-4 flex justify-center w-full">
                                        <div className="w-full max-w-md">
                                            <givebutter-widget id="jbNa0j"></givebutter-widget>
                                        </div>
                                    </div>
                                )}
                                {activeTier === 'scholars' && (
                                    <div className="mt-4 flex justify-center w-full">
                                        <div className="w-full max-w-md">
                                            <givebutter-widget id="j1oqog"></givebutter-widget>
                                        </div>
                                    </div>
                                )}
                                {activeTier === 'extra' && (
                                    <div className="mt-4 flex justify-center w-full">
                                        <div className="w-full max-w-md">
                                            <givebutter-widget id="LY6yKg"></givebutter-widget>
                                        </div>
                                    </div>
                                )}
                                {activeTier === 'programming' && (
                                    <div className="mt-4 flex justify-center w-full">
                                        <div className="w-full max-w-md">
                                            <givebutter-widget id="L4QOWg"></givebutter-widget>
                                        </div>
                                    </div>
                                )}
                            </div>

                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Mobile: Accordion Layout with Vertical Indicator */}
                <div className="md:hidden w-full max-w-lg relative pl-6">
                    {/* Vertical Line */}
                    <div className="absolute left-0 top-4 bottom-4 w-px bg-white/20"></div>

                    {tiers.map((tier, index) => (
                        <div key={tier.id} className="relative mb-8 last:mb-0">
                            {/* Dot Indicator */}
                            <motion.div 
                                className={`absolute -left-[1.6rem] top-2 w-3 h-3 rounded-full border border-white transition-colors duration-300 ${activeTier === tier.id ? 'bg-white' : 'bg-black'}`}
                                animate={{ scale: activeTier === tier.id ? 1.2 : 1 }}
                            />

                            {/* Accordion Header */}
                            <button 
                                onClick={() => setActiveTier(tier.id)}
                                className="w-full text-left mb-4"
                            >
                                <h3 className={`text-2xl font-oswald font-bold uppercase tracking-wider mb-2 transition-colors duration-300 ${activeTier === tier.id ? 'text-white' : 'text-gray-500'}`}>
                                    {tier.title}
                                </h3>
                                <p className={`text-sm font-roboto transition-colors duration-300 ${activeTier === tier.id ? 'text-gray-300' : 'text-gray-600'}`}>
                                    {tier.description}
                                </p>
                            </button>

                            {/* Accordion Content */}
                            <AnimatePresence>
                                {activeTier === tier.id && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                    >
                                        <div className="pb-8 border-l border-white/10 pl-4 ml-[-1rem]">
                                            <p className="text-sm text-gray-300 font-roboto font-light mb-6 leading-relaxed">
                                                {content[tier.id].intro}
                                            </p>

                                            <div className="mt-8">
                                {activeTier === 'aroused' && (
                                    <div className="mt-4 flex justify-center w-full">
                                        <div className="w-full max-w-md">
                                            <givebutter-widget id="jbNa0j"></givebutter-widget>
                                        </div>
                                    </div>
                                )}
                                {activeTier === 'scholars' && (
                                    <div className="mt-4 flex justify-center w-full">
                                        <div className="w-full max-w-md">
                                            <givebutter-widget id="j1oqog"></givebutter-widget>
                                        </div>
                                    </div>
                                )}
                                {activeTier === 'extra' && (
                                    <div className="mt-4 flex justify-center w-full">
                                        <div className="w-full max-w-md">
                                            <givebutter-widget id="LY6yKg"></givebutter-widget>
                                        </div>
                                    </div>
                                )}
                                {activeTier === 'programming' && (
                                    <div className="mt-4 flex justify-center w-full">
                                        <div className="w-full max-w-md">
                                            <givebutter-widget id="L4QOWg"></givebutter-widget>
                                        </div>
                                    </div>
                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <footer className="w-full mt-20 pt-12 pb-8 text-center border-t border-white/10">
                    <div className="mb-8">
                        <p className="text-gray-400 text-sm">
                            <strong>Made Possible By:</strong><br/>
                            <a href="https://apparatusstudio.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors no-underline">APPARATUS</a> & <a href="https://www.misguidedspirits.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors no-underline">Misguided Spirits</a>
                        </p>
                    </div>
                    <div className="flex justify-center">
                        <img 
                            src="/assets/toff-logo-white.png" 
                            alt="Tom of Finland Foundation" 
                            className="h-20 w-auto opacity-60 hover:opacity-100 transition-opacity"
                            onError={(e) => {e.target.style.display='none'}}
                        />
                    </div>
                </footer>

            </div>
        </div>
    );
};

export default DonationCreative;
