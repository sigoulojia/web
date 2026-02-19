import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const getAlgeriatime = () => {
        const now = new Date();
        return now.toLocaleTimeString('en-US', {
            timeZone: 'Africa/Algiers',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    const [time, setTime] = React.useState(getAlgeriatime());

    React.useEffect(() => {
        const interval = setInterval(() => {
            setTime(getAlgeriatime());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <footer className="footer-reveal">
            <div className="footer-content-full">
                {/* Large Logo with Video Mask */}
                <div className="footer-logo-video-container">
                    <svg viewBox="0 0 1600 240" preserveAspectRatio="xMidYMid meet" className="footer-video-svg">
                        <defs>
                            <clipPath id="footerTextClip">
                                <text
                                    x="800"
                                    y="120"
                                    textAnchor="middle"
                                    dominantBaseline="central"
                                    className="footer-video-text"
                                >
                                    MUSTAPHA FILMS
                                </text>
                            </clipPath>
                        </defs>
                        <foreignObject x="0" y="0" width="1600" height="240" clipPath="url(#footerTextClip)">
                            <div xmlns="http://www.w3.org/1999/xhtml" style={{ width: '100%', height: '100%' }}>
                                <video
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    className="footer-video-element"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                >
                                    <source src="https://pub-37328ef5430f44e0a0ca4fb034e07b05.r2.dev/THE%20TEXT%20BACKGROUND%20VIDEO-1.mp4" type="video/mp4" />
                                </video>
                            </div>
                        </foreignObject>
                    </svg>
                </div>

                {/* Footer Grid - Contact, Location, Menu, Socials */}
                <div className="footer-grid">
                    {/* Contact */}
                    <div className="footer-section">
                        <h3 className="footer-heading">CONTACT</h3>
                        <a href="mailto:mustapha0tiriri@gmail.com" className="footer-link">mustapha0tiriri@gmail.com</a>
                        <a href="tel:+213777865374" className="footer-link">+213 (0) 777 865 374</a>
                    </div>

                    {/* Office */}
                    <div className="footer-section">
                        <h3 className="footer-heading">LOCATION</h3>
                        <p className="footer-text">Algiers,</p>
                        <p className="footer-text">Algeria</p>
                        <p className="footer-time">{time} (GMT +1)</p>
                    </div>

                    {/* Menu */}
                    <div className="footer-section">
                        <h3 className="footer-heading">MENU</h3>
                        <Link to="/" className="footer-link">HOME</Link>
                        <Link to="/about" className="footer-link">ABOUT</Link>
                        <Link to="/projects" className="footer-link">PROJECTS</Link>
                    </div>

                    {/* Socials */}
                    <div className="footer-section">
                        <h3 className="footer-heading">SOCIALS</h3>
                        <a href="https://www.instagram.com/at_samarita/" target="_blank" rel="noopener noreferrer" className="footer-link">INSTAGRAM</a>
                        <a href="https://www.linkedin.com/in/mustapha-adel-tiriri-7b8833242/" target="_blank" rel="noopener noreferrer" className="footer-link">LINKEDIN</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
