import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data';

const Home = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const scrollTimeoutRef = useRef(null);
    const autoScrollIntervalRef = useRef(null);

    const currentProject = projects[activeIndex];

    // Auto-scroll timer (8 seconds per slide)
    const startAutoScroll = () => {
        stopAutoScroll();
        autoScrollIntervalRef.current = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % projects.length);
        }, 8000); // 8 seconds
    };

    const stopAutoScroll = () => {
        if (autoScrollIntervalRef.current) {
            clearInterval(autoScrollIntervalRef.current);
        }
    };

    // Start auto-scroll on mount
    useEffect(() => {
        startAutoScroll();
        return () => stopAutoScroll();
    }, []);

    // Manual scroll-based navigation
    useEffect(() => {
        const handleWheel = (e) => {
            if (isScrolling) return; // Prevent rapid scrolling

            // Stop auto-scroll temporarily
            stopAutoScroll();
            setIsScrolling(true);

            if (e.deltaY > 0) {
                // Scroll down - next project
                setActiveIndex((prev) => (prev + 1) % projects.length);
            } else {
                // Scroll up - previous project
                setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
            }

            // Reset scrolling flag and restart auto-scroll after delay
            if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
            scrollTimeoutRef.current = setTimeout(() => {
                setIsScrolling(false);
                startAutoScroll(); // Resume auto-scroll
            }, 1000); // 1 second cooldown
        };

        window.addEventListener('wheel', handleWheel, { passive: true });
        return () => {
            window.removeEventListener('wheel', handleWheel);
            if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        };
    }, [isScrolling]);

    const handleManualChange = (index) => {
        stopAutoScroll();
        setActiveIndex(index);
        // Restart auto-scroll after manual click
        setTimeout(() => startAutoScroll(), 1000);
    };

    return (
        <main className="relative min-h-[100svh] w-full bg-black overflow-hidden cursor-pointer selection:bg-white selection:text-black">

            {/* Background Video/Image Layer with GPU Acceleration */}
            <AnimatePresence mode='wait'>
                <motion.div
                    key={currentProject._id}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                        duration: 0.8,
                        ease: [0.43, 0.13, 0.23, 0.96]
                    }}
                    className="absolute inset-0 z-0"
                    style={{ willChange: 'opacity, transform' }}
                >
                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-black/30 z-10" />

                    {currentProject.playbackId ? (
                        <video
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="w-full h-full object-cover"
                            key={currentProject.playbackId}
                            style={{ willChange: 'transform' }}
                        >
                            <source src={`https://stream.mux.com/${currentProject.playbackId}/high.mp4`} type="video/mp4" />
                        </video>
                    ) : (
                        <img
                            src={currentProject.realImageUrl}
                            alt={currentProject.title}
                            className="w-full h-full object-cover"
                            style={{ willChange: 'transform' }}
                        />
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Content Layer */}
            <div className="relative z-20 min-h-[100svh] flex flex-col p-6 md:p-12 pb-24 text-white">
                <div className="flex-1"></div>

                <div className="mb-4 md:mb-12 max-w-[90vw]">
                    <AnimatePresence mode='wait'>
                        <motion.h1
                            key={currentProject.title}
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{
                                duration: 0.6,
                                ease: [0.22, 1, 0.36, 1]
                            }}
                            className="text-4xl md:text-6xl lg:text-[6vw] font-bold font-franklin uppercase leading-[0.9] mb-4 tracking-tight drop-shadow-lg"
                            style={{ willChange: 'transform, opacity' }}
                        >
                            {currentProject.client === "MUSTAPHA FILMS" ? "MUSTAPHA FILMS" : currentProject.title}
                        </motion.h1>
                    </AnimatePresence>

                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={currentProject._id + "desc"}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="flex flex-wrap items-center gap-x-3 text-xs md:text-sm text-white/80 uppercase tracking-[0.15em] font-franklin font-medium shadow-black/50 drop-shadow-md"
                            style={{ willChange: 'transform, opacity' }}
                        >
                            <span className="text-white/60">Project:</span>
                            <span className="text-white">{currentProject.title}</span>
                            <span className="text-white/40">|</span>
                            <span className="text-white">{currentProject.client}</span>
                            <span className="text-white/40">|</span>
                            <span className="text-white/60">{currentProject.year}</span>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute right-6 top-28 md:right-16 md:top-36 hidden md:flex flex-col items-center gap-4">
                    <div className="text-[10px] text-white/70 tracking-[0.2em] uppercase font-franklin -rotate-90 origin-center whitespace-nowrap">
                        Auto-scroll / Scroll to navigate
                    </div>
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="w-px h-16 bg-gradient-to-b from-white/0 via-white/50 to-white/0"
                    />
                </div>

                {/* Slider Controls (Bottom Right) */}
                <div className="absolute bottom-8 md:bottom-12 right-6 md:right-12 z-20">
                    <div className="flex flex-col items-end space-y-4">
                        <div className="text-white text-2xl md:text-3xl font-bold font-franklin tabular-nums tracking-wide shadow-black drop-shadow-md">
                            0{activeIndex + 1} <span className="text-white/40 text-lg md:text-xl font-normal">/ 0{projects.length}</span>
                        </div>
                        <div className="flex space-x-3">
                            {projects.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={(e) => { e.stopPropagation(); handleManualChange(idx); }}
                                    className={`h-1.5 rounded-full transition-all duration-500 ease-out shadow-sm ${idx === activeIndex ? 'w-8 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/80'}`}
                                    style={{ willChange: 'width, background-color' }}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Auto-scroll Progress Bar */}
                <div className="absolute bottom-0 left-0 w-full h-[2px] z-30 bg-white/10">
                    <motion.div
                        key={activeIndex}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 8, ease: "linear" }}
                        className="h-full bg-white/50 origin-left"
                    />
                </div>
            </div>
        </main>
    );
};

export default Home;
