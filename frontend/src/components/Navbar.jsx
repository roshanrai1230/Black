import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Careers', path: '/careers' },
    { name: 'Company Info', path: '/company-info' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="w-full bg-[#030303]/80 backdrop-blur-md sticky top-0 z-50 border-b border-white/[0.02]">
      <div className="max-w-[1400px] mx-auto px-6 py-5 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 cursor-pointer">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-[#4f46e5] to-[#9333ea] flex items-center justify-center">
            <span className="text-white font-bold text-lg leading-none">L</span>
          </div>
          <div className="flex flex-col">
            <span className="text-white font-bold tracking-wider text-sm leading-none mb-1">LEXVRA</span>
            <span className="text-[#666] text-[8px] tracking-widest uppercase leading-none">Technologies</span>
          </div>
        </Link>

        {/* Links */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path;
            return (
              <Link 
                key={link.name} 
                to={link.path} 
                className={`text-sm font-medium transition-colors relative ${isActive ? 'text-[#4f46e5]' : 'text-[#888] hover:text-white'}`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-[#4f46e5]"></span>
                )}
              </Link>
            );
          })}
          
          {/* Services Dropdown */}
          <div className="relative group py-4 cursor-pointer">
            <div className="text-[#888] group-hover:text-white text-sm font-medium transition-colors flex items-center gap-1">
              Services
              <svg className="w-3 h-3 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </div>
            
            {/* Dropdown Menu */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-[600px] bg-[#0A0A0A] border border-white/5 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top translate-y-2 group-hover:translate-y-0 z-50 p-6 grid grid-cols-2 gap-x-8 gap-y-4">
              {[
                { title: 'Custom Web Application', desc: 'Bespoke apps built for your business' },
                { title: 'Mobile App Development', desc: 'Cross-platform apps with modern UI' },
                { title: 'E-commerce Solutions', desc: 'Tailored online shopping app solutions' },
                { title: 'Blockchain Development', desc: 'Secure smart contracts & dApps' },
                { title: 'Digital Marketing', desc: 'Grow visibility and generate leads' },
                { title: 'Enterprise Apps', desc: 'Custom apps for large-scale businesses' },
                { title: 'Testing & QA', desc: 'Reliable testing with quality focus' },
                { title: 'DevOps Consulting', desc: 'Streamline development with automation' },
                { title: 'Digital Transformation', desc: 'Custom strategies for digital evolution' },
                { title: 'UI/UX Design', desc: 'Intuitive and engaging user experiences' }
              ].map((service, i) => {
                const slug = service.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                return (
                  <Link to={`/services/${slug}`} key={i} className="group/item flex items-start gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
                    <div className="mt-1 w-2 h-2 rounded-full bg-[#4f46e5]/30 group-hover/item:bg-[#4f46e5] transition-colors"></div>
                    <div>
                      <h5 className="text-white text-sm font-bold group-hover/item:text-[#4f46e5] transition-colors">{service.title}</h5>
                      <p className="text-[#666] text-xs leading-relaxed mt-1">{service.desc}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div>
          <Link to="/contact" className="btn-outline">
            Get In Touch
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
