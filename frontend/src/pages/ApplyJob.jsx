import React, { useState, useRef } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, ChevronRight, User, Mail, Phone, MapPin, 
  Briefcase, Calendar, UploadCloud, Link as LinkIcon, 
  Lock, Sparkles, Check, FileText, X, HelpCircle, ArrowRight
} from 'lucide-react';

const ApplyJob = () => {
  const locationState = useLocation();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // Retrieve job details from navigation state, fallback to UI/UX Designer default if none passed
  const job = locationState.state?.job || {
    title: 'UI/UX Designer',
    exp: '2-4 Yrs Exp',
    loc: 'Remote',
    dept: 'Design'
  };

  // State variables
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    currentPosition: '',
    experience: '',
    relevantExperience: '',
    noticePeriod: '',
    portfolioLink: '',
    coverLetter: ''
  });

  const [resumeFile, setResumeFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Static options for Location selection
  const locationOptions = [
    'Mohali, India',
    'Delhi NCR, India',
    'Bangalore, India',
    'Remote',
    'Outside India'
  ];

  // Static options for Experience selection
  const experienceOptions = [
    'Fresher / Entry Level',
    '1-2 Years',
    '2-4 Years',
    '5+ Years'
  ];

  // Static options for Notice Period
  const noticePeriodOptions = [
    'Immediate',
    '15 Days',
    '30 Days',
    '60 Days',
    '90 Days'
  ];

  // Form Handlers
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Drag & Drop
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (file) => {
    const allowedTypes = ['.pdf', '.doc', '.docx'];
    const extension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    
    if (!allowedTypes.includes(extension)) {
      setError('Invalid file format. Please upload a PDF, DOC, or DOCX file.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('File size exceeds the 5MB limit.');
      return;
    }

    setError('');
    setResumeFile(file);
  };

  const removeResume = () => {
    setResumeFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Submit Application handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Frontend validations
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.location || !formData.experience) {
      setError('Please fill in all required fields.');
      return;
    }

    if (!resumeFile) {
      setError('Please upload your resume.');
      return;
    }

    setLoading(true);

    try {
      // Use FormData to support multipart file upload
      const submitData = new FormData();
      submitData.append('jobTitle', job.title);
      submitData.append('fullName', formData.fullName);
      submitData.append('email', formData.email);
      submitData.append('phone', formData.phone);
      submitData.append('location', formData.location);
      submitData.append('currentPosition', formData.currentPosition);
      submitData.append('experience', formData.experience);
      submitData.append('relevantExperience', formData.relevantExperience);
      submitData.append('noticePeriod', formData.noticePeriod);
      submitData.append('portfolioLink', formData.portfolioLink);
      submitData.append('coverLetter', formData.coverLetter);
      submitData.append('resume', resumeFile);

      const response = await fetch('http://localhost:5000/api/applications', {
        method: 'POST',
        body: submitData
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        // Clear form
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          location: '',
          currentPosition: '',
          experience: '',
          relevantExperience: '',
          noticePeriod: '',
          portfolioLink: '',
          coverLetter: ''
        });
        setResumeFile(null);
      } else {
        setError(data.message || 'Failed to submit application. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to connect to server. Please ensure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  // Generate dynamic job description for summary sidebar
  const getJobAboutText = (title) => {
    const desc = title.toLowerCase();
    if (desc.includes('ui/ux') || desc.includes('design')) {
      return 'We are looking for a creative UI/UX Designer to design intuitive and engaging user experiences for our web and mobile applications.';
    } else if (desc.includes('frontend') || desc.includes('react')) {
      return 'We are looking for a skilled Frontend Developer to build responsive, high-performance web applications using React.js and modern frontend technologies.';
    } else if (desc.includes('backend') || desc.includes('node')) {
      return 'We are looking for a strong Backend Developer to build scalable APIs, database architectures, and secure server-side logic using Node.js.';
    } else if (desc.includes('devops') || desc.includes('engineer')) {
      return 'We are looking for a DevOps Engineer to automate deployments, manage cloud infrastructure, and maintain continuous integration/continuous delivery pipelines.';
    } else {
      return 'We are always looking for passionate individuals to join our team across engineering, design, and operations roles.';
    }
  };

  return (
    <div className="w-full pb-20 pt-8 max-w-[1400px] mx-auto px-6">
      {/* Breadcrumb Trail */}
      <div className="flex items-center space-x-2 text-xs text-[#666] mb-6">
        <Link to="/careers" className="hover:text-white transition-colors">Careers</Link>
        <ChevronRight size={12} />
        <span>{job.title}</span>
        <ChevronRight size={12} />
        <span className="text-[#4f46e5] font-semibold">Apply</span>
      </div>

      {/* Back Link */}
      <Link 
        to="/careers" 
        className="inline-flex items-center space-x-2 text-xs text-[#888] hover:text-white mb-10 transition-colors group"
      >
        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
        <span>Back to Careers</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Job Application Form */}
        <div className="lg:col-span-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-3">Apply for {job.title}</h1>
            <p className="text-[#888] text-sm leading-relaxed">
              Fill out the form below to apply for this position. We'll get back to you if your profile matches our requirements.
            </p>
          </div>

          {/* Messages */}
          {success && (
            <div className="mb-8 p-5 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium">
              🎉 Thank you! Your application has been submitted successfully. We'll review your resume and contact you soon.
            </div>
          )}
          
          {error && (
            <div className="mb-8 p-5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8" onDragEnter={handleDrag}>
            
            {/* Section 1: Personal Information */}
            <div className="glass-panel p-6 border border-white/5 space-y-6">
              <h3 className="text-white font-bold text-base border-b border-white/5 pb-3">Personal Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Full Name */}
                <div className="flex flex-col space-y-2">
                  <label className="text-[#aaa] text-xs font-semibold">Full Name <span className="text-red-500">*</span></label>
                  <div className="relative group">
                    <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555] group-focus-within:text-[#4f46e5] transition-colors" />
                    <input 
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      required
                      className="w-full bg-[#111] border border-white/5 rounded-lg py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#4f46e5]/40 focus:ring-1 focus:ring-[#4f46e5]/20 transition-all"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div className="flex flex-col space-y-2">
                  <label className="text-[#aaa] text-xs font-semibold">Email Address <span className="text-red-500">*</span></label>
                  <div className="relative group">
                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555] group-focus-within:text-[#4f46e5] transition-colors" />
                    <input 
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      required
                      className="w-full bg-[#111] border border-white/5 rounded-lg py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#4f46e5]/40 focus:ring-1 focus:ring-[#4f46e5]/20 transition-all"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div className="flex flex-col space-y-2">
                  <label className="text-[#aaa] text-xs font-semibold">Phone Number <span className="text-red-500">*</span></label>
                  <div className="relative group">
                    <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555] group-focus-within:text-[#4f46e5] transition-colors" />
                    <input 
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 98765 43210"
                      required
                      className="w-full bg-[#111] border border-white/5 rounded-lg py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#4f46e5]/40 focus:ring-1 focus:ring-[#4f46e5]/20 transition-all"
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="flex flex-col space-y-2">
                  <label className="text-[#aaa] text-xs font-semibold">Location <span className="text-red-500">*</span></label>
                  <div className="relative group">
                    <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555] group-focus-within:text-[#4f46e5] transition-colors z-10" />
                    <select 
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-[#111] border border-white/5 rounded-lg py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#4f46e5]/40 focus:ring-1 focus:ring-[#4f46e5]/20 transition-all appearance-none cursor-pointer"
                    >
                      <option value="" disabled>Enter your current location</option>
                      {locationOptions.map((locOption, index) => (
                        <option key={index} value={locOption}>{locOption}</option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#555]">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Section 2: Professional Information */}
            <div className="glass-panel p-6 border border-white/5 space-y-6">
              <h3 className="text-white font-bold text-base border-b border-white/5 pb-3">Professional Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Current Position */}
                <div className="flex flex-col space-y-2">
                  <label className="text-[#aaa] text-xs font-semibold">Current Position</label>
                  <div className="relative group">
                    <Briefcase size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555] group-focus-within:text-[#4f46e5] transition-colors" />
                    <input 
                      type="text"
                      name="currentPosition"
                      value={formData.currentPosition}
                      onChange={handleInputChange}
                      placeholder="Your current job title"
                      className="w-full bg-[#111] border border-white/5 rounded-lg py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#4f46e5]/40 focus:ring-1 focus:ring-[#4f46e5]/20 transition-all"
                    />
                  </div>
                </div>

                {/* Experience */}
                <div className="flex flex-col space-y-2">
                  <label className="text-[#aaa] text-xs font-semibold">Experience <span className="text-red-500">*</span></label>
                  <div className="relative group">
                    <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555] group-focus-within:text-[#4f46e5] transition-colors z-10" />
                    <select 
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-[#111] border border-white/5 rounded-lg py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#4f46e5]/40 focus:ring-1 focus:ring-[#4f46e5]/20 transition-all appearance-none cursor-pointer"
                    >
                      <option value="" disabled>Select your experience</option>
                      {experienceOptions.map((expOption, index) => (
                        <option key={index} value={expOption}>{expOption}</option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#555]">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </div>
                  </div>
                </div>

                {/* Relevant Experience */}
                <div className="flex flex-col space-y-2 md:col-span-2">
                  <label className="text-[#aaa] text-xs font-semibold">Relevant Experience</label>
                  <textarea 
                    name="relevantExperience"
                    value={formData.relevantExperience}
                    onChange={handleInputChange}
                    placeholder="Describe your relevant experience..."
                    rows={4}
                    className="w-full bg-[#111] border border-white/5 rounded-lg py-3 px-4 text-sm text-white focus:outline-none focus:border-[#4f46e5]/40 focus:ring-1 focus:ring-[#4f46e5]/20 transition-all resize-none"
                  />
                </div>

                {/* Notice Period */}
                <div className="flex flex-col space-y-2 md:col-span-2">
                  <label className="text-[#aaa] text-xs font-semibold">Notice Period</label>
                  <div className="relative group">
                    <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555] group-focus-within:text-[#4f46e5] transition-colors z-10" />
                    <select 
                      name="noticePeriod"
                      value={formData.noticePeriod}
                      onChange={handleInputChange}
                      className="w-full bg-[#111] border border-white/5 rounded-lg py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#4f46e5]/40 focus:ring-1 focus:ring-[#4f46e5]/20 transition-all appearance-none cursor-pointer"
                    >
                      <option value="" disabled>Select notice period</option>
                      {noticePeriodOptions.map((npOption, index) => (
                        <option key={index} value={npOption}>{npOption}</option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#555]">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Section 3: Resume & Portfolio */}
            <div className="glass-panel p-6 border border-white/5 space-y-6">
              <h3 className="text-white font-bold text-base border-b border-white/5 pb-3">Resume & Portfolio</h3>
              
              <div className="grid grid-cols-1 gap-6">
                
                {/* Upload Resume */}
                <div className="flex flex-col space-y-2">
                  <label className="text-[#aaa] text-xs font-semibold font-sans">Upload Resume <span className="text-red-500">*</span></label>
                  
                  {/* Drag-and-drop box */}
                  <div 
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current.click()}
                    className={`w-full border border-dashed rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer transition-all ${
                      dragActive 
                        ? 'border-[#4f46e5] bg-[#4f46e5]/5' 
                        : resumeFile 
                          ? 'border-[#9333ea]/30 bg-[#9333ea]/[0.02]' 
                          : 'border-white/10 hover:border-white/20 bg-[#070707]'
                    }`}
                  >
                    <input 
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                    />

                    {resumeFile ? (
                      <div className="flex flex-col items-center space-y-3 w-full" onClick={(e) => e.stopPropagation()}>
                        <div className="w-12 h-12 rounded-xl bg-[#9333ea]/10 flex items-center justify-center text-[#9333ea]">
                          <FileText size={24} />
                        </div>
                        <div className="text-center">
                          <p className="text-white text-sm font-semibold max-w-[250px] truncate">{resumeFile.name}</p>
                          <p className="text-[#666] text-xs mt-1">{(resumeFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                        </div>
                        <button 
                          type="button"
                          onClick={removeResume}
                          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-md bg-red-500/10 border border-red-500/20 text-red-400 text-xs hover:bg-red-500 hover:text-white transition-colors mt-2"
                        >
                          <X size={12} />
                          <span>Remove</span>
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="w-12 h-12 rounded-xl bg-[#4f46e5]/10 flex items-center justify-center text-[#4f46e5] mb-4">
                          <UploadCloud size={24} />
                        </div>
                        <p className="text-white text-sm font-medium mb-1">
                          <span className="text-[#4f46e5] hover:underline">Upload Resume</span>
                        </p>
                        <p className="text-[#555] text-xs text-center leading-relaxed">
                          Drag and drop your file here, or click to browse<br />
                          PDF, DOC, DOCX (Max 5MB)
                        </p>
                      </>
                    )}
                  </div>
                </div>

                {/* Portfolio Link */}
                <div className="flex flex-col space-y-2">
                  <label className="text-[#aaa] text-xs font-semibold">Portfolio Link</label>
                  <div className="relative group">
                    <LinkIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555] group-focus-within:text-[#4f46e5] transition-colors" />
                    <input 
                      type="url"
                      name="portfolioLink"
                      value={formData.portfolioLink}
                      onChange={handleInputChange}
                      placeholder="https://your-portfolio.com"
                      className="w-full bg-[#111] border border-white/5 rounded-lg py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#4f46e5]/40 focus:ring-1 focus:ring-[#4f46e5]/20 transition-all"
                    />
                  </div>
                </div>

              </div>
            </div>

            {/* Section 4: Cover Letter (Optional) */}
            <div className="glass-panel p-6 border border-white/5 space-y-6">
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <h3 className="text-white font-bold text-base">Cover Letter</h3>
                <span className="text-[#555] text-xs">Optional</span>
              </div>
              
              <div className="flex flex-col space-y-2">
                <textarea 
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  placeholder="Tell us why you're a great fit for this role..."
                  rows={6}
                  className="w-full bg-[#111] border border-white/5 rounded-lg py-3 px-4 text-sm text-white focus:outline-none focus:border-[#4f46e5]/40 focus:ring-1 focus:ring-[#4f46e5]/20 transition-all resize-none"
                />
              </div>
            </div>

            {/* Submit Action Block */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
              <button 
                type="submit"
                disabled={loading}
                className="btn-gradient w-full sm:w-auto px-8 py-3.5 flex items-center justify-center space-x-2 text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{loading ? 'Submitting...' : 'Submit Application'}</span>
                {!loading && <ArrowRight size={16} />}
              </button>

              <div className="flex items-center space-x-2 text-[#555] text-xs">
                <Lock size={12} />
                <span>Your information is secure and will be kept confidential.</span>
              </div>
            </div>

          </form>
        </div>

        {/* Right Column: Sidebar (Job details & why join us) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Job Summary */}
          <div className="glass-panel p-6 border border-white/5">
            <h3 className="text-white font-bold text-base border-b border-white/5 pb-4 mb-4">Job Summary</h3>
            
            <ul className="space-y-4">
              <li className="flex items-start space-x-3.5">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[#888] flex-shrink-0">
                  <User size={14} />
                </div>
                <div>
                  <p className="text-[10px] text-[#555] font-semibold uppercase tracking-wider">Position</p>
                  <p className="text-white text-xs font-medium mt-0.5">{job.title}</p>
                </div>
              </li>

              <li className="flex items-start space-x-3.5">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[#888] flex-shrink-0">
                  <Calendar size={14} />
                </div>
                <div>
                  <p className="text-[10px] text-[#555] font-semibold uppercase tracking-wider">Experience</p>
                  <p className="text-white text-xs font-medium mt-0.5">{job.exp}</p>
                </div>
              </li>

              <li className="flex items-start space-x-3.5">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[#888] flex-shrink-0">
                  <MapPin size={14} />
                </div>
                <div>
                  <p className="text-[10px] text-[#555] font-semibold uppercase tracking-wider">Location</p>
                  <p className="text-white text-xs font-medium mt-0.5">{job.loc}</p>
                </div>
              </li>

              <li className="flex items-start space-x-3.5">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[#888] flex-shrink-0">
                  <Lock size={14} />
                </div>
                <div>
                  <p className="text-[10px] text-[#555] font-semibold uppercase tracking-wider">Employment Type</p>
                  <p className="text-white text-xs font-medium mt-0.5">Full Time</p>
                </div>
              </li>

              <li className="flex items-start space-x-3.5">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[#888] flex-shrink-0">
                  <Briefcase size={14} />
                </div>
                <div>
                  <p className="text-[10px] text-[#555] font-semibold uppercase tracking-wider">Department</p>
                  <p className="text-white text-xs font-medium mt-0.5">{job.dept || 'Engineering'}</p>
                </div>
              </li>
            </ul>
          </div>

          {/* About the Role */}
          <div className="glass-panel p-6 border border-white/5">
            <h3 className="text-white font-bold text-base mb-3">About the Role</h3>
            <p className="text-[#888] text-xs leading-relaxed">
              {getJobAboutText(job.title)}
            </p>
          </div>

          {/* Why Join Us */}
          <div className="glass-panel p-6 border border-white/5 bg-gradient-to-b from-[#140f24]/30 to-transparent relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#9333ea]/5 rounded-full filter blur-xl"></div>
            
            <div className="flex items-center space-x-2 mb-4">
              <div className="text-[#9333ea]">
                <Sparkles size={16} />
              </div>
              <h3 className="text-white font-bold text-base">Why Join Us?</h3>
            </div>

            <ul className="space-y-3.5">
              {[
                'Work with a talented and innovative team',
                'Flexible work environment',
                'Growth and learning opportunities',
                'Competitive compensation'
              ].map((point, index) => (
                <li key={index} className="flex items-start space-x-2.5">
                  <div className="w-4 h-4 rounded-full bg-[#9333ea]/10 border border-[#9333ea]/20 flex items-center justify-center text-[#9333ea] flex-shrink-0 mt-0.5">
                    <Check size={10} strokeWidth={3} />
                  </div>
                  <span className="text-[#aaa] text-xs leading-normal">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Need Help */}
          <div className="glass-panel p-6 border border-white/5">
            <div className="flex items-center space-x-2 mb-3">
              <HelpCircle size={16} className="text-[#666]" />
              <h3 className="text-white font-bold text-base">Need Help?</h3>
            </div>
            <p className="text-[#888] text-xs leading-relaxed mb-4">
              Have questions about this role? We're here to help!
            </p>
            <Link 
              to="/contact" 
              className="inline-flex items-center space-x-2 bg-[#141414] hover:bg-white/5 border border-white/10 hover:border-white/20 px-4 py-2 rounded-lg text-xs text-white font-semibold transition-colors group"
            >
              <span>Contact Us</span>
              <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ApplyJob;
