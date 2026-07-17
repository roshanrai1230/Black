import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, Users, Building2, FolderKanban, Layers, Quote, Briefcase, Mail,
  FileText, PenTool, Image, HelpCircle, UserCircle2,
  Settings, Search, Link2, ShieldCheck, Database, ChevronRight
} from 'lucide-react';

const AdminSidebar = () => {
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [adminUser, setAdminUser] = useState({
    name: 'Admin User',
    email: 'admin@lexvra.tech',
    picture: 'https://i.pravatar.cc/150?u=a042581f4e29026704d'
  });

  useEffect(() => {
    const userStr = localStorage.getItem('adminUser');
    if (userStr) {
      try {
        setAdminUser(JSON.parse(userStr));
      } catch (err) {
        console.error("Error parsing admin user details", err);
      }
    }
  }, []);

  useEffect(() => {
    // Function to fetch unread count
    const fetchUnreadCount = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/contact/unread/count');
        const data = await response.json();
        if (data.success) {
          setUnreadMessages(data.count);
        }
      } catch (error) {
        console.error("Failed to fetch unread messages count", error);
      }
    };

    // Initial fetch
    fetchUnreadCount();

    // Poll every 5 seconds for real-time counter updates without refreshing
    const interval = setInterval(fetchUnreadCount, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <aside className="w-64 h-screen bg-[#0a0a0a] border-r border-white/5 flex flex-col flex-shrink-0">
      
      {/* Logo */}
      <div className="h-20 flex items-center px-6 border-b border-white/5">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4f46e5] to-[#9333ea] flex items-center justify-center font-black text-white text-xl">
            N
          </div>
          <div className="flex flex-col">
            <span className="text-white font-bold text-lg leading-none">NEXORA</span>
            <span className="text-[#888] text-[10px] tracking-widest font-semibold uppercase mt-1">TECHNOLOGIES</span>
          </div>
        </div>
      </div>

      {/* Nav Links */}
      <div className="flex-1 overflow-y-auto py-6 px-4 custom-scrollbar">
        
        <NavLink 
          to="/admin" 
          end
          className={({isActive}) => `flex items-center space-x-3 px-4 py-3 rounded-lg mb-6 transition-colors ${isActive ? 'bg-[#4f46e5]/10 text-white' : 'text-[#888] hover:text-white hover:bg-white/5'}`}
        >
          <LayoutDashboard size={18} className="text-[#4f46e5]" />
          <span className="font-medium text-sm">Dashboard</span>
        </NavLink>

        {/* MANAGEMENT */}
        <div className="mb-6">
          <p className="px-4 text-xs font-bold tracking-wider text-[#666] mb-3">MANAGEMENT</p>
          <ul className="space-y-1">
            <NavItem icon={<Users size={18} />} label="Users" />
            <NavItem icon={<Building2 size={18} />} label="Clients" />
            <NavItem icon={<FolderKanban size={18} />} label="Projects" />
            <NavItem icon={<Layers size={18} />} label="Services" />
            <NavItem icon={<Quote size={18} />} label="Testimonials" />
            <NavItem icon={<Briefcase size={18} />} label="Careers" />
            
            <li>
              <NavLink 
                to="/admin/messages" 
                className={({isActive}) => `flex items-center justify-between px-4 py-2.5 rounded-lg transition-colors group ${isActive ? 'bg-[#4f46e5]/10 text-white' : 'text-[#888] hover:text-white hover:bg-white/5'}`}
              >
                <div className="flex items-center space-x-3">
                  <span className={`${'text-[#666] group-hover:text-white transition-colors'}`}><Mail size={18} /></span>
                  <span className="text-sm">Contact Messages</span>
                </div>
                {unreadMessages > 0 && (
                  <span className="bg-[#4f46e5] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {unreadMessages}
                  </span>
                )}
              </NavLink>
            </li>
          </ul>
        </div>



      </div>

      {/* User Profile Footer */}
      <div className="p-4 border-t border-white/5">
        <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#141414] to-[#222] border border-white/10 flex items-center justify-center overflow-hidden">
               <img src={adminUser.picture} alt="Admin" className="w-full h-full object-cover" />
            </div>
            <div className="text-left max-w-[130px]">
              <p className="text-white text-xs font-semibold truncate">{adminUser.name}</p>
              <div className="flex items-center space-x-1 mt-0.5">
                 <div className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0"></div>
                 <p className="text-[#888] text-[9px] truncate">{adminUser.email}</p>
              </div>
            </div>
          </div>
          <ChevronRight size={16} className="text-[#666]" />
        </button>
      </div>

    </aside>
  );
};

const NavItem = ({ icon, label }) => (
  <li>
    <a href="#" className="flex items-center space-x-3 px-4 py-2.5 rounded-lg text-[#888] hover:text-white hover:bg-white/5 transition-colors group">
      <span className="text-[#666] group-hover:text-white transition-colors">{icon}</span>
      <span className="text-sm">{label}</span>
    </a>
  </li>
);

export default AdminSidebar;
