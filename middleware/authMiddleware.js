const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to protect routes (Authentication)
exports.protect = async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;

  // 1. Check for Bearer token existence and format
  if (authHeader && authHeader.toLowerCase().startsWith("bearer")) {
    // 2. Safely extract the token by skipping the first 7 characters ("Bearer ")
    // and trimming any extra whitespace.
    // This is more robust than split(" ").
    token = authHeader.substring(7).trim();
  }

  // Handle case where token is missing (before verification)
  if (!token) {
    // This handles the persistent "Not authorized, token missing" error
    return res.status(401).json({ error: "Unauthorized: Token missing or malformed" });
  }

  try {
    // 3. Verify token signature and expiration
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Find user by decoded ID
    // Note: We use the ID from the token payload (decoded.id)
    const user = await User.findById(decoded.id).select("-password");
    
    // Check if user still exists
    if (!user) {
      // Token was valid but user no longer exists in DB (e.g., account deleted)
      return res.status(401).json({ error: "Unauthorized: User associated with token not found" });
    }

    // 5. Attach user to request and proceed
    req.user = user;
    next();
  } catch (err) {
    // This handles signature verification failures and expiration errors
    console.error("Auth error:", err.message);
    
    // Provide a generic, secure error message for the client
    return res.status(401).json({ error: "Unauthorized: Token invalid, expired, or signature failed" });
  }

  // Inside exports.protect in authMiddleware.js:
// ... (Your token extraction code) ...
if (!token) {
    // This is the error you are getting. If you see this, the extraction failed.
    return res.status(401).json({ error: "Unauthorized: Token missing or malformed" });
}

console.log("Token received by server:", token.substring(0, 15) + "..."); // Log a snippet
// ... (jwt.verify(token, process.env.JWT_SECRET) follows) ...
};

// Middleware for role-based authorization (runs after protect)
exports.authorize = (...roles) => {
  return (req, res, next) => {
    // Ensure req.user was set by the protect middleware and check the role
    if (!req.user || !roles.includes(req.user.role)) {
      // Use 403 Forbidden because authentication succeeded, but permission failed
      return res.status(403).json({ error: "Forbidden: Insufficient permissions for this action" });
    }
    next();
  };
};