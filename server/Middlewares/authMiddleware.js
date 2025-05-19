import User from "../Models/usermodel.js";
import jwt from "jsonwebtoken";
import asyncHandler from "../Utils/asyncHandler.js";

// Auth middleware
const isAuthenticated = asyncHandler(async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    res.status(401).json({ message: "Please login to access this resource" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      res.status(401).json({ message: "User not found" });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token, please login again" });
  }
});

// Admin check
const isAdmin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "You are not authorized as admin" });
  }
});

export { isAuthenticated, isAdmin };
