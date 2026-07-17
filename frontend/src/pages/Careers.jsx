import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Careers = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const defaultJobs = [
    { title: 'Frontend Developer (React.js)', exp: '2-4 Yrs Exp', loc: 'Mohali, India', dept: 'Engineering' },
    { title: 'Backend Developer (Node.js)', exp: '3-5 Yrs Exp', loc: 'Mohali, India', dept: 'Engineering' },
    { title: 'UI/UX Designer', exp: '2-4 Yrs Exp', loc: 'Remote', dept: 'Design' },
    { title: 'DevOps Engineer', exp: '3-6 Yrs Exp', loc: 'Mohali, India', dept: 'Engineering' },
  ];

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/jobs');
        const data = await response.json();
        if (data.success && data.data.length > 0) {
          const mappedJobs = data.data.map(j => ({
            title: j.title,
            exp: j.experience,
            loc: j.location,
            dept: j.department
          }));
          setJobs(mappedJobs);
        } else {
          setJobs(defaultJobs);
        }
      } catch (err) {
        console.error("Error fetching jobs, using defaults:", err);
        setJobs(defaultJobs);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="pt-20 pb-16 relative overflow-hidden border-b border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <p className="text-[#4f46e5] text-xs font-bold tracking-widest uppercase mb-4">BUILD YOUR FUTURE WITH US</p>
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">Careers</h1>
            <p className="text-[#888] text-lg leading-relaxed max-w-lg">
              Join our team of talented individuals and help us build innovative solutions that impact millions of lives around the world.
            </p>
          </div>
          {/* Right side office image */}
          <div className="w-full h-[300px] lg:h-[400px] relative overflow-hidden">
            <img 
              src="/images/careers-hero.jpg" 
              alt="Careers at LEXVRA" 
              className="w-full h-full object-cover"
            />
            {/* Blending gradients */}
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#030303]/20 to-[#030303]"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#030303] to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-20">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white">Why Work With Us?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Growth', desc: 'We invest in your learning and growth.', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
              { title: 'Flexible', desc: 'Hybrid work culture for better balance.', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
              { title: 'Innovative', desc: 'Work on exciting and challenging projects.', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
              { title: 'Culture', desc: 'Collaborative and inclusive environment.', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
            ].map((feature, i) => (
              <div key={i} className="text-center group">
                <div className="w-16 h-16 mx-auto rounded-2xl border border-[#222] bg-[#0a0a0a] flex items-center justify-center mb-6 text-[#9333ea] group-hover:border-[#4f46e5]/50 transition-colors">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={feature.icon} /></svg>
                </div>
                <h3 className="text-white font-bold mb-2">{feature.title}</h3>
                <p className="text-[#888] text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 bg-[#080808] border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Job List */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-8">Open Positions</h2>
            <div className="space-y-4">
              {loading ? (
                <div className="glass-panel p-8 text-center text-[#888]">Loading open positions...</div>
              ) : jobs.length === 0 ? (
                <div className="glass-panel p-8 text-center text-[#888]">No open positions found.</div>
              ) : (
                jobs.map((job, i) => (
                  <div key={i} className="glass-panel p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:border-[#4f46e5]/30">
                    <div>
                      <h3 className="text-white font-bold text-lg mb-2 group-hover:text-[#4f46e5] transition-colors">{job.title}</h3>
                      <div className="flex flex-wrap items-center gap-4 text-[#555] text-xs font-medium">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                          {job.exp}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                          {job.loc}
                        </span>
                      </div>
                    </div>
                    <button 
                      onClick={() => navigate('/careers/apply', { state: { job } })}
                      className="px-5 py-2 text-xs font-bold text-[#888] bg-[#111] border border-white/10 rounded hover:text-white hover:border-[#4f46e5] transition-colors whitespace-nowrap"
                    >
                      Apply Now
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Sidebar CTA */}
          <div>
            <div className="glass-panel p-8 sticky top-32">
              <h3 className="text-xl font-bold text-white mb-4">Don't see the right role?</h3>
              <p className="text-[#888] text-sm leading-relaxed mb-6">
                We're always looking for talented people. Send us your resume and we'll reach out when a suitable opportunity comes up.
              </p>
              <button 
                onClick={() => navigate('/careers/apply', { state: { job: { title: 'General Application', exp: 'N/A', loc: 'Remote', dept: 'General' } } })}
                className="btn-gradient w-full"
              >
                Send Your Resume →
              </button>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default Careers;
