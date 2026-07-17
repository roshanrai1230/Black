import React, { useEffect, useState } from 'react';
import { 
  Briefcase, Trash2, Search, FileText, ExternalLink, Calendar, 
  MapPin, User, Mail, Phone, Clock, Plus, X, Check, ToggleLeft, ToggleRight
} from 'lucide-react';

const AdminApplications = () => {
  // Tabs: 'applications' or 'jobs'
  const [activeTab, setActiveTab] = useState('applications');
  
  // Applications State
  const [applications, setApplications] = useState([]);
  const [loadingApps, setLoadingApps] = useState(true);
  const [searchAppQuery, setSearchAppQuery] = useState('');

  // Jobs State
  const [jobs, setJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [searchJobQuery, setSearchJobQuery] = useState('');
  
  // Add Job Modal State
  const [showModal, setShowModal] = useState(false);
  const [newJob, setNewJob] = useState({
    title: '',
    department: '',
    experience: '',
    location: '',
    description: ''
  });
  const [submittingJob, setSubmittingJob] = useState(false);
  const [modalError, setModalError] = useState('');

  // Fetch Data functions
  const fetchApplications = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/applications');
      const data = await response.json();
      if (data.success) {
        setApplications(data.data);
      }
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoadingApps(false);
    }
  };

  const fetchJobs = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/jobs/admin');
      const data = await response.json();
      if (data.success) {
        setJobs(data.data);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoadingJobs(false);
    }
  };

  useEffect(() => {
    fetchApplications();
    fetchJobs();
  }, []);

  // Delete handlers
  const handleDeleteApp = async (id) => {
    if (!window.confirm("Are you sure you want to delete this application? This will permanently delete the resume file from the server.")) {
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/api/applications/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setApplications(applications.filter(app => app._id !== id));
      } else {
        alert("Failed to delete application.");
      }
    } catch (error) {
      console.error("Error deleting application:", error);
    }
  };

  const handleDeleteJob = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job posting? It will be removed from the Careers page immediately.")) {
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/api/jobs/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setJobs(jobs.filter(job => job._id !== id));
      } else {
        alert("Failed to delete job.");
      }
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  // Toggle Job active/inactive status
  const handleToggleJobStatus = async (job) => {
    try {
      const response = await fetch(`http://localhost:5000/api/jobs/${job._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isActive: !job.isActive })
      });
      const data = await response.json();
      if (response.ok) {
        setJobs(jobs.map(j => j._id === job._id ? { ...j, isActive: data.data.isActive } : j));
      }
    } catch (error) {
      console.error("Error updating job status:", error);
    }
  };

  // Handle new job submission
  const handleCreateJob = async (e) => {
    e.preventDefault();
    setModalError('');
    
    if (!newJob.title || !newJob.department || !newJob.experience || !newJob.location) {
      setModalError('Please fill out all required fields.');
      return;
    }

    setSubmittingJob(true);
    try {
      const response = await fetch('http://localhost:5000/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newJob)
      });
      const data = await response.json();
      
      if (response.ok) {
        setJobs([data.data, ...jobs]);
        setShowModal(false);
        setNewJob({ title: '', department: '', experience: '', location: '', description: '' });
      } else {
        setModalError(data.message || 'Failed to post job. Please try again.');
      }
    } catch (error) {
      console.error("Error creating job:", error);
      setModalError('Failed to connect to the server.');
    } finally {
      setSubmittingJob(false);
    }
  };

  // Filters
  const filteredApplications = applications.filter(app => 
    app.fullName.toLowerCase().includes(searchAppQuery.toLowerCase()) ||
    app.jobTitle.toLowerCase().includes(searchAppQuery.toLowerCase()) ||
    app.email.toLowerCase().includes(searchAppQuery.toLowerCase())
  );

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchJobQuery.toLowerCase()) ||
    job.department.toLowerCase().includes(searchJobQuery.toLowerCase()) ||
    job.location.toLowerCase().includes(searchJobQuery.toLowerCase())
  );

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="p-8 w-full max-w-[1600px] mx-auto">
      
      {/* Header and Title */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Careers Portal Manager</h1>
          <p className="text-[#888] text-sm">Manage open job postings and candidate application forms.</p>
        </div>
      </div>

      {/* Tabs Layout */}
      <div className="flex justify-between items-center border-b border-white/5 mb-8">
        <div className="flex space-x-6">
          <button 
            onClick={() => setActiveTab('applications')}
            className={`pb-4 text-sm font-semibold transition-all relative ${
              activeTab === 'applications' ? 'text-white font-bold' : 'text-[#888] hover:text-white'
            }`}
          >
            Applications ({applications.length})
            {activeTab === 'applications' && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#4f46e5]"></span>
            )}
          </button>
          <button 
            onClick={() => setActiveTab('jobs')}
            className={`pb-4 text-sm font-semibold transition-all relative ${
              activeTab === 'jobs' ? 'text-white font-bold' : 'text-[#888] hover:text-white'
            }`}
          >
            Job Postings ({jobs.length})
            {activeTab === 'jobs' && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#4f46e5]"></span>
            )}
          </button>
        </div>

        {/* Tab Actions */}
        {activeTab === 'jobs' && (
          <button 
            onClick={() => setShowModal(true)}
            className="mb-2 flex items-center space-x-2 bg-gradient-to-r from-[#4f46e5] to-[#9333ea] text-white px-4 py-2 rounded-lg text-xs font-semibold hover:opacity-90 transition-opacity"
          >
            <Plus size={14} />
            <span>Add Job Posting</span>
          </button>
        )}
      </div>

      {/* SEARCH BLOCK */}
      <div className="mb-6 flex justify-between items-center">
        {activeTab === 'applications' ? (
          <div className="relative group w-full md:w-80">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666]" />
            <input 
              type="text" 
              placeholder="Search applications..." 
              value={searchAppQuery}
              onChange={(e) => setSearchAppQuery(e.target.value)}
              className="w-full bg-[#141414] border border-white/10 rounded-lg py-2 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-[#4f46e5]/50 transition-all"
            />
          </div>
        ) : (
          <div className="relative group w-full md:w-80">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666]" />
            <input 
              type="text" 
              placeholder="Search jobs..." 
              value={searchJobQuery}
              onChange={(e) => setSearchJobQuery(e.target.value)}
              className="w-full bg-[#141414] border border-white/10 rounded-lg py-2 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-[#4f46e5]/50 transition-all"
            />
          </div>
        )}
      </div>

      {/* CONTENT PANELS */}
      <div className="glass-panel rounded-xl border border-white/5 overflow-hidden">
        
        {/* PANEL A: APPLICATIONS TAB */}
        {activeTab === 'applications' && (
          <>
            {loadingApps ? (
              <div className="p-12 text-center text-[#888]">Loading applications...</div>
            ) : filteredApplications.length === 0 ? (
              <div className="p-12 text-center text-[#888]">
                <FileText size={48} className="mx-auto mb-4 opacity-20" />
                <p>No job applications found.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#0a0a0a] text-[#888] text-xs font-medium border-b border-white/5 uppercase tracking-wider">
                      <th className="px-6 py-4">Applicant</th>
                      <th className="px-6 py-4">Position</th>
                      <th className="px-6 py-4">Details</th>
                      <th className="px-6 py-4">Documents & Links</th>
                      <th className="px-6 py-4">Submitted Date</th>
                      <th className="px-6 py-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredApplications.map((app) => (
                      <tr key={app._id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="text-sm text-white font-semibold">{app.fullName}</span>
                            <span className="text-xs text-[#888] mt-1 flex items-center space-x-1">
                              <Mail size={12} className="text-[#555]" />
                              <span>{app.email}</span>
                            </span>
                            <span className="text-xs text-[#888] mt-0.5 flex items-center space-x-1">
                              <Phone size={12} className="text-[#555]" />
                              <span>{app.phone}</span>
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="text-sm text-white font-medium">{app.jobTitle}</span>
                            <span className="text-xs text-[#888] mt-1 flex items-center space-x-1">
                              <MapPin size={12} className="text-[#555]" />
                              <span>{app.location}</span>
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col text-xs text-[#ccc] space-y-1">
                            <p><span className="text-[#555] font-medium">Exp:</span> {app.experience}</p>
                            {app.currentPosition && (
                              <p><span className="text-[#555] font-medium">Role:</span> {app.currentPosition}</p>
                            )}
                            {app.noticePeriod && (
                              <p><span className="text-[#555] font-medium">Notice:</span> {app.noticePeriod}</p>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col space-y-2">
                            {app.resume && (
                              <a 
                                href={`http://localhost:5000/uploads/${app.resume}`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center space-x-1.5 text-xs text-[#4f46e5] hover:text-[#c084fc] transition-colors"
                              >
                                <FileText size={12} />
                                <span className="underline">View Resume</span>
                                <ExternalLink size={10} />
                              </a>
                            )}
                            {app.portfolioLink && (
                              <a 
                                href={app.portfolioLink} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center space-x-1.5 text-xs text-teal-400 hover:text-teal-300 transition-colors"
                              >
                                <ExternalLink size={12} />
                                <span className="underline">Portfolio Link</span>
                              </a>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-xs text-[#888]">
                          <div className="flex items-center space-x-1">
                            <Clock size={12} className="text-[#555]" />
                            <span>{formatDate(app.createdAt)}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button 
                            onClick={() => handleDeleteApp(app._id)}
                            className="text-[#666] hover:text-red-500 transition-colors p-1.5 hover:bg-red-500/5 rounded-md"
                            title="Delete application"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {/* PANEL B: JOB POSTINGS TAB */}
        {activeTab === 'jobs' && (
          <>
            {loadingJobs ? (
              <div className="p-12 text-center text-[#888]">Loading jobs...</div>
            ) : filteredJobs.length === 0 ? (
              <div className="p-12 text-center text-[#888]">
                <Briefcase size={48} className="mx-auto mb-4 opacity-20" />
                <p>No job postings found.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#0a0a0a] text-[#888] text-xs font-medium border-b border-white/5 uppercase tracking-wider">
                      <th className="px-6 py-4">Job Title</th>
                      <th className="px-6 py-4">Department</th>
                      <th className="px-6 py-4">Experience</th>
                      <th className="px-6 py-4">Location</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredJobs.map((job) => (
                      <tr key={job._id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                        <td className="px-6 py-4 font-semibold text-sm text-white">
                          {job.title}
                        </td>
                        <td className="px-6 py-4 text-sm text-[#ccc]">
                          {job.department}
                        </td>
                        <td className="px-6 py-4 text-sm text-[#888]">
                          {job.experience}
                        </td>
                        <td className="px-6 py-4 text-sm text-[#888]">
                          {job.location}
                        </td>
                        <td className="px-6 py-4">
                          <button 
                            onClick={() => handleToggleJobStatus(job)}
                            className="flex items-center space-x-2 focus:outline-none transition-colors"
                            title={job.isActive ? "Deactivate job posting" : "Activate job posting"}
                          >
                            {job.isActive ? (
                              <div className="flex items-center space-x-1.5 text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-full text-xs font-semibold">
                                <Check size={12} />
                                <span>Active</span>
                              </div>
                            ) : (
                              <div className="flex items-center space-x-1.5 text-[#666] bg-white/5 border border-white/10 px-2 py-0.5 rounded-full text-xs font-semibold">
                                <X size={12} />
                                <span>Inactive</span>
                              </div>
                            )}
                          </button>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center space-x-2">
                            <button 
                              onClick={() => handleToggleJobStatus(job)}
                              className="text-[#666] hover:text-white transition-colors p-1.5"
                              title={job.isActive ? "Toggle to Inactive" : "Toggle to Active"}
                            >
                              {job.isActive ? <ToggleRight size={18} className="text-[#4f46e5]" /> : <ToggleLeft size={18} />}
                            </button>
                            <button 
                              onClick={() => handleDeleteJob(job._id)}
                              className="text-[#666] hover:text-red-500 transition-colors p-1.5 hover:bg-red-500/5 rounded-md"
                              title="Delete job posting"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

      </div>

      {/* ADD JOB MODAL DIALOG */}
      {showModal && (
        <div className="fixed inset-0 bg-[#030303]/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0A0A0A] border border-white/10 rounded-xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-white/5">
              <h3 className="text-white font-bold text-base flex items-center space-x-2">
                <Briefcase size={16} className="text-[#4f46e5]" />
                <span>Create Job Posting</span>
              </h3>
              <button 
                onClick={() => setShowModal(false)}
                className="text-[#666] hover:text-white transition-colors focus:outline-none"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body Form */}
            <form onSubmit={handleCreateJob}>
              <div className="p-6 space-y-4">
                
                {modalError && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs font-semibold">
                    {modalError}
                  </div>
                )}

                {/* Job Title */}
                <div className="flex flex-col space-y-1.5">
                  <label className="text-[#aaa] text-xs font-semibold">Job Title *</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Frontend Developer (React.js)"
                    value={newJob.title}
                    onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                    required
                    className="w-full bg-[#111] border border-white/5 rounded-lg py-2.5 px-3.5 text-sm text-white focus:outline-none focus:border-[#4f46e5]/40 transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  
                  {/* Department */}
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[#aaa] text-xs font-semibold">Department *</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Engineering"
                      value={newJob.department}
                      onChange={(e) => setNewJob({ ...newJob, department: e.target.value })}
                      required
                      className="w-full bg-[#111] border border-white/5 rounded-lg py-2.5 px-3.5 text-sm text-white focus:outline-none focus:border-[#4f46e5]/40 transition-all"
                    />
                  </div>

                  {/* Experience Required */}
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[#aaa] text-xs font-semibold">Experience *</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 2-4 Yrs Exp"
                      value={newJob.experience}
                      onChange={(e) => setNewJob({ ...newJob, experience: e.target.value })}
                      required
                      className="w-full bg-[#111] border border-white/5 rounded-lg py-2.5 px-3.5 text-sm text-white focus:outline-none focus:border-[#4f46e5]/40 transition-all"
                    />
                  </div>

                </div>

                {/* Location */}
                <div className="flex flex-col space-y-1.5">
                  <label className="text-[#aaa] text-xs font-semibold">Location *</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Mohali, India or Remote"
                    value={newJob.location}
                    onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                    required
                    className="w-full bg-[#111] border border-white/5 rounded-lg py-2.5 px-3.5 text-sm text-white focus:outline-none focus:border-[#4f46e5]/40 transition-all"
                  />
                </div>

                {/* Description */}
                <div className="flex flex-col space-y-1.5">
                  <label className="text-[#aaa] text-xs font-semibold">Brief Description (Optional)</label>
                  <textarea 
                    placeholder="Describe roles, responsibilities, or requirements..."
                    value={newJob.description}
                    onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                    rows={4}
                    className="w-full bg-[#111] border border-white/5 rounded-lg py-2.5 px-3.5 text-sm text-white focus:outline-none focus:border-[#4f46e5]/40 transition-all resize-none"
                  />
                </div>

              </div>

              {/* Modal Footer Actions */}
              <div className="px-6 py-4 bg-[#0a0a0a] border-t border-white/5 flex justify-end space-x-3">
                <button 
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-transparent hover:bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-xs font-semibold text-[#ccc] hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={submittingJob}
                  className="bg-gradient-to-r from-[#4f46e5] to-[#9333ea] text-white px-5 py-2 rounded-lg text-xs font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {submittingJob ? 'Posting...' : 'Post Job'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};

export default AdminApplications;
