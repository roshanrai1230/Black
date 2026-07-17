import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    subject: '',
    message: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setFormData({ name: '', email: '', mobile: '', subject: '', message: '' });
        
        // Hide success message after 5 seconds
        setTimeout(() => setSuccess(false), 5000);
      } else {
        setError(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Failed to connect to the server. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full pb-20">
      {/* Hero Section */}
      <section className="pt-20 pb-16 relative overflow-hidden border-b border-white/5 mb-20">
        <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <p className="text-[#4f46e5] text-xs font-bold tracking-widest uppercase mb-4">GET IN TOUCH</p>
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">Contact Us</h1>
            <p className="text-[#888] text-lg leading-relaxed max-w-lg">
              We'd love to hear from you. Fill out the form or reach out using the details below.
            </p>
          </div>
          {/* Map image */}
          <div className="w-full h-[300px] lg:h-[400px] relative overflow-hidden">
            <img 
              src="/images/contact-hero.jpg" 
              alt="Location Map" 
              className="w-full h-full object-cover"
            />
            {/* Blending gradients */}
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#030303]"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#030303] to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Contact Details (Left Column) */}
          <div className="lg:col-span-5 space-y-8">
            
            <div className="flex items-start space-x-6">
              <div className="w-12 h-12 rounded-xl bg-[#0a0a0a] border border-white/10 flex items-center justify-center text-[#4f46e5] flex-shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">Email Us</h4>
                <a href="mailto:hello@lexvra.tech" className="text-[#888] text-sm hover:text-[#4f46e5] transition-colors">hello@lexvra.tech</a>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="w-12 h-12 rounded-xl bg-[#0a0a0a] border border-white/10 flex items-center justify-center text-[#4f46e5] flex-shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">Call Us</h4>
                <a href="tel:+919876543210" className="text-[#888] text-sm hover:text-[#4f46e5] transition-colors">+91 98765 43210</a>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="w-12 h-12 rounded-xl bg-[#0a0a0a] border border-white/10 flex items-center justify-center text-[#4f46e5] flex-shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">Office Location</h4>
                <p className="text-[#888] text-sm leading-relaxed max-w-[200px]">
                  123, Tech Park, Mohali, Punjab - 160055
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-6 pt-4 border-t border-white/5">
              <div className="w-12 h-12 flex items-center justify-center text-white flex-shrink-0 font-bold">
                Follow Us
              </div>
              <div className="flex items-center space-x-3 mt-1.5">
                {['LinkedIn', 'Twitter', 'Instagram', 'GitHub'].map((social, i) => (
                  <a key={i} href="#" className="w-8 h-8 rounded-full bg-[#141414] border border-white/5 flex items-center justify-center text-[#888] hover:text-white transition-colors">
                    <div className="w-3 h-3 bg-current rounded-sm"></div>
                  </a>
                ))}
              </div>
            </div>

          </div>

          {/* Form (Right Column) */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-8">
              <h3 className="text-2xl font-bold text-white mb-8">Send Us A Message</h3>
              
              {success && (
                <div className="mb-6 p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-500 text-sm font-medium">
                  Thank you! Your message has been sent successfully. We will get back to you shortly.
                </div>
              )}
              
              {error && (
                <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[#888] text-sm">Your Name *</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#4f46e5] focus:ring-1 focus:ring-[#4f46e5] transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[#888] text-sm">Your Email *</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#4f46e5] focus:ring-1 focus:ring-[#4f46e5] transition-all"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[#888] text-sm">Mobile Number *</label>
                    <input 
                      type="tel" 
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      required
                      maxLength="10"
                      pattern="[0-9]{10}"
                      className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#4f46e5] focus:ring-1 focus:ring-[#4f46e5] transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[#888] text-sm">Subject</label>
                    <input 
                      type="text" 
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#4f46e5] focus:ring-1 focus:ring-[#4f46e5] transition-all"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-[#888] text-sm">Your Message *</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#4f46e5] focus:ring-1 focus:ring-[#4f46e5] transition-all resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className={`btn-gradient w-full py-4 text-lg ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Contact;
