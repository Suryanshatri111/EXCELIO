import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteCurrentUser,
  oauthLoginUser,
} from "../Controllers/usersControllers.js";
import { isAuthenticated } from "../Middlewares/authMiddleware.js";

const router = Router();

//Auth
router.route("/").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.post("/oauth-login", oauthLoginUser);
//Profile
router
  .route("/profile")
  .get(isAuthenticated, getCurrentUserProfile)
  .put(isAuthenticated, updateCurrentUserProfile)
  .delete(isAuthenticated, deleteCurrentUser);

export default router;
