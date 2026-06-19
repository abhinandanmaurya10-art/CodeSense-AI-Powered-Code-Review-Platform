const jwt = require("jsonwebtoken");

module.exports = function auth(req, res, next) {
  try {
    const authorization = req.header("Authorization");

    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authentication token is required" });
    }

    const token = authorization.slice(7).trim();

    if (!token) {
      return res.status(401).json({ message: "Authentication token is required" });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    if (!payload.userId) {
      return res.status(401).json({ message: "Invalid authentication token" });
    }

    req.userId = payload.userId;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired authentication token" });
  }
};
