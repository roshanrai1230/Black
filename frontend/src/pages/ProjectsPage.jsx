import React, { useState } from 'react';

const ProjectsPage = () => {
  const [activeTab, setActiveTab] = useState('All');
  const tabs = ['All', 'Web Development', 'Mobile Apps', 'UI/UX Design', 'Cloud Solutions'];

  const allProjects = [
    {
      title: 'Analytics Dashboard',
      category: 'Web Application',
      desc: 'A powerful analytics dashboard for real-time data insights.',
      image: '/images/project_analytics.jpg',
    },
    {
      title: 'Finance Tracker',
      category: 'Mobile App',
      desc: 'Personal finance management app for easier budgeting.',
      image: '/images/project_finance.jpg',
    },
    {
      title: 'E-Commerce Platform',
      category: 'Web Development',
      desc: 'Modern e-commerce solution with seamless experience.',
      image: '/images/project_ecommerce.jpg',
    },
    {
      title: 'Task Management App',
      category: 'UI/UX Design',
      desc: 'Clean and minimal task management app for productive teams.',
      image: '/images/project_task.jpg',
    },
    {
      title: 'Health Tracking System',
      category: 'Mobile App',
      desc: 'Comprehensive health and fitness tracking application.',
      image: '/images/project_analytics.jpg', // Reusing image placeholder
    },
    {
      title: 'Corporate Website',
      category: 'Web Development',
      desc: 'Sleek corporate identity website with dynamic content.',
      image: '/images/project_ecommerce.jpg',
    },
    {
      title: 'Social Media App',
      category: 'Mobile App',
      desc: 'Connecting people globally through innovative features.',
      image: '/images/project_finance.jpg',
    },
    {
      title: 'Cloud Infrastructure Management',
      category: 'Cloud Solutions',
      desc: 'Scalable cloud infrastructure management interface.',
      image: '/images/project_task.jpg',
    }
  ];

  return (
    <div className="w-full flex flex-col items-center pt-24 pb-20">
      <section className="w-full relative">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-[#9333ea]/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="text-center mb-16 pt-10">
            <p className="text-[#4f46e5] text-xs font-bold tracking-widest uppercase mb-2">Portfolio</p>
            <h1 className="text-5xl font-bold text-white mb-8">All Projects</h1>
            
            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2 text-sm font-medium rounded-full transition-all ${
                    activeTab === tab 
                      ? 'bg-[#1a1a1a] border border-[#4f46e5] text-white' 
                      : 'bg-transparent border border-transparent text-[#888] hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {allProjects.map((project, index) => (
              <div key={index} className="glass-panel group overflow-hidden cursor-pointer flex flex-col h-full !rounded-none">
                {/* Image */}
                <div className="w-full h-48 relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 bg-[#1a1a1a]"
                  />
                  <div className="absolute inset-0 bg-[#030303]/20 group-hover:bg-transparent transition-colors"></div>
                </div>
                
                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <span className="inline-block px-3 py-1 bg-[#1a1a1a] text-[#4f46e5] border border-white/5 rounded-full text-[10px] font-bold tracking-wider uppercase mb-4 w-max">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#4f46e5] transition-colors">{project.title}</h3>
                  <p className="text-[#888] text-sm leading-relaxed mb-6 flex-1">
                    {project.desc}
                  </p>
                  
                  <div className="flex justify-end mt-auto">
                    <svg className="w-5 h-5 text-[#444] group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectsPage;
