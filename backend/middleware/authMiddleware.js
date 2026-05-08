import jwt from "jsonwebtoken";

const protect = async (req, res, next) => {
  try {

    // Step 1: Get token from headers
    let token = req.headers.authorization;

    // Step 2: Check if token exists and starts with "Bearer"
    if (!token || !token.startsWith("Bearer")) {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }

    // Step 3: Remove "Bearer" from token
    token = token.split(" ")[1];

    // Step 4: Verify token
    const decoded = jwt.verify(token, "secretkey");

    // Step 5: Attach user to request object
    req.user = decoded;

    // Step 6: Call next middleware
    next();
    
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

export default protect;