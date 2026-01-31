import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import studioHero from '../assets/0126(3).png';

// Personal Photos
import photo1 from '../assets/MUSTAPHA/FB_IMG_1743362009241.jpg';
import photo2 from '../assets/MUSTAPHA/IMG_2802.jpg';
import photo3 from '../assets/MUSTAPHA/P1145667.jpg';
import photo4 from '../assets/MUSTAPHA/Screenshot_2024-11-28-02-37-19-176_com.miui.gallery-edit.jpg';

const Studio = () => {
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

    const personalPhotos = [photo3, photo2, photo1, photo4];

    return (
        <div className="min-h-screen bg-black text-white font-franklin overflow-hidden">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <motion.div
                    style={{ y }}
                    className="absolute inset-0 z-0"
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black z-10" />
                    <img src={studioHero} alt="Mustapha Filming" className="w-full h-full object-cover" />
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
