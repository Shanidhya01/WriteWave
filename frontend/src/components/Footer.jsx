import { Footer } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";
import {BsFacebook, BsInstagram, BsTwitter, BsGithub, BsDribbble} from 'react-icons/bs'

const FooterCom = () => {
  return (
    <>
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes slideInLeft {
            from {
              opacity: 0;
              transform: translateX(-30px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          @keyframes slideInRight {
            from {
              opacity: 0;
              transform: translateX(30px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-8px);
            }
          }
          
          @keyframes glow {
            0%, 100% {
              box-shadow: 0 0 20px rgba(139, 92, 246, 0.4);
            }
            50% {
              box-shadow: 0 0 40px rgba(139, 92, 246, 0.8), 0 0 60px rgba(236, 72, 153, 0.6);
            }
          }
          
          @keyframes gradient-shift {
            0%, 100% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
          }
          
          @keyframes sparkle {
            0%, 100% {
              opacity: 0;
              transform: scale(0) rotate(0deg);
            }
            50% {
              opacity: 1;
              transform: scale(1) rotate(180deg);
            }
          }
          
          @keyframes pulse {
            0%, 100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.05);
            }
          }
          
          @keyframes wave {
            0%, 100% {
              transform: rotate(0deg);
            }
            25% {
              transform: rotate(5deg);
            }
            75% {
              transform: rotate(-5deg);
            }
          }
          
          /* Enhanced footer container */
          .enhanced-footer {
            background: linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.95) 50%, rgba(51, 65, 85, 0.98) 100%);
            backdrop-filter: blur(20px) saturate(180%);
            border-top: 3px solid;
            border-image: linear-gradient(90deg, #667eea, #764ba2, #f093fb, #f5576c) 1;
            position: relative;
            overflow: hidden;
            animation: fadeInUp 1s ease-out;
          }
          
          .light .enhanced-footer {
            background: linear-gradient(135deg, rgba(248, 250, 252, 0.98) 0%, rgba(241, 245, 249, 0.95) 50%, rgba(226, 232, 240, 0.98) 100%);
          }
          
          /* Animated background elements */
          .footer-bg-elements {
            position: absolute;
            inset: 0;
            pointer-events: none;
            overflow: hidden;
          }
          
          .footer-bg-elements::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle at 30% 70%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
                        radial-gradient(circle at 70% 30%, rgba(236, 72, 153, 0.1) 0%, transparent 50%);
            animation: float 8s ease-in-out infinite;
          }
          
          .footer-bg-elements::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: 
              radial-gradient(circle at 2px 2px, rgba(139, 92, 246, 0.15) 1px, transparent 0);
            background-size: 30px 30px;
            opacity: 0.3;
          }
          
          /* Enhanced logo styling */
          .footer-logo {
            position: relative;
            overflow: hidden;
            transition: all 0.3s ease;
            animation: slideInLeft 1s ease-out;
          }
          
          .footer-logo:hover {
            transform: scale(1.05);
          }
          
          .footer-logo-gradient {
            background: linear-gradient(-45deg, #667eea, #764ba2, #f093fb, #f5576c);
            background-size: 400% 400%;
            animation: gradient-shift 4s ease infinite;
            position: relative;
            overflow: hidden;
          }
          
          .footer-logo-gradient::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
            transition: left 0.8s ease;
          }
          
          .footer-logo:hover .footer-logo-gradient::before {
            left: 100%;
          }
          
          /* Enhanced footer sections */
          .footer-section {
            animation: fadeInUp 1s ease-out;
            transition: all 0.3s ease;
          }
          
          .footer-section:nth-child(1) { animation-delay: 0.2s; }
          .footer-section:nth-child(2) { animation-delay: 0.4s; }
          .footer-section:nth-child(3) { animation-delay: 0.6s; }
          
          .footer-section:hover {
            transform: translateY(-5px);
          }
          
          /* Enhanced footer titles */
          .footer-title {
            background: linear-gradient(135deg, var(--purple-500), var(--pink-500));
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-weight: 700;
            font-size: 1.25rem;
            margin-bottom: 1rem;
            position: relative;
          }
          
          .footer-title::after {
            content: '';
            position: absolute;
            bottom: -4px;
            left: 0;
            width: 50px;
            height: 3px;
            background: linear-gradient(90deg, var(--purple-500), var(--pink-500));
            border-radius: 2px;
            animation: pulse 2s ease-in-out infinite;
          }
          
          /* Enhanced footer links */
          .footer-link {
            color: var(--text-secondary);
            text-decoration: none;
            font-weight: 500;
            padding: 8px 0;
            display: block;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
          }
          
          .footer-link::before {
            content: '';
            position: absolute;
            bottom: 0;
            left: -100%;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, var(--purple-500), var(--pink-500));
            transition: left 0.3s ease;
          }
          
          .footer-link:hover::before {
            left: 0;
          }
          
          .footer-link:hover {
            color: var(--purple-500);
            transform: translateX(8px);
            padding-left: 12px;
          }
          
          /* Enhanced social icons */
          .social-icons-container {
            display: flex;
            gap: 1rem;
            justify-content: center;
            align-items: center;
            animation: slideInRight 1s ease-out 0.8s both;
          }
          
          .social-icon {
            width: 48px;
            height: 48px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--text-secondary);
            border: 2px solid rgba(139, 92, 246, 0.2);
            background: rgba(139, 92, 246, 0.05);
            backdrop-filter: blur(10px);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
          }
          
          .social-icon::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, var(--purple-500), var(--pink-500));
            opacity: 0;
            transition: opacity 0.3s ease;
          }
          
          .social-icon:hover::before {
            opacity: 1;
          }
          
          .social-icon:hover {
            color: white;
            border-color: transparent;
            transform: translateY(-5px) scale(1.1);
            box-shadow: 0 10px 25px rgba(139, 92, 246, 0.4);
            animation: wave 0.6s ease-in-out;
          }
          
          .social-icon svg {
            position: relative;
            z-index: 1;
            transition: all 0.3s ease;
          }
          
          .social-icon:hover svg {
            transform: scale(1.2);
          }
          
          /* Individual social icon colors */
          .social-icon.facebook:hover {
            background: linear-gradient(135deg, #1877f2, #42a5f5);
            box-shadow: 0 10px 25px rgba(24, 119, 242, 0.4);
          }
          
          .social-icon.instagram:hover {
            background: linear-gradient(135deg, #e4405f, #f093fb, #fccc63);
            box-shadow: 0 10px 25px rgba(228, 64, 95, 0.4);
          }
          
          .social-icon.twitter:hover {
            background: linear-gradient(135deg, #1da1f2, #00d4ff);
            box-shadow: 0 10px 25px rgba(29, 161, 242, 0.4);
          }
          
          .social-icon.github:hover {
            background: linear-gradient(135deg, #333, #666);
            box-shadow: 0 10px 25px rgba(51, 51, 51, 0.4);
          }
          
          .social-icon.dribbble:hover {
            background: linear-gradient(135deg, #ea4c89, #ff6b9d);
            box-shadow: 0 10px 25px rgba(234, 76, 137, 0.4);
          }
          
          /* Enhanced divider */
          .footer-divider {
            height: 2px;
            background: linear-gradient(90deg, transparent, var(--purple-500), var(--pink-500), transparent);
            border: none;
            margin: 2rem 0;
            animation: gradient-shift 3s ease infinite;
          }
          
          /* Enhanced copyright section */
          .footer-copyright {
            animation: fadeInUp 1s ease-out 1s both;
          }
          
          .footer-copyright-text {
            color: var(--text-tertiary);
            font-weight: 500;
            transition: all 0.3s ease;
          }
          
          .footer-copyright-text:hover {
            color: var(--purple-500);
          }
          
          /* Sparkle effects */
          .sparkle {
            position: absolute;
            width: 4px;
            height: 4px;
            background: var(--purple-400);
            border-radius: 50%;
            animation: sparkle 3s ease-in-out infinite;
          }
          
          .sparkle:nth-child(1) { top: 10%; left: 10%; animation-delay: 0s; }
          .sparkle:nth-child(2) { top: 20%; left: 80%; animation-delay: 1s; }
          .sparkle:nth-child(3) { top: 70%; left: 20%; animation-delay: 2s; }
          .sparkle:nth-child(4) { top: 80%; left: 90%; animation-delay: 0.5s; }
          .sparkle:nth-child(5) { top: 50%; left: 50%; animation-delay: 1.5s; }
          
          /* Responsive enhancements */
          @media (max-width: 768px) {
            .footer-section {
              margin-bottom: 2rem;
            }
            
            .social-icons-container {
              justify-content: center;
              margin-top: 1rem;
            }
            
            .footer-logo {
              text-align: center;
              margin-bottom: 2rem;
            }
          }
          
          /* Dark theme specific adjustments */
          .dark .footer-link {
            color: var(--text-secondary);
          }
          
          .dark .footer-link:hover {
            color: var(--purple-400);
          }
          
          .dark .social-icon {
            border-color: rgba(139, 92, 246, 0.3);
            background: rgba(139, 92, 246, 0.1);
          }
          
          /* Animation delays for staggered effect */
          .footer-section:nth-child(1) { animation-delay: 0.2s; }
          .footer-section:nth-child(2) { animation-delay: 0.4s; }
          .footer-section:nth-child(3) { animation-delay: 0.6s; }
        `}
      </style>
      
      <Footer container className="enhanced-footer border-none">
        {/* Background elements */}
        <div className="footer-bg-elements"></div>
        
        {/* Sparkle effects */}
        <div className="sparkle"></div>
        <div className="sparkle"></div>
        <div className="sparkle"></div>
        <div className="sparkle"></div>
        <div className="sparkle"></div>
        
        <div className="w-full max-w-7xl mx-auto relative z-10">
          <div className="grid w-full justify-between sm:flex md:grid-cols-1">
            <div className="mt-5 footer-logo">
              <Link
                to="/"
                className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white"
              >
                <span className="footer-logo-gradient px-4 py-2 rounded-xl text-white shadow-lg">
                  WriteWave
                </span>
                <span className="ml-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-bold">
                  Blog
                </span>
              </Link>
              <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 max-w-md">
                ✨ Crafting digital experiences with passion and creativity. 
                Welcome to my corner of the internet where ideas come to life.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
              <div className="footer-section">
                <h3 className="footer-title">About</h3>
                <div className="space-y-2">
                  <a href="/about" className="footer-link">
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Know About Us
                    </span>
                  </a>
                  <a href="/" className="footer-link">
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                      WriteWave's Blog
                    </span>
                  </a>
                </div>
              </div>
              
              <div className="footer-section">
                <h3 className="footer-title">Follow Us</h3>
                <div className="space-y-2">
                  <a href="https://github.com/Shanidhya01" target="_blank" rel="noopener noreferrer" className="footer-link">
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      GitHub
                    </span>
                  </a>
                  <a href="#" className="footer-link">
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
                      </svg>
                      Reddit
                    </span>
                  </a>
                </div>
              </div>
              
              <div className="footer-section">
                <h3 className="footer-title">Legal</h3>
                <div className="space-y-2">
                  <a href="#" className="footer-link">
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      Privacy Policy
                    </span>
                  </a>
                  <a href="#" className="footer-link">
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Terms & Conditions
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <hr className="footer-divider" />
          
          <div className="w-full sm:flex sm:items-center sm:justify-between footer-copyright">
            <div className="footer-copyright-text">
              <span className="text-sm">
                © {new Date().getFullYear()} 
                <span className="font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent ml-1">
                  WriteWave's Blog
                </span>
                . Crafted with ❤️ and ☕
              </span>
            </div>
            
            <div className="social-icons-container">
              <a href="#" className="social-icon facebook">
                <BsFacebook size={20} />
              </a>
              <a href="#" className="social-icon instagram">
                <BsInstagram size={20} />
              </a>
              <a href="#" className="social-icon twitter">
                <BsTwitter size={20} />
              </a>
              <a href="https://github.com/Shanidhya01" target="_blank" rel="noopener noreferrer" className="social-icon github">
                <BsGithub size={20} />
              </a>
              <a href="#" className="social-icon dribbble">
                <BsDribbble size={20} />
              </a>
            </div>
          </div>
        </div>
      </Footer>
    </>
  );
};

export default FooterCom;
