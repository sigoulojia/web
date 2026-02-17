import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ContactPanel from './ContactPanel';

const Navbar = () => {
    const location = useLocation();
    const [hovered, setHovered] = useState(false);
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Close menu when location changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname]);

    const menuItems = [
        { label: 'Home', path: '/' },
        { label: 'Projects', path: '/projects' },
        { label: 'About', path: '/about' }
    ];

    return (
        <>
            <header className="fixed top-0 left-0 w-full z-[100] flex justify-center px-4 md:px-10 pointer-events-none text-white">
                <nav className="pointer-events-auto flex items-center justify-between px-6 md:px-10 py-3 mx-auto max-w-7xl w-full mt-4 rounded-md backdrop-blur-md bg-black/30 border border-white/10 transition-all duration-500">

                    {/* LOGO */}
                    <div className="w-auto">
                        <Link to="/" className="group flex items-center">
                            <motion.div
                                className="font-franklin text-white text-xl md:text-2xl font-bold flex items-center tracking-tighter"
                                onHoverStart={() => setHovered(true)}
                                onHoverEnd={() => setHovered(false)}
                            >
                                <span>M</span>
                                <motion.span
                                    initial={{ width: 0, opacity: 0 }}
                                    animate={{
                                        width: hovered ? 'auto' : 0,
                                        opacity: hovered ? 1 : 0
                                    }}
                                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                    className="overflow-hidden whitespace-nowrap"
                                >
                                    USTAPHA&nbsp;
                                </motion.span>
                                <span>F</span>
                                <motion.span
                                    initial={{ width: 0, opacity: 0 }}
                                    animate={{
                                        width: hovered ? 'auto' : 0,
                                        opacity: hovered ? 1 : 0
                                    }}
                                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                    className="overflow-hidden whitespace-nowrap"
                                >
                                    ILMS
                                </motion.span>
                            </motion.div>
                        </Link>
                    </div>

                    {/* DESKTOP MENU */}
                    <div className="hidden md:flex justify-center flex-1">
                        <ul className="flex space-x-12">
                            {menuItems.map((item) => {
                                const isActive = location.pathname === item.path;
                                return (
                                    <li key={item.label}>
                                        <Link
                                            to={item.path}
                                            className={`text-xs uppercase font-bold tracking-[0.2em] transition-all duration-300 relative group ${isActive ? 'text-white' : 'text-white/50 hover:text-white'}`}
                                        >
                                            {item.label}
                                            <span className={`absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full ${isActive ? 'w-full' : ''}`}></span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* CTA BUTTON / HAMBURGER */}
                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex">
                            <button
                                onClick={() => setIsPanelOpen(true)}
                                className="relative px-6 py-2.5 text-white text-[10px] uppercase font-bold tracking-[0.25em] border border-white/20 rounded-full overflow-hidden group hover:border-white transition-colors duration-500"
                            >
                                <span className="relative z-10 group-hover:text-black transition-colors duration-300">Start Project</span>
                                <div className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.22,1,0.36,1]"></div>
                            </button>
                        </div>

                        {/* MOBILE BURGER */}
                        <button
                            className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none z-[110]"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <motion.span
                                animate={isMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                                className="w-6 h-[1.5px] bg-white block transition-transform duration-300"
                            ></motion.span>
                            <motion.span
                                animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                                className="w-6 h-[1.5px] bg-white block transition-opacity duration-300"
                            ></motion.span>
                            <motion.span
                                animate={isMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                                className="w-6 h-[1.5px] bg-white block transition-transform duration-300"
                            ></motion.span>
                        </button>
                    </div>
                </nav>
            </header>

            {/* MOBILE MENU OVERLAY */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-0 bg-black z-[90] flex flex-col justify-start items-center pt-32 md:hidden"
                    >
                        <ul className="flex flex-col items-center space-y-10">
                            {menuItems.map((item, index) => (
                                <motion.li
                                    key={item.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 + 0.2 }}
                                >
                                    <Link
                                        to={item.path}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="text-4xl font-bold uppercase tracking-tighter text-white hover:text-gray-400 transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                </motion.li>
                            ))}
                            <motion.li
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="pt-10"
                            >
                                <button
                                    onClick={() => {
                                        setIsMenuOpen(false);
                                        setIsPanelOpen(true);
                                    }}
                                    className="px-8 py-4 bg-white text-black font-bold uppercase tracking-widest text-sm"
                                >
                                    Start Project
                                </button>
                            </motion.li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Contact Panel */}
            <ContactPanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)} />
        </>
    );
};

export default Navbar;
