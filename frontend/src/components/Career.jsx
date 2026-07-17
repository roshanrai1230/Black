import React from 'react';

const Career = () => {
  const jobs = [
    {
      title: 'Senior React Developer',
      department: 'Engineering',
      location: 'Remote / India',
      type: 'Full-time',
    },
    {
      title: 'UI/UX Designer',
      department: 'Design',
      location: 'Remote',
      type: 'Full-time',
    },
    {
      title: 'Backend Node.js Engineer',
      department: 'Engineering',
      location: 'On-site',
      type: 'Full-time',
    },
  ];

  return (
    <section id="career" className="py-24 relative bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Join Our Team</h2>
          <div className="w-24 h-1 bg-cyan-500 mx-auto rounded-full mb-6"></div>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Build the future of technology with us. We're always looking for passionate individuals to join our growing team.
          </p>
        </div>

        <div className="space-y-6 max-w-4xl mx-auto">
          {jobs.map((job, index) => (
            <div key={index} className="glass-card p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center group cursor-pointer hover:bg-slate-800/40">
              <div className="mb-4 md:mb-0">
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">{job.title}</h3>
                <div className="flex flex-wrap items-center mt-2 gap-3 text-sm text-slate-400">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {job.department}
                  </span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {job.location}
                  </span>
                  <span className="px-2 py-1 bg-slate-800 rounded-md text-xs border border-slate-700">{job.type}</span>
                </div>
              </div>
              <button className="btn-secondary whitespace-nowrap group-hover:border-cyan-500/50 group-hover:text-cyan-400">
                Apply Now
              </button>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-slate-500 mb-4">Don't see a role that fits?</p>
          <a href="#contact" className="text-indigo-400 hover:text-indigo-300 font-medium underline underline-offset-4">
            Send us your resume anyway
          </a>
        </div>
      </div>
    </section>
  );
};

export default Career;
