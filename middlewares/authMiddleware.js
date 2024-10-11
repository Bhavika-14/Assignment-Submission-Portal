const jwt = require('jsonwebtoken');

// Token verification for all authenticated users (users & admins)
exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid token' });
  }
};

// Restrict access to admins only
exports.isAdmin = (req, res, next) => {
  if (req.user.Role !== 'Admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};
