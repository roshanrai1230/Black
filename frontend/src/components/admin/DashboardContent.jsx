import React, { useEffect, useState } from 'react';
import { Users, FolderKanban, Building2, Mail, Briefcase, Calendar, MoreHorizontal, ArrowUpRight, ArrowDownRight, User, CircleDot } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Dummy Data for Charts
const lineChartData = [
  { name: 'May 15', users: 200, projects: 50 },
  { name: 'May 20', users: 400, projects: 120 },
  { name: 'May 25', users: 300, projects: 80 },
  { name: 'May 30', users: 685, projects: 180 },
  { name: 'Jun 04', users: 450, projects: 110 },
  { name: 'Jun 09', users: 700, projects: 200 },
  { name: 'Jun 14', users: 650, projects: 250 },
];

const donutChartData = [
  { name: 'Direct', value: 40, color: '#9333ea' },
  { name: 'Organic Search', value: 30, color: '#3b82f6' },
  { name: 'Social Media', value: 20, color: '#ec4899' },
  { name: 'Referral', value: 7, color: '#22c55e' },
  { name: 'Other', value: 3, color: '#eab308' },
];

const recentProjects = [
  { id: 1, name: 'E-commerce Platform', client: 'TechMart Pvt. Ltd.', service: 'Web Development', status: 'In Progress', date: 'Jun 20, 2025', statusColor: 'bg-blue-500' },
  { id: 2, name: 'Fintech Dashboard', client: 'FinanceFlow Inc.', service: 'UI/UX Design', status: 'Review', date: 'Jun 18, 2025', statusColor: 'bg-purple-500' },
  { id: 3, name: 'Mobile Banking App', client: 'NextGen Bank', service: 'Mobile App Development', status: 'Completed', date: 'Jun 10, 2025', statusColor: 'bg-green-500' },
  { id: 4, name: 'SaaS Landing Page', client: 'SoftEra Solutions', service: 'Web Development', status: 'In Progress', date: 'Jun 25, 2025', statusColor: 'bg-blue-500' },
  { id: 5, name: 'Hospital Management System', client: 'CityCare Hospitals', service: 'Enterprise Solutions', status: 'Pending', date: 'Jun 30, 2025', statusColor: 'bg-yellow-500' },
];

const DashboardContent = () => {
  const [msgStats, setMsgStats] = useState({ total: 0, thisMonth: 0, lastMonth: 0 });

  useEffect(() => {
    const fetchMsgStats = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/contact');
        const data = await res.json();
        if (data.success) {
          const messages = data.data;
          const now = new Date();

          const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
          const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
          const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);

          const thisMonthCount = messages.filter(m => new Date(m.createdAt) >= thisMonthStart).length;
          const lastMonthCount = messages.filter(m => {
            const d = new Date(m.createdAt);
            return d >= lastMonthStart && d <= lastMonthEnd;
          }).length;

          setMsgStats({ total: messages.length, thisMonth: thisMonthCount, lastMonth: lastMonthCount });
        }
      } catch (err) {
        console.error('Failed to fetch message stats:', err);
      }
    };
    fetchMsgStats();
  }, []);

  // Calculate trend percentage
  const trendValue = msgStats.lastMonth === 0
    ? (msgStats.thisMonth > 0 ? 100 : 0)
    : Math.round(((msgStats.thisMonth - msgStats.lastMonth) / msgStats.lastMonth) * 100);
  const trendUp = trendValue >= 0;
  const trendStr = `${trendUp ? '+' : ''}${trendValue}%`;

  return (
    <div className="p-8 w-full max-w-[1600px] mx-auto">
      
      {/* Header section */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-[#888] text-sm">Welcome back, Admin! Here's what's happening with your platform.</p>
        </div>
        <button className="flex items-center space-x-2 bg-[#141414] border border-white/10 px-4 py-2 rounded-lg text-sm text-[#ccc] hover:bg-white/5 transition-colors">
          <Calendar size={16} className="text-[#888]" />
          <span>May 15, 2025 - Jun 14, 2025</span>
        </button>
      </div>

      {/* Stat Cards Grid (5 columns) */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        <StatCard icon={<Users size={20}/>} title="Total Users" value="1,248" trend="+12.5%" trendUp={true} color="text-purple-500" bg="bg-purple-500/10" />
        <StatCard icon={<FolderKanban size={20}/>} title="Total Projects" value="86" trend="+8.2%" trendUp={true} color="text-blue-500" bg="bg-blue-500/10" />
        <StatCard icon={<Building2 size={20}/>} title="Total Clients" value="312" trend="+9.1%" trendUp={true} color="text-indigo-500" bg="bg-indigo-500/10" />
        <StatCard icon={<Mail size={20}/>} title="Contact Messages" value={msgStats.total.toString()} trend={trendStr} trendUp={trendUp} color="text-pink-500" bg="bg-pink-500/10" />
        <StatCard icon={<Briefcase size={20}/>} title="Career Applications" value="67" trend="+15.3%" trendUp={true} color="text-teal-500" bg="bg-teal-500/10" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        {/* Area Chart */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-xl border border-white/5">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-white font-medium">Overview</h3>
            <select className="bg-[#141414] border border-white/10 rounded px-3 py-1 text-xs text-[#ccc] outline-none">
              <option>This Month</option>
              <option>Last Month</option>
            </select>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={lineChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#9333ea" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#9333ea" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis dataKey="name" stroke="#666" tick={{fill: '#666', fontSize: 12}} axisLine={false} tickLine={false} />
                <YAxis stroke="#666" tick={{fill: '#666', fontSize: 12}} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0a0a0a', borderColor: '#333', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="users" stroke="#9333ea" strokeWidth={2} fillOpacity={1} fill="url(#colorUsers)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Donut Chart */}
        <div className="glass-panel p-6 rounded-xl border border-white/5">
          <h3 className="text-white font-medium mb-6">Traffic Source</h3>
          <div className="flex items-center justify-between">
            <div className="w-1/2 h-[180px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={donutChartData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {donutChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                 <span className="text-white font-bold text-xl">1,248</span>
                 <span className="text-[#888] text-[10px]">Total Users</span>
              </div>
            </div>
            
            <div className="w-1/2 pl-4">
              <ul className="space-y-3">
                {donutChartData.map((item, idx) => (
                  <li key={idx} className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full" style={{backgroundColor: item.color}}></div>
                      <span className="text-[#ccc]">{item.name}</span>
                    </div>
                    <span className="text-white font-medium">{item.value}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Projects Table */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-xl border border-white/5">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-white font-medium">Recent Projects</h3>
            <button className="text-xs text-[#888] hover:text-white bg-[#141414] border border-white/10 px-3 py-1 rounded">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-[#888] text-xs border-b border-white/5">
                  <th className="pb-3 font-medium">Project Name</th>
                  <th className="pb-3 font-medium">Client</th>
                  <th className="pb-3 font-medium">Service</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Due Date</th>
                  <th className="pb-3 font-medium text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentProjects.map((project) => (
                  <tr key={project.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded bg-[#141414] flex items-center justify-center text-white/50 border border-white/10`}>
                        <FolderKanban size={14} />
                      </div>
                      <span className="text-sm text-[#ccc]">{project.name}</span>
                    </td>
                    <td className="py-4 text-sm text-[#888]">{project.client}</td>
                    <td className="py-4 text-sm text-[#888]">{project.service}</td>
                    <td className="py-4">
                      <span className="flex items-center space-x-1.5 bg-[#141414] border border-white/10 px-2 py-1 rounded-full w-max">
                        <div className={`w-1.5 h-1.5 rounded-full ${project.statusColor}`}></div>
                        <span className="text-[10px] text-[#ccc]">{project.status}</span>
                      </span>
                    </td>
                    <td className="py-4 text-sm text-[#888]">{project.date}</td>
                    <td className="py-4 text-center">
                      <button className="text-[#666] hover:text-white transition-colors">
                        <MoreHorizontal size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Services */}
        <div className="glass-panel p-6 rounded-xl border border-white/5">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-white font-medium">Top Services</h3>
            <button className="text-xs text-[#888] hover:text-white bg-[#141414] border border-white/10 px-3 py-1 rounded">View All</button>
          </div>
          
          <div className="space-y-6">
            <ServiceProgress rank={1} name="Web Development" percent={45} color="bg-blue-500" />
            <ServiceProgress rank={2} name="UI/UX Design" percent={25} color="bg-purple-500" />
            <ServiceProgress rank={3} name="Mobile App Development" percent={15} color="bg-green-500" />
            <ServiceProgress rank={4} name="Digital Marketing" percent={10} color="bg-pink-500" />
            <ServiceProgress rank={5} name="DevOps Consulting" percent={5} color="bg-orange-500" />
          </div>
        </div>
        
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value, trend, trendUp, color, bg }) => (
  <div className="glass-panel p-5 rounded-xl border border-white/5 hover:border-white/10 transition-colors group relative overflow-hidden">
    <div className="absolute bottom-0 left-0 w-full h-[50px] opacity-20">
       {/* Fake little sparkline */}
       <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="w-full h-full stroke-current" style={{color: trendUp ? '#22c55e' : '#ef4444'}}>
         <path d="M0,20 L10,15 L20,18 L30,5 L40,10 L50,2 L60,8 L70,1 L80,12 L90,4 L100,20" fill="none" strokeWidth="2" />
       </svg>
    </div>
    <div className="flex items-start justify-between relative z-10">
      <div className="flex flex-col">
        <span className="text-[#888] text-xs font-medium mb-1 flex items-center space-x-2">
          <div className={`w-8 h-8 rounded-lg ${bg} ${color} flex items-center justify-center mr-1`}>
            {icon}
          </div>
          {title}
        </span>
        <div className="flex items-baseline space-x-3">
          <h2 className="text-2xl font-bold text-white">{value}</h2>
          <span className={`text-[11px] font-bold flex items-center ${trendUp ? 'text-green-500' : 'text-red-500'}`}>
            {trendUp ? <ArrowUpRight size={12} className="mr-0.5" /> : <ArrowDownRight size={12} className="mr-0.5" />}
            {trend}
          </span>
        </div>
      </div>
    </div>
    <div className="text-[#666] text-[10px] mt-2 relative z-10">vs last 30 days</div>
  </div>
);

const ServiceProgress = ({ rank, name, percent, color }) => (
  <div className="flex flex-col space-y-2">
    <div className="flex justify-between items-center text-sm">
      <span className="text-[#ccc]"><span className="text-[#666] mr-2">{rank}.</span>{name}</span>
      <span className="text-white font-medium">{percent}%</span>
    </div>
    <div className="w-full h-1.5 bg-[#141414] rounded-full overflow-hidden">
      <div className={`h-full ${color} rounded-full`} style={{ width: `${percent}%` }}></div>
    </div>
  </div>
);

export default DashboardContent;
