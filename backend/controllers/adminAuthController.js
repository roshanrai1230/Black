const crypto = require('crypto');

// In-memory session store
const activeSessions = new Set();

// @desc    Verify Google Sign-In and authorize admin
// @route   POST /api/admin/auth/google
// @access  Public
const googleLogin = async (req, res) => {
  try {
    const { credential, isSimulation } = req.body;
    const adminEmail = (process.env.ADMIN_EMAIL || 'dk897869@gmail.com').toLowerCase();

    let email, name, picture;

    if (isSimulation) {
      // Simulation mode for developer testing
      email = adminEmail;
      name = 'Admin User';
      picture = 'https://i.pravatar.cc/150?u=a042581f4e29026704d';
    } else {
      if (!credential) {
        return res.status(400).json({ success: false, message: 'Google Credential is required' });
      }

      // Verify Google Token via Google API
      const googleVerifyUrl = `https://oauth2.googleapis.com/tokeninfo?id_token=${credential}`;
      const response = await fetch(googleVerifyUrl);
      const data = await response.json();

      if (data.error_description || !data.email) {
        return res.status(400).json({ 
          success: false, 
          message: data.error_description || 'Invalid Google Token' 
        });
      }

      email = data.email.toLowerCase();
      name = data.name || 'Admin User';
      picture = data.picture || 'https://i.pravatar.cc/150?u=a042581f4e29026704d';

      // Validate token audience matches our client ID
      const expectedClientId = process.env.GOOGLE_CLIENT_ID;
      if (expectedClientId && data.aud !== expectedClientId) {
        return res.status(403).json({ 
          success: false, 
          message: 'Security validation failed: Google Token audience mismatch.' 
        });
      }
    }

    // Authorize only the single admin account
    if (email !== adminEmail) {
      return res.status(403).json({ 
        success: false, 
        message: 'Access Denied: You do not have permissions to access the Admin Panel.' 
      });
    }

    // Generate a secure session token
    const token = crypto.randomBytes(32).toString('hex');
    activeSessions.add(token);

    res.status(200).json({
      success: true,
      token,
      admin: {
        name,
        email,
        picture
      }
    });
  } catch (error) {
    console.error('Error during Google login:', error);
    res.status(500).json({ success: false, message: 'Authentication Server Error' });
  }
};

// @desc    Verify current admin session token
// @route   GET /api/admin/auth/verify
// @access  Public
const verifySession = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, isAuthenticated: false, message: 'No session token provided' });
    }

    const token = authHeader.split(' ')[1];
    const isValid = activeSessions.has(token);

    if (isValid) {
      return res.status(200).json({ success: true, isAuthenticated: true });
    } else {
      return res.status(401).json({ success: false, isAuthenticated: false, message: 'Invalid or expired session' });
    }
  } catch (error) {
    console.error('Error verifying session:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Logout admin / invalidate session token
// @route   POST /api/admin/auth/logout
// @access  Public
const logout = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      activeSessions.delete(token);
    }
    res.status(200).json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

module.exports = {
  googleLogin,
  verifySession,
  logout
};
