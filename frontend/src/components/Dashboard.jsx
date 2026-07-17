import React from 'react';

const Dashboard = () => {
  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (Chart & Overview) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Chart Card */}
          <div className="dashboard-card p-6">
            <div className="flex justify-between items-start mb-12">
              <div className="flex items-center space-x-2 bg-[#1c1c1c] border border-white/5 rounded-lg px-3 py-1.5">
                <div className="w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white">IT</div>
                <span className="text-white font-medium">Performance</span>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-white tracking-tight">98.5%</div>
                <div className="flex items-center justify-end space-x-3 mt-3 text-xs font-medium">
                  <span className="text-[#888] cursor-pointer hover:text-white">7D</span>
                  <span className="bg-[#222] text-white px-3 py-1 rounded-full cursor-pointer">30D</span>
                  <span className="text-[#888] cursor-pointer hover:text-white">90D</span>
                </div>
              </div>
            </div>

            {/* Glowing SVG Chart Mock */}
            <div className="h-64 w-full relative flex items-end">
              <svg className="w-full h-full drop-shadow-[0_0_15px_rgba(167,139,250,0.5)]" preserveAspectRatio="none" viewBox="0 0 100 100">
                <path d="M0,50 Q10,40 20,60 T40,30 T60,80 T80,40 T100,50" fill="none" stroke="#a78bfa" strokeWidth="1.5" />
              </svg>
              {/* Y-axis Labels */}
              <div className="absolute right-0 top-0 h-full flex flex-col justify-between text-[10px] text-[#555] py-2">
                <span>100%</span>
                <span>90%</span>
                <span>80%</span>
              </div>
              {/* X-axis Labels */}
              <div className="absolute bottom-[-24px] left-0 w-full flex justify-between text-[10px] text-[#555] pr-8">
                <span>JUN 17</span>
                <span>JUN 24</span>
                <span>JUL 2</span>
                <span>JUL 9</span>
                <span>JUL 16</span>
              </div>
            </div>
          </div>

          {/* Overview Card */}
          <div className="dashboard-card p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-medium text-white">Overview</h2>
              <div className="flex space-x-2">
                <span className="px-2 py-1 bg-[#1a1a1a] text-[#888] text-[10px] rounded flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5"></span>ENTERPRISE</span>
                <span className="px-2 py-1 bg-[#1a1a1a] text-[#888] text-[10px] rounded">CLOUD</span>
                <span className="px-2 py-1 bg-[#1a1a1a] text-[#888] text-[10px] rounded">SECURITY</span>
              </div>
            </div>

            <div className="flex items-center space-x-4 mb-4">
              <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold">LX</div>
              <div>
                <h3 className="text-white font-medium">LEXVRA Core Services</h3>
                <p className="text-[#666] text-sm">Enterprise IT</p>
              </div>
              <div className="ml-auto bg-[#1a1a1a] text-white text-xs px-2 py-1 rounded border border-white/5">100%</div>
            </div>

            <p className="text-[#888] text-sm leading-relaxed mb-4">
              LEXVRA provides top-tier, enterprise-grade software solutions and IT consulting that give businesses the technological edge. It is fully supported by a team of expert engineers and designers via regulated cloud infrastructures.
            </p>
          </div>

        </div>

        {/* Right Column (Action Panel) */}
        <div className="lg:col-span-5">
          <div className="dashboard-card p-4 sm:p-6">
            {/* Tabs */}
            <div className="flex w-full bg-[#0c0c0c] rounded-xl p-1 mb-6 border border-white/5">
              <button className="flex-1 py-2 text-sm font-medium text-[#9d8bfa] bg-[#1a1a1a] rounded-lg shadow border border-white/5">Service Request</button>
              <button className="flex-1 py-2 text-sm font-medium text-[#888] hover:text-white rounded-lg transition-colors">Consultation</button>
            </div>

            <div className="flex space-x-6 border-b border-white/5 mb-6 text-sm font-medium px-2">
              <button className="pb-3 text-white border-b-2 border-[#9d8bfa]">Standard</button>
              <button className="pb-3 text-[#555] hover:text-[#888]">Custom</button>
            </div>

            {/* Form Inputs */}
            <div className="space-y-2 relative">
              <div className="flex justify-between text-xs text-[#555] mb-2 px-1">
                <span>Budget</span>
                <svg className="w-4 h-4 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>

              {/* Input 1 */}
              <div className="input-panel">
                <div className="flex justify-between items-center mb-1">
                  <input type="text" placeholder="0" className="bg-transparent text-2xl text-white outline-none w-1/2 placeholder-[#333]" />
                  <button className="flex items-center space-x-2 bg-[#1a1a1a] border border-white/5 px-3 py-1.5 rounded-lg hover:bg-[#222] transition-colors">
                    <span className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-[10px] text-white">$</span>
                    <span className="text-white text-sm font-medium">USD</span>
                    <svg className="w-3 h-3 text-[#888]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </button>
                </div>
                <div className="text-[#555] text-xs">$0</div>
              </div>

              {/* Swap Icon */}
              <div className="absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="bg-[#0c0c0c] border border-white/5 rounded-full p-1.5 cursor-pointer hover:bg-[#1a1a1a]">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                </div>
              </div>

              {/* Input 2 */}
              <div className="input-panel mt-1">
                <div className="flex justify-between items-center mb-1">
                  <input type="text" placeholder="Idea" className="bg-transparent text-2xl text-white outline-none w-1/2 placeholder-[#333]" />
                  <button className="flex items-center space-x-2 bg-[#1a1a1a] border border-white/5 px-3 py-1.5 rounded-lg hover:bg-[#222] transition-colors">
                    <span className="w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center text-[10px] text-white font-bold">LX</span>
                    <span className="text-white text-sm font-medium">App</span>
                    <svg className="w-3 h-3 text-[#888]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </button>
                </div>
                <div className="text-[#555] text-xs">Product</div>
              </div>
            </div>

            <button className="w-full bg-[#161616] hover:bg-[#222] border border-white/5 text-white font-medium py-4 rounded-xl mt-4 transition-colors">
              Submit Request
            </button>

            <div className="flex justify-between items-center text-[10px] text-[#555] mt-6 px-1 uppercase tracking-wider">
              <span>Estimated Delivery:</span>
              <span className="text-white">12 Weeks</span>
            </div>

            <div className="flex space-x-6 border-b border-white/5 mt-8 mb-4 text-xs font-medium uppercase tracking-wider">
              <button className="pb-2 text-white border-b-2 border-white">Open Projects</button>
              <button className="pb-2 text-[#555] hover:text-[#888]">Past Projects</button>
            </div>
            
            <div className="text-center text-[#555] text-xs py-8">
              No open projects
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
