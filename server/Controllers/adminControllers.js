import User from "../Models/usermodel.js";
import ExcelFile from "../Models/excelModel.js";
import asyncHandler from "../Utils/asyncHandler.js";

//⬇️ Fetch add users
const fetchAllUser = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");
  if (!users) return res.status(404).json({ error: "Error fetch user" });
  res.status(200).json(users);
});

//⬇️ Modify user details by admin
const modifyUserDetailsbyadmin = asyncHandler(async (req, res) => {
  const { username, email } = req.body;
  const user = await User.findById(req.params.id);

  if (!user) throw new Error("User not found");

  user.username = username || user.username;
  user.email = email || user.email;

  const updatedUser = await user.save();
  res.status(200).json({ message: "User updated", updatedUser });
});

//⬇️ remove any user
const removeAnyUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) throw new Error("user not found");
  await ExcelFile.deleteMany({ user: user._id });
  await user.deleteOne();
  res.status(200).json({
    message: `${user.username || user.email} and associated data removed`,
  });
});

//⬇️ Modify user role
const modifyUserRole = asyncHandler(async (req, res) => {
  const { role } = req.body;

  const user = await User.findById(req.params.id);
  if (!user) throw new Error("user not found");

  if (!["user", "admin"].includes(role)) throw new Error("Invaild role");

  user.role = role;
  await user.save();

  res
    .status(200)
    .json({ message: `Role updated to ${role} of ${user.username}` });
});

//⬇️ Fetch All Excel Files
const fetchAllExcelFiles = asyncHandler(async (req, res) => {
  const files = await ExcelFile.find().populate("user", "username email");

  res.status(200).json(files);
});

//⬇️
const removeAnyUserExcelFile = asyncHandler(async (req, res) => {
  const file = await ExcelFile.findById(req.params.id);
  if (!file) throw new Error("file not found");

  await file.deleteOne();

  res.status(200).json({ message: "Excel file deleted" });
});

//⬇️
const modifyAnyUserChartConfig = asyncHandler(async (req, res) => {
  const { chartConfig } = req.body;

  const file = await ExcelFile.findById(req.params.id);
  if (!file) throw new Error("file not found");

  file.chartConfig = chartConfig;
  await file.save();

  res.status(200).json({ message: "Chart config updated", file });
});

//⬇️
const viewAnalytics = asyncHandler(async (req, res) => {
  const usersCount = await User.countDocuments();
  const filesCount = await ExcelFile.countDocuments();

  res.status(200).json({
    usersCount,
    filesCount,
  });
});

//⬇️
const monitaUseractivity = asyncHandler(async (req, res) => {
  const users = await User.find()
    .select("username email createdAt updatedAt")
    .sort({ updatedAt: -1 });

  res.status(200).json({
    message: "User activity data",
    users,
  });
});

export {
  fetchAllUser,
  modifyUserDetailsbyadmin,
  removeAnyUser,
  modifyUserRole,
  fetchAllExcelFiles,
  removeAnyUserExcelFile,
  modifyAnyUserChartConfig,
  viewAnalytics,
  monitaUseractivity,
};
