import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const OptimizedImage = ({ src, alt, className, priority = false }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const img = new Image();
        img.src = src;
        img.onload = () => setIsLoaded(true);
        img.onerror = () => setError(true);
    }, [src]);

    return (
        <div className={`relative overflow-hidden ${className}`}>
            {/* Low-quality placeholder / Loading state */}
            {!isLoaded && !error && (
                <div className="absolute inset-0 bg-white/5 animate-pulse flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
                </div>
            )}

            {/* Error state */}
            {error && (
                <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center text-[10px] text-white/20 uppercase tracking-widest">
                    Image failed to load
                </div>
            )}

            <motion.img
                src={src}
                alt={alt}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{
                    opacity: isLoaded ? 1 : 0,
                    scale: isLoaded ? 1 : 1.05
                }}
                transition={{
                    duration: 0.8,
                    ease: [0.43, 0.13, 0.23, 0.96]
                }}
                className={`w-full h-full object-cover ${isLoaded ? 'visible' : 'invisible'}`}
                loading={priority ? "eager" : "lazy"}
            />
        </div>
    );
};

export default OptimizedImage;
