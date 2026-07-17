import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full bg-[#030303] border-t border-white/5 pt-20 pb-6 mt-auto">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Info */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded bg-gradient-to-br from-[#4f46e5] to-[#9333ea] flex items-center justify-center">
                <span className="text-white font-bold text-lg leading-none">L</span>
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold tracking-wider text-sm leading-none mb-1">LEXVRA</span>
                <span className="text-[#666] text-[8px] tracking-widest uppercase leading-none">Technologies</span>
              </div>
            </Link>
            <p className="text-[#888] text-sm leading-relaxed max-w-xs">
              We are passionate about building digital solutions that drive real results for businesses around the world.
            </p>
            <div className="flex space-x-3">
              {['LinkedIn', 'Twitter', 'Instagram', 'GitHub'].map((social, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-full bg-[#141414] border border-white/5 flex items-center justify-center text-[#888] hover:text-white transition-colors">
                  <div className="w-3 h-3 bg-current rounded-sm"></div>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-[#888] hover:text-[#4f46e5] text-sm transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-[#888] hover:text-[#4f46e5] text-sm transition-colors">About</Link></li>
              <li><Link to="/careers" className="text-[#888] hover:text-[#4f46e5] text-sm transition-colors">Careers</Link></li>
              <li><Link to="/company-info" className="text-[#888] hover:text-[#4f46e5] text-sm transition-colors">Company Info</Link></li>
              <li><Link to="/contact" className="text-[#888] hover:text-[#4f46e5] text-sm transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold mb-6">Services</h4>
            <ul className="space-y-3">
              {['Web Development', 'Mobile App Development', 'UI/UX Design', 'Cloud Solutions', 'AI Integration'].map((link) => (
                <li key={link}>
                  <Link to="/" className="text-[#888] hover:text-[#4f46e5] text-sm transition-colors">{link}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold mb-6">Contact Info</h4>
            <ul className="space-y-4 text-sm text-[#888]">
              <li className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-[#4f46e5] mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <span>hello@lexvra.tech</span>
              </li>
              <li className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-[#4f46e5] mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-[#4f46e5] mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <span>Mohali, India</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#666]">
          <p>&copy; {new Date().getFullYear()} LEXVRA Technologies. All Rights Reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
