import express from "express"
import {
    getCurrentUser,
    registerUser,
    logoutUser,
    login,
} from "../contollers/user.controller.js"
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", login);
router.get("/logout", isAuthenticated, logoutUser);
router.get("/me", isAuthenticated, getCurrentUser);

export default router    