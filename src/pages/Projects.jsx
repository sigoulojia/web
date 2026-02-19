import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { projects } from '../data';
import OptimizedImage from '../components/OptimizedImage';

const Projects = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-black text-white pt-32 pb-20 px-6 md:px-12">
            <div className="max-w-[1600px] mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-20"
                >
                    <h1 className="text-7xl md:text-[12rem] font-bold uppercase tracking-tighter leading-[0.85] mb-4">
                        Work
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-400 max-w-2xl font-light">
                        Exploring the boundaries of visual storytelling through high-end cinematography and creative direction.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project._id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            viewport={{ once: true, margin: "-100px" }}
                            onClick={() => navigate(`/projects/${project.slug}`)}
                            className={`group relative cursor-pointer ${index % 3 === 0 ? 'md:col-span-2' : ''}`}
                        >
                            <div className="relative overflow-hidden aspect-video w-full">
                                <OptimizedImage
                                    src={project.realImageUrl}
                                    alt={project.title}
                                    className="w-full h-full transition-transform duration-1000 ease-out group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-500" />

                                {/* Hover Info overlay for mobile/desktop */}
                                <div className="absolute bottom-0 left-0 p-8 w-full translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                    <span className="text-xs uppercase tracking-[0.3em] text-white/70 mb-2 block">{project.category}</span>
                                </div>
                            </div>

                            <div className="mt-8 flex justify-between items-start">
                                <div>
                                    <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter leading-none mb-2 group-hover:text-gray-300 transition-colors">
                                        {project.title}
                                    </h2>
                                    <p className="text-gray-500 text-lg uppercase tracking-widest font-medium">
                                        {project.client} — {project.year}
                                    </p>
                                </div>
                                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
                                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform group-hover:rotate-45 transition-transform">
                                        <path d="M1 14L14 1M14 1H5M14 1V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Projects;
