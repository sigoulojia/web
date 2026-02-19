import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import OptimizedImage from '../components/OptimizedImage';
// Remote Photos from R2 Cloud
const photos = {
    hero: "https://pub-37328ef5430f44e0a0ca4fb034e07b05.r2.dev/0126(3).png",
    story1: "https://pub-37328ef5430f44e0a0ca4fb034e07b05.r2.dev/FB_IMG_1743362009241.jpg",
    story2: "https://pub-37328ef5430f44e0a0ca4fb034e07b05.r2.dev/IMG_2802.jpg",
};

// Personal Photos (Local Fallbacks for Gallery)
import photo1 from '../assets/MUSTAPHA/FB_IMG_1743362009241.jpg';
import photo2 from '../assets/MUSTAPHA/IMG_2802.jpg';
import photo3 from '../assets/MUSTAPHA/P1145667.jpg';
import photo4 from '../assets/MUSTAPHA/Screenshot_2024-11-28-02-37-19-176_com.miui.gallery-edit.jpg';

const Studio = () => {
    const { scrollYProgress: pageScroll } = useScroll();
    const yHero = useTransform(pageScroll, [0, 1], ['0%', '30%']);

    // -- MURSEE-STYLE SECTION LOGIC --
    const philosophyRef = useRef(null);
    const { scrollYProgress: sectionScroll } = useScroll({
        target: philosophyRef,
        offset: ["start 90%", "end start"]
    });

    const smoothSectionScroll = useSpring(sectionScroll, { stiffness: 100, damping: 30 });

    // Immersion effects
    const bgScale = useTransform(smoothSectionScroll, [0, 0.4], [1, 1.1]);
    const bgOpacity = useTransform(smoothSectionScroll, [0, 0.2], [1, 0.5]);

    // Card 1 (Left - "The Vision")
    const cardX1 = useTransform(smoothSectionScroll, [0, 0.85], [0, -450]);
    const cardR1 = useTransform(smoothSectionScroll, [0, 0.85], [-2, -15]);
    const cardY1 = useTransform(smoothSectionScroll, [0, 0.85], [0, 60]);

    // Card 3 (Right - "The Impact")
    const cardX3 = useTransform(smoothSectionScroll, [0, 0.85], [0, 450]);
    const cardR3 = useTransform(smoothSectionScroll, [0, 0.85], [2, 15]);
    const cardY3 = useTransform(smoothSectionScroll, [0, 0.85], [0, 60]);

    // Card 2 (Center - "The Craft")
    const cardS2 = useTransform(smoothSectionScroll, [0, 0.85], [1, 1.15]);
    const cardR2 = useTransform(smoothSectionScroll, [0, 0.85], [0, -2]);

    // Exit Fade for the whole stack to avoid dead space
    const stackOpacity = useTransform(smoothSectionScroll, [0.85, 1], [1, 0]);
    // -- END MURSEE LOGIC --

    const personalPhotos = [photo3, photo2, photo1, photo4];

    return (
        <div className="min-h-screen bg-black text-white font-franklin overflow-hidden">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <motion.div
                    style={{ y: yHero }}
                    className="absolute inset-0 z-0"
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black z-10" />
                    <OptimizedImage
                        src={photos.hero}
                        alt="Mustapha Adel"
                        className="w-full h-full"
                        priority={true}
                    />
                </motion.div>

                <div className="relative z-20 text-center px-4 mix-blend-difference">
                    <motion.h1
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                        className="text-5xl md:text-[8rem] font-bold uppercase tracking-tighter leading-none"
                    >
                        MUSTAPHA ADEL TIRIRI
                    </motion.h1>
                </div>
            </section>

            {/* Biography Section */}
            <section className="py-32 px-6 md:px-12 max-w-[1600px] mx-auto">
                <div className="flex flex-col md:flex-row gap-20">
                    <div className="md:w-1/3">
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-xl uppercase tracking-widest text-neutral-500 border-t border-neutral-800 pt-6"
                        >
                            The Storyteller
                        </motion.h2>
                    </div>
                    <div className="md:w-2/3">
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="text-4xl md:text-6xl font-light leading-tight"
                        >
                            Turning <span className="text-gray-500 italic">childhood passion</span> into cinematic impact.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="mt-12 space-y-8 text-xl text-neutral-400 max-w-2xl leading-relaxed"
                        >
                            <p>
                                I’m a filmmaker who’s been passionate about video since childhood. What started as a personal interest has grown into professional experience across commercials, brand content, people-focused stories, and events.
                            </p>
                            <p>
                                I work with professional equipment and a strong attention to detail, always aiming to create high-quality visuals that tell meaningful stories and leave an impact. Every frame is a commitment to excellence.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* MURSEE-INSPIRED PHILOSOPHY SECTION */}
            <section ref={philosophyRef} className="h-[130vh] relative bg-black">
                <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">

                    {/* Immersive Background Blur/Glow */}
                    <motion.div
                        style={{ scale: bgScale, opacity: bgOpacity }}
                        className="absolute inset-0 z-0 pointer-events-none"
                    >
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-white/5 rounded-full blur-[120px]" />
                    </motion.div>

                    <div className="relative z-10 text-center mb-24 max-w-4xl px-8">
                        <motion.div
                            style={{
                                opacity: useTransform(smoothSectionScroll, [0, 0.15], [0, 1]),
                                y: useTransform(smoothSectionScroll, [0, 0.15], [30, 0])
                            }}
                        >
                            <h4 className="text-[10px] uppercase tracking-[0.8em] text-white/30 mb-6 font-mono">Behind the lens</h4>
                            <h2 className="text-5xl md:text-[7vw] font-bold tracking-tight uppercase leading-[0.9] text-white">
                                Crafting <span className="text-neutral-600">Pure</span><br />Extraordinary.
                            </h2>
                        </motion.div>
                    </div>

                    {/* THE STACK */}
                    <motion.div
                        style={{ opacity: stackOpacity }}
                        className="relative w-full max-w-6xl h-[50vh] flex items-center justify-center"
                    >

                        {/* LEFT CARD */}
                        <motion.div
                            style={{ x: cardX1, rotate: cardR1, y: cardY1 }}
                            className="absolute w-[240px] md:w-[380px] aspect-[3/4] rounded-3xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-white/5 bg-neutral-900 z-10 transition-colors duration-500 group"
                        >
                            <OptimizedImage
                                src={photos.story1}
                                className="w-full h-full opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                                alt="Vision"
                            />
                            <div className="absolute inset-0 p-10 flex flex-col justify-end bg-gradient-to-t from-black/90 via-transparent to-transparent">
                                <span className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Philosophy 01</span>
                                <h5 className="text-2xl font-bold uppercase tracking-tight">The Vision</h5>
                            </div>
                        </motion.div>

                        {/* RIGHT CARD */}
                        <motion.div
                            style={{ x: cardX3, rotate: cardR3, y: cardY3 }}
                            className="absolute w-[240px] md:w-[380px] aspect-[3/4] rounded-3xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-white/5 bg-neutral-900 z-10 transition-colors duration-500 group"
                        >
                            <OptimizedImage
                                src={"https://pub-37328ef5430f44e0a0ca4fb034e07b05.r2.dev/P1145667.jpg"}
                                className="w-full h-full opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                                alt="Impact"
                            />
                            <div className="absolute inset-0 p-10 flex flex-col justify-end bg-gradient-to-t from-black/90 via-transparent to-transparent">
                                <span className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Philosophy 03</span>
                                <h5 className="text-2xl font-bold uppercase tracking-tight">The Impact</h5>
                            </div>
                        </motion.div>

                        {/* CENTER CARD (MASTER) */}
                        <motion.div
                            style={{ scale: cardS2, rotate: cardR2 }}
                            className="absolute w-[260px] md:w-[420px] aspect-[3/4] rounded-3xl overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.7)] border border-white/10 bg-neutral-900 z-20 group"
                        >
                            <video
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="w-full h-full object-cover transition-all duration-1000"
                            >
                                <source src="https://pub-37328ef5430f44e0a0ca4fb034e07b05.r2.dev/SHOWREEL%20MUSTAPHA%20ADEL.mp4" type="video/mp4" />
                            </video>
                            <div className="absolute inset-0 p-12 flex flex-col justify-end bg-gradient-to-t from-black via-black/20 to-transparent">
                                <span className="text-[10px] uppercase tracking-[0.5em] text-white/60 mb-3 font-mono">Core Essence</span>
                                <h5 className="text-4xl font-bold uppercase tracking-tighter text-white">The Craft</h5>
                                <div className="h-[1px] w-12 bg-white/40 mt-6 group-hover:w-24 transition-all duration-500" />
                            </div>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        style={{
                            opacity: useTransform(smoothSectionScroll, [0.6, 0.8], [1, 0]),
                            y: useTransform(smoothSectionScroll, [0.6, 0.8], [0, 20])
                        }}
                        className="mt-24 flex flex-col items-center gap-4 text-white/20"
                    >
                        <div className="w-px h-20 bg-gradient-to-b from-white/20 to-transparent"></div>
                        <span className="text-[8px] uppercase tracking-[0.6em] font-mono">Scroll for more</span>
                    </motion.div>
                </div>
            </section>

            {/* Legendary Gallery Section - Horizontal Scroll Effect */}
            <section className="py-24 overflow-hidden bg-white/5">
                <div className="px-6 md:px-12 mb-12 flex justify-between items-end">
                    <h3 className="text-xs uppercase tracking-[0.5em] text-white/50">Gallery / Behind the scenes</h3>
                    <div className="text-[10px] uppercase tracking-widest text-white/30 hidden md:block">Scroll to explore</div>
                </div>

                <div className="flex gap-8 px-6 md:px-12 overflow-x-auto no-scrollbar pb-12 cursor-grab active:cursor-grabbing">
                    {personalPhotos.map((photo, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="flex-shrink-0 w-[80vw] md:w-[45vw] aspect-[4/5] md:aspect-[16/10] overflow-hidden rounded-sm group relative"
                        >
                            <img
                                src={photo}
                                alt={`Mustapha - ${i}`}
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale hover:grayscale-0"
                            />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Achievements / Stats */}
            <section className="py-32 px-6 md:px-12 max-w-[1600px] mx-auto border-t border-white/5">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {[
                        { title: 'Commercials', desc: 'Crafting brand identities through lens.' },
                        { title: 'Storytelling', desc: 'A focus on meaningful human narratives.' },
                        { title: 'Technical', desc: 'Working with industry-standard professional gear.' },
                        { title: 'Dedication', desc: 'Meticulous attention to every single frame.' }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="group"
                        >
                            <div className="h-px w-full bg-neutral-800 mb-8 group-hover:bg-white transition-colors duration-500" />
                            <h3 className="text-2xl font-bold mb-4 uppercase tracking-tighter">{item.title}</h3>
                            <p className="text-neutral-500 leading-relaxed font-light">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Studio;
