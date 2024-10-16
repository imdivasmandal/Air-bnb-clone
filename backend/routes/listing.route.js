import express from "express"
import {
    allListings,
    editListings,
    createListing,
    deleteListing,
    showListing,
    updateListing,
} from "../contollers/listing.controller.js"
import { isAuthenticated } from "../middlewares/auth.js";
import { isListingOwner } from "../middlewares/auth.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();


router.get("/", allListings);
router.post("/new",isAuthenticated,upload.single('avatar'), createListing)
router.get("/:id", showListing);
router.delete("/:id", isAuthenticated, isListingOwner, deleteListing);
router.put('/:id',isAuthenticated,isListingOwner, upload.single('image'), updateListing);
router.get("/:id/edit", isAuthenticated, isListingOwner, editListings);

export default router  