import { Router } from "express";
const router = Router();

import { logout, profile } from "../controller/userController.js";
import isLoggedIn from "../middleware/authMiddleware.js";

// USER PROFILE
router.get("/profile", isLoggedIn, profile);

// LOGOUT
router.get("/logout", logout);

export default router;
