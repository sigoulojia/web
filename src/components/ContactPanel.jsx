import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const ContactPanel = ({ isOpen, onClose }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        projectType: '',
        budget: '',
        message: ''
    });

    const TG_BOT_TOKEN = import.meta.env.VITE_TG_BOT_TOKEN;
    const TG_CHAT_ID = import.meta.env.VITE_TG_CHAT_ID;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const text = `
🆕 *New Project Inquiry*
👤 *Name:* ${formData.name}
📧 *Email:* ${formData.email}
📞 *Phone:* ${formData.phone}
📝 *Message:* ${formData.message || 'No message provided'}
        `;

        try {
            const response = await fetch(`https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: TG_CHAT_ID,
                    text: text,
                    parse_mode: 'Markdown'
                })
            });

            if (response.ok) {
                alert("Thank you! Your message has been sent to Mustapha. We'll get in touch soon.");
                setFormData({ name: '', email: '', phone: '', projectType: '', budget: '', message: '' });
                onClose();
            } else {
                throw new Error('Telegram submission failed');
            }
        } catch (error) {
            console.error('Submission error:', error);
            alert("Something went wrong. Please try again or contact us directly via email.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handlePhoneChange = (value) => {
        setFormData({
            ...formData,
            phone: value
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
                        className="fixed right-0 top-0 h-full w-full md:w-[600px] bg-zinc-950 z-[101] flex flex-col shadow-2xl"
                    >
                        {/* Fixed Header with Close and Home button */}
                        <div className="flex justify-between items-center p-6 md:p-10 border-b border-white/5">
                            <button
                                onClick={onClose}
                                className="text-white/60 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                            >
                                <span className="text-2xl group-hover:-translate-x-1 transition-transform">←</span>
                                <span className="text-sm font-bold uppercase tracking-widest">Back to Website</span>
                            </button>

                            <button
                                onClick={onClose}
                                className="text-white/60 hover:text-white transition-colors duration-300 text-3xl"
                            >
                                ×
                            </button>
                        </div>

                        {/* Scrollable Content */}
                        <div className="flex-1 overflow-y-auto p-8 md:p-12 pt-6 md:pt-10">
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
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <label className="block text-[10px] uppercase font-bold tracking-[0.2em] text-white/40 mb-3 ml-1">
                                        Name <span className="text-white/20">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Full Name"
                                        className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-none text-white placeholder-white/20 focus:outline-none focus:border-white/30 focus:bg-white/[0.07] transition-all duration-500 tracking-wider"
                                    />
                                </motion.div>

                                {/* Email */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.05 }}
                                >
                                    <label className="block text-[10px] uppercase font-bold tracking-[0.2em] text-white/40 mb-3 ml-1">
                                        Email <span className="text-white/20">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="your@email.com"
                                        className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-none text-white placeholder-white/20 focus:outline-none focus:border-white/30 focus:bg-white/[0.07] transition-all duration-500 tracking-wider"
                                    />
                                </motion.div>

                                {/* Phone */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <label className="block text-[10px] uppercase font-bold tracking-[0.2em] text-white/40 mb-3 ml-1">
                                        Phone Number <span className="text-white/20">*</span>
                                    </label>
                                    <PhoneInput
                                        country={'dz'}
                                        value={formData.phone}
                                        onChange={handlePhoneChange}
                                        enableSearch={true}
                                        containerClass="phone-input-container"
                                        inputProps={{
                                            required: true,
                                            name: 'phone',
                                            placeholder: 'Full Phone Number (+...)'
                                        }}
                                        dropdownClass="legendary-dropdown"
                                        searchPlaceholder="Search country..."
                                    />
                                </motion.div>

                                {/* Message */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.15 }}
                                >
                                    <label className="block text-[10px] uppercase font-bold tracking-[0.2em] text-white/40 mb-3 ml-1">
                                        Message
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="TELL US ABOUT YOUR VISION..."
                                        rows="6"
                                        className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-none text-white placeholder-white/20 focus:outline-none focus:border-white/30 focus:bg-white/[0.07] transition-all duration-500 tracking-wider resize-none"
                                    />
                                </motion.div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full py-4 bg-white text-black font-bold uppercase tracking-wider hover:bg-gray-200 transition-all duration-300 rounded-md text-sm ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {isSubmitting ? 'Sending...' : 'Submit inquiry'}
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
