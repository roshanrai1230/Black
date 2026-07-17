import React, { useEffect, useState } from 'react';
import { Mail, Check, Trash2, Search, Filter } from 'lucide-react';

const AdminContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/contact');
      const data = await response.json();
      if (data.success) {
        setMessages(data.data);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleMarkAsRead = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/contact/${id}/read`, {
        method: 'PUT'
      });
      if (response.ok) {
        setMessages(messages.map(msg => msg._id === id ? { ...msg, isRead: true } : msg));
      }
    } catch (error) {
      console.error("Error marking as read:", error);
    }
  };

  return (
    <div className="p-8 w-full max-w-[1600px] mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Contact Messages</h1>
          <p className="text-[#888] text-sm">View and manage messages from your website contact form.</p>
        </div>
        
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <div className="relative group flex-1 md:w-64">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666]" />
            <input 
              type="text" 
              placeholder="Search messages..." 
              className="w-full bg-[#141414] border border-white/10 rounded-lg py-2 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-[#4f46e5]/50 transition-all"
            />
          </div>
          <button className="flex items-center space-x-2 bg-[#141414] border border-white/10 px-4 py-2 rounded-lg text-sm text-[#ccc] hover:bg-white/5 transition-colors">
            <Filter size={14} />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Messages List */}
      <div className="glass-panel rounded-xl border border-white/5 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-[#888]">Loading messages...</div>
        ) : messages.length === 0 ? (
          <div className="p-12 text-center text-[#888]">
            <Mail size={48} className="mx-auto mb-4 opacity-20" />
            <p>No contact messages found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#0a0a0a] text-[#888] text-xs font-medium border-b border-white/5 uppercase tracking-wider">
                  <th className="px-6 py-4">Sender</th>
                  <th className="px-6 py-4">Contact Info</th>
                  <th className="px-6 py-4 w-1/3">Message</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((msg) => (
                  <tr key={msg._id} className={`border-b border-white/5 hover:bg-white/[0.02] transition-colors ${!msg.isRead ? 'bg-[#4f46e5]/[0.02]' : ''}`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        {!msg.isRead && <div className="w-2 h-2 rounded-full bg-[#4f46e5]"></div>}
                        <div className="flex flex-col">
                          <span className={`text-sm ${!msg.isRead ? 'text-white font-semibold' : 'text-[#ccc]'}`}>{msg.name}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col space-y-1">
                        <span className="text-xs text-[#888]">{msg.email}</span>
                        <span className="text-xs text-[#888]">{msg.mobile}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className={`text-sm mb-1 ${!msg.isRead ? 'text-white font-medium' : 'text-[#aaa]'}`}>{msg.subject || 'No Subject'}</span>
                        <p className="text-xs text-[#666] line-clamp-2">{msg.message}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs text-[#888]">
                      {new Date(msg.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        {!msg.isRead ? (
                          <button 
                            onClick={() => handleMarkAsRead(msg._id)}
                            className="p-1.5 rounded-lg bg-[#4f46e5]/10 text-[#4f46e5] hover:bg-[#4f46e5]/20 transition-colors tooltip"
                            title="Mark as read"
                          >
                            <Check size={14} />
                          </button>
                        ) : (
                          <span className="p-1.5 text-green-500/50 tooltip" title="Read">
                            <Check size={14} />
                          </span>
                        )}
                        <button className="p-1.5 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors tooltip" title="Delete">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};

export default AdminContactMessages;
