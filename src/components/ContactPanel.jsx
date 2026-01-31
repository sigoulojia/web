import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ContactPanel = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        projectType: '',
        budget: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Here you would typically send to a backend
        alert("Thank you! We'll get in touch with you as soon as possible.");
        onClose();
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
                    />

                    {/* Side Panel */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className="fixed right-0 top-0 h-full w-full md:w-[600px] bg-zinc-950 z-[101] overflow-y-auto shadow-2xl"
                    >
                        <div className="p-8 md:p-12">
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-8 right-8 text-white/60 hover:text-white transition-colors duration-300 text-3xl"
                            >
                                ×
                            </button>

                            {/* Header */}
                            <div className="mb-12">
                                <h2 className="text-4xl md:text-5xl font-bold font-oswald uppercase tracking-tight mb-4 text-white">
                                    Start a project
                                </h2>
                                <p className="text-gray-400 text-lg">
                                    Let's create something beautiful together. Tell us about your vision.
                                </p>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Your name"
                                        className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-all duration-300"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="your@email.com"
                                        className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-all duration-300"
                                    />
                                </div>



                                {/* Message */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Tell us more about your project..."
                                        rows="6"
                                        className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-all duration-300 resize-none"
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-full py-4 bg-white text-black font-bold uppercase tracking-wider hover:bg-gray-200 transition-all duration-300 rounded-md text-sm"
                                >
                                    Submit inquiry
                                </button>
                            </form>

                            {/* Privacy Note */}
                            <p className="mt-8 text-xs text-gray-500 text-center">
                                By submitting this form, you agree to our privacy policy.
                            </p>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ContactPanel;
