import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projects } from '../data';
import OptimizedImage from '../components/OptimizedImage';

const ProjectDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const project = projects.find(p => p.slug === slug);
    const [isMuted, setIsMuted] = React.useState(true);
    const videoRef = React.useRef(null);

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(videoRef.current.muted);
        }
    };

    if (!project) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-6xl font-bold mb-4">404</h1>
                    <p className="text-xl text-gray-400">Project not found</p>
                    <button
                        onClick={() => navigate('/projects')}
                        className="mt-8 px-6 py-3 border border-white hover:bg-white hover:text-black transition-all duration-300"
                    >
                        Back to projects
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Hero Section */}
            <section className="relative h-screen flex items-end">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0 z-0"
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black z-10" />
                    <OptimizedImage
                        src={project.realImageUrl}
                        alt={project.title}
                        className="w-full h-full"
                        priority={true}
                    />
                </motion.div>

                <div className="relative z-20 pb-24 px-6 md:px-12 max-w-[1600px] mx-auto w-full">
                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={() => navigate('/projects')}
                        className="mb-8 text-sm uppercase tracking-wider text-white/60 hover:text-white transition-colors duration-300 flex items-center gap-2"
                    >
                        ← Back to projects
                    </motion.button>

                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <p className="text-sm uppercase tracking-widest text-gray-400 mb-4">
                            {project.category} • {project.year}
                        </p>
                        <h1 className="text-6xl md:text-9xl font-bold uppercase tracking-tighter leading-none mb-6">
                            {project.title}
                        </h1>
                        <p className="text-2xl text-gray-300 max-w-2xl">
                            {project.client}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Project Details */}
            <section className="py-32 px-6 md:px-12 max-w-[1400px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                    {/* Left Column - Description */}
                    <div>
                        <h2 className="text-sm uppercase tracking-widest text-gray-500 mb-8 border-t border-white/10 pt-6">
                            The Narrative
                        </h2>
                        <p className="text-3xl md:text-4xl font-light leading-tight mb-8 italic">
                            A <span className="text-white font-bold">cinematic symphony</span> of precision and passion.
                        </p>
                        <p className="text-xl text-gray-400 leading-relaxed mb-6">
                            {project.description}
                        </p>

                    </div>

                    {/* Right Column - Project Info */}
                    <div>
                        <h2 className="text-sm uppercase tracking-widest text-gray-500 mb-8 border-t border-white/10 pt-6">
                            Specifications
                        </h2>

                        <div className="space-y-8">
                            <div>
                                <h3 className="text-lg font-semibold mb-2">Director / Cinematography</h3>
                                <p className="text-2xl">{project.client}</p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-2">Category</h3>
                                <p className="text-2xl capitalize">{project.category.replace('-', ' ')}</p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-2">Release</h3>
                                <p className="text-2xl">{project.year}</p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-2">Creative Direction</h3>
                                <ul className="text-gray-400 space-y-2">
                                    <li>• Cinematic Editing</li>
                                    <li>• Soundscapes & Scoring</li>
                                    <li>• Advanced Color Grading</li>
                                    <li>• Conceptual Vision</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gallery / Video Section */}
            <section className="py-24 px-6 md:px-12 bg-black">
                <div className="max-w-[1600px] mx-auto space-y-24">
                    {/* Project Video Showcase */}
                    {project.videoUrl && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                            className="w-full aspect-video rounded-xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] relative group bg-neutral-900"
                        >
                            <video
                                ref={videoRef}
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="w-full h-full object-cover transition-all duration-1000"
                            >
                                <source src={project.videoUrl} type="video/mp4" />
                            </video>

                            {/* Audio Visualizer Button */}
                            <button
                                onClick={toggleMute}
                                className="absolute bottom-10 right-10 z-30 flex items-center gap-4 bg-black/40 backdrop-blur-xl border border-white/20 px-6 py-4 rounded-full hover:bg-white hover:text-black transition-all duration-500 group/audio"
                            >
                                <div className="flex items-end gap-1 h-4">
                                    {[...Array(4)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            animate={!isMuted ? { height: [4, 16, 8, 14, 4] } : { height: 2 }}
                                            transition={{
                                                repeat: Infinity,
                                                duration: 0.5 + (i * 0.15),
                                                ease: "linear"
                                            }}
                                            className={`w-0.5 ${isMuted ? 'bg-white/40' : 'bg-current'} rounded-full`}
                                        />
                                    ))}
                                </div>
                                <span className="text-[10px] uppercase font-black tracking-[0.2em]">
                                    {isMuted ? 'Experience Audio' : 'Audio Live'}
                                </span>
                            </button>

                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
                        </motion.div>
                    )}

                    {/* Secondary Image with Legend Effects */}
                    {/* Secondary Image with Legend Effects - Hidden for CFI */}
                    {project.slug !== 'cfi-corporative' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="aspect-[4/5] overflow-hidden rounded-sm relative group"
                            >
                                <OptimizedImage
                                    src={project.secondaryImageUrl || project.realImageUrl}
                                    alt={`${project.title} - view 1`}
                                    className="w-full h-full transition-all duration-1000 scale-105 group-hover:scale-100"
                                />
                            </motion.div>
                            <div className="flex flex-col justify-center p-8 md:p-20 bg-neutral-900/50 border border-white/5 rounded-sm">
                                <span className="text-white/30 uppercase text-[10px] tracking-[0.5em] mb-6">
                                    {project.slug === 'algerie-2030-event-video' ? 'POST-EVENT INTERVIEWS' : 'Visual Identity'}
                                </span>
                                <h4 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter leading-none mb-8">
                                    {project.slug === 'algerie-2030-event-video' ?
                                        <>Short interviews with <span className="italic text-neutral-500">attendees</span></> :
                                        <>Capturing the <span className="italic text-neutral-500">Unseen</span></>
                                    }
                                </h4>
                                <p className="text-neutral-400 font-light leading-relaxed">
                                    {project.slug === 'algerie-2030-event-video' ?
                                        "Short interviews with attendees sharing their thoughts and impressions of Algerie 2030, adding a personal perspective to the event." :
                                        "Behind every great shot is a deeper story waiting to be told. We use the latest in digital cinema technology to ensure that your vision isn't just recorded—it's immortalized."
                                    }
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-32 px-6 md:px-12 bg-white/5 border-t border-white/5">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-5xl md:text-8xl font-bold mb-8 uppercase tracking-tighter leading-[0.85]">
                        Let's build <span className="text-gray-500">The Future</span> together.
                    </h2>
                    <button
                        onClick={() => navigate('/about')}
                        className="mt-12 px-12 py-5 bg-white text-black font-black uppercase tracking-widest hover:bg-neutral-200 transition-all duration-500 text-sm"
                    >
                        Inquire Now
                    </button>
                </div>
            </section>
        </div>
    );
};

export default ProjectDetail;
