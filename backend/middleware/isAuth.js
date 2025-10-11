import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
  try {
    // Get token from cookies, Authorization header, query string, or body
    const token =
      req.cookies?.token ||
      req.header("Authorization")?.replace("Bearer ", "") ||
      req.query?.token ||
      req.body?.token;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    // Attach userId to request
    req.userId = decoded.userId;

    // Continue to next middleware or route
    next();

  } catch (error) {
    console.error("isAuth error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default isAuth;
