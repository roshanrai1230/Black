import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, AlertCircle, ToggleLeft, ToggleRight, Sparkles } from 'lucide-react';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSimulation, setIsSimulation] = useState(true); // Default to simulation for instant developer testing
  const [googleClientId, setGoogleClientId] = useState('');

  // Fetch Google Client ID from backend on mount
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/admin/auth/google-client-id');
        const data = await response.json();
        if (response.ok && data.clientId) {
          setGoogleClientId(data.clientId);
        }
      } catch (err) {
        console.error("Could not fetch Google client ID from backend, using environment var fallback", err);
      }
    };
    fetchConfig();
  }, []);

  // Initialize and render Google Identity Services Button
  useEffect(() => {
    if (isSimulation) return; // Don't load real Google login in simulation mode

    let script;
    const loadGoogleGSI = () => {
      script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);

      script.onload = () => {
        const clientId = googleClientId || import.meta.env.VITE_GOOGLE_CLIENT_ID || 'your-google-client-id.apps.googleusercontent.com';
        
        try {
          /* global google */
          google.accounts.id.initialize({
            client_id: clientId,
            callback: handleGoogleCallback,
            auto_select: false,
            cancel_on_tap_outside: true
          });

          google.accounts.id.renderButton(
            document.getElementById('googleSignInButton'),
            { 
              theme: 'filled_black', 
              size: 'large', 
              width: '100%',
              text: 'continue_with',
              shape: 'rectangular'
            }
          );
        } catch (err) {
          console.error("Google accounts.id initialization failed:", err);
          setError("Google API failed to initialize. Try Developer Mode Simulation instead.");
        }
      };
    };

    loadGoogleGSI();

    return () => {
      if (script && document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [isSimulation, googleClientId]);

  // Handler for official Google auth token
  const handleGoogleCallback = async (response) => {
    setError('');
    setLoading(true);
    
    try {
      const authResponse = await fetch('http://localhost:5000/api/admin/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          credential: response.credential,
          isSimulation: false
        })
      });

      const data = await authResponse.json();

      if (authResponse.ok && data.success) {
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('adminUser', JSON.stringify(data.admin));
        navigate('/admin');
      } else {
        setError(data.message || 'Access Denied.');
      }
    } catch (err) {
      console.error(err);
      setError('Connection to auth server failed.');
    } finally {
      setLoading(false);
    }
  };

  // Handler for simulated Developer Mode login
  const handleSimulatedLogin = async () => {
    setError('');
    setLoading(true);

    try {
      const authResponse = await fetch('http://localhost:5000/api/admin/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          isSimulation: true
        })
      });

      const data = await authResponse.json();

      if (authResponse.ok && data.success) {
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('adminUser', JSON.stringify(data.admin));
        navigate('/admin');
      } else {
        setError(data.message || 'Simulation Auth failed.');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to connect to simulation auth server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030303] text-slate-100 flex flex-col items-center justify-center font-sans relative overflow-hidden p-6 w-full">
      {/* Decorative Blur Spheres */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-[#4f46e5]/5 rounded-full filter blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#9333ea]/5 rounded-full filter blur-[100px] pointer-events-none"></div>

      {/* Main Login Card */}
      <div className="w-full max-w-md bg-[#0A0A0A] border border-white/5 rounded-2xl p-8 relative z-10 shadow-2xl">
        
        {/* Brand/Title */}
        <div className="text-center mb-10">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#4f46e5] to-[#9333ea] flex items-center justify-center mx-auto mb-5 text-white shadow-[0_0_20px_rgba(79,70,229,0.3)]">
            <ShieldCheck size={28} />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Nexora Admin Portal</h2>
          <p className="text-[#666] text-xs mt-2 uppercase tracking-widest font-semibold">Authorized Personnel Only</p>
        </div>

        {/* Error Message banner */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs font-medium flex items-start space-x-2">
            <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Authentication Button Area */}
        <div className="space-y-6">
          {isSimulation ? (
            /* Developer Mode Simulated Button */
            <button 
              onClick={handleSimulatedLogin}
              disabled={loading}
              className="w-full flex items-center justify-center space-x-3 bg-white hover:bg-slate-100 text-slate-900 py-3.5 px-4 rounded-lg font-semibold text-sm transition-all shadow-md group disabled:opacity-50"
            >
              <div className="w-5 h-5 flex items-center justify-center bg-slate-900 text-white text-[10px] font-black rounded-full group-hover:scale-110 transition-transform">
                G
              </div>
              <span>{loading ? 'Authenticating...' : 'Sign in as dk897869@gmail.com'}</span>
            </button>
          ) : (
            /* Official Google GSI Button Container */
            <div className="w-full flex flex-col items-center">
              <div id="googleSignInButton" className="w-full min-h-[46px]"></div>
              {loading && <p className="text-xs text-[#888] mt-3 animate-pulse">Authenticating with Google...</p>}
            </div>
          )}
        </div>

        {/* Info Text */}
        <div className="mt-8 text-center border-t border-white/5 pt-6 text-[10px] text-[#555] leading-relaxed">
          🔒 Secure login handles multi-factor identity authorization. Only 1 administrator account exists with write permissions.
        </div>
      </div>

      {/* Developer Simulation Mode toggle footer */}
      <div className="mt-8 z-10 bg-[#0a0a0a] border border-white/5 rounded-xl px-4 py-2.5 flex items-center space-x-3 text-xs">
        <div className="text-purple-400">
          <Sparkles size={14} />
        </div>
        <span className="text-[#888] font-medium">Developer Auth Simulation:</span>
        <button 
          onClick={() => {
            setIsSimulation(!isSimulation);
            setError('');
          }}
          className="text-white hover:opacity-85 focus:outline-none transition-opacity"
          title="Toggle Simulation vs Real Google Sign-in"
        >
          {isSimulation ? (
            <ToggleRight size={28} className="text-[#4f46e5]" />
          ) : (
            <ToggleLeft size={28} className="text-[#555]" />
          )}
        </button>
      </div>

    </div>
  );
};

export default AdminLogin;
