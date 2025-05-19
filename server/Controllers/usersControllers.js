import User from "../Models/usermodel.js";
import asyncHandler from "../Utils/asyncHandler.js";
import admin from "../libs/firebaseAdmin.js";
// ✅ user register controller
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      message: "User already exists",
    });
  }
  const user = new User({
    username,
    email,
    password,
  });

  try {
    await user.save();
    const token = user.generateToken(user._id);
    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
    });
    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error registering user",
    });
    console.error("Registration Error:", error);
  }
});

// 👤 user login controller
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { rememberMe } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }
  const user = await User.findOne({ email });

  if (user) {
    const ispasswordMatch = await user.isPasswordCorrect(password);
    if (ispasswordMatch) {
      const token = user.generateToken(user._id);
      res.cookie("jwt", token, {
        maxAge: rememberMe ? 7 * 24 * 60 * 60 * 1000 : undefined,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development",
      });
      res.status(200).json({
        message: "User logged in successfully",
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      });
    } else {
      return res.status(401).json({
        message: "user Credentials are not correct",
      });
    }
  } else {
    return res.status(401).json({
      message: "user not found",
    });
  }
});

// ❌ user logout controller
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    maxAge: 0,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });
  res.status(200).json({
    message: "User logged out successfully",
  });
});

// 🧔🏻 get  Current  controller
const getCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }
  res.status(200).json({
    message: "User profile fetched successfully",
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
    },
  });
});

// 🧑🏻‍🏫 update Current  controller
const updateCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }
  user.username = req.body.username || user.username;
  user.email = req.body.email || user.email;
  if (req.body.password) {
    user.password = req.body.password;
  }
  const updatedUser = await user.save();
  res.status(200).json({
    message: "User updated successfully",
    user: {
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
    },
  });
});

// 🚮 delete Current controller
const deleteCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  await user.deleteOne();
  res.status(200).json({
    message: `${user.username} deleted successfully`,
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
    },
  });
});

// Oauth login

const oauthLoginUser = asyncHandler(async (req, res) => {
  const { firebaseIdToken } = req.body;

  if (!firebaseIdToken) {
    return res.status(400).json({ message: "Firebase ID token is missing" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(firebaseIdToken);
    const { email, name, uid } = decodedToken;

    if (!email) {
      return res.status(400).json({ message: "Email not found in token" });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        username: name || email.split("@")[0],
        email,
        password: uid, // Replace this logic with secure handling
      });
    }

    const token = user.generateToken(user._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Logged in with Google",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("🔥 Google Login Error:", error);
    res
      .status(500)
      .json({ message: "Google login failed", error: error.message });
  }
});

export {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteCurrentUser,
  oauthLoginUser,
};
