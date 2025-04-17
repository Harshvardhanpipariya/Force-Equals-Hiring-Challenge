function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;
    console.log("Authorization Header:", authHeader); // Debugging line
  
    if (!authHeader || authHeader !== "Bearer fake-token-123") {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
  
    next();
  }
  
  module.exports = { verifyToken };
  