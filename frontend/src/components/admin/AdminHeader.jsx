import React from 'react';
import { Menu, Search, Moon, Bell, LogOut } from 'lucide-react';

const AdminHeader = () => {
  return (
    <header className="h-20 w-full bg-[#0a0a0a] border-b border-white/5 flex items-center justify-between px-8 flex-shrink-0">
      
      {/* Left side: Menu Toggle & Search */}
      <div className="flex items-center space-x-6">
        <button className="text-[#888] hover:text-white transition-colors">
          <Menu size={20} />
        </button>
        
        <div className="relative group">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666] group-focus-within:text-[#4f46e5] transition-colors" />
          <input 
            type="text" 
            placeholder="Search anything..." 
            className="w-[300px] bg-[#141414] border border-white/5 rounded-lg py-2 pl-10 pr-16 text-sm text-white focus:outline-none focus:border-[#4f46e5]/50 focus:bg-[#0a0a0a] transition-all"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded bg-[#222] border border-white/10 text-[#888] text-[10px] font-medium flex items-center space-x-1">
            <span>Ctrl</span><span>+</span><span>K</span>
          </div>
        </div>
      </div>

      {/* Right side: Actions */}
      <div className="flex items-center space-x-6">
        <button className="text-[#888] hover:text-white transition-colors">
          <Moon size={20} />
        </button>
        
        <button className="text-[#888] hover:text-white transition-colors relative">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#4f46e5] text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-[#0a0a0a]">
            8
          </span>
        </button>

        <div className="w-[1px] h-6 bg-white/10 mx-2"></div>

        <button className="flex items-center space-x-2 text-[#888] hover:text-white border border-white/10 hover:border-white/20 bg-[#141414] px-4 py-2 rounded-lg transition-all text-sm font-medium">
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>

    </header>
  );
};

export default AdminHeader;
