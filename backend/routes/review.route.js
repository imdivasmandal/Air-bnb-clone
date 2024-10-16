import express from "express"
import {
    createReview,
    deleteReview,
} from "../contollers/review.controller.js"
import { isAuthenticated } from "../middlewares/auth.js";
import { isReviewAuthor } from "../middlewares/auth.js";

const router = express.Router();

router.post("/:id", isAuthenticated, createReview);
router.delete("/:id/:reviewId",isAuthenticated,isReviewAuthor, deleteReview);

export default router  