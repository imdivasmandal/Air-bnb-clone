import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js";
import { Listing } from "../models/listing.model.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import { Review } from "../models/review.model.js";
import jwt from "jsonwebtoken";

//isLogedin
const isAuthenticated = asyncHandler(async (req, res, next) => {
    console.log("authentication is in process")
    try {
        const token = req.cookies?.accessToken;
        
        if(!token) {
            return next( new ApiError(401, "Unauthorized request"))
        }

        const decodeToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const user = await User.findById(decodeToken?.id).select("-password");

        if(!user) {
            return next( new ApiError(401, "Invalid Access Token"))
        }

        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }   
});

//isListingOwner
const isListingOwner = async(req, res, next) => {
    console.log("listing owner is in process")
    const { id } = req.params;
    
    const listing = await Listing.findById(id);

    if (!listing) {
        return next(new ApiError(404, "Listing not found"));
    }

    console.log("Listing without populate:", listing);

    if (String(listing.owner._id) !== String(req.user._id)) {
        return next(new ApiError(401, "You don't have permission to update this listing"));
    }
    
    next();
}

//isReviewAuthor
const isReviewAuthor = async(req, res, next) => {
    const { reviewId } = req.params;
    const review = await Review.findById(reviewId);
    console.log("author in authjs",review.author);
    if(String(review.author._id) !== String(req.user._id)){
        return next( new ApiError(401, "You Don't have permission to delete this review"))
    }
    next();
}

export {
    isReviewAuthor,
    isAuthenticated,
    isListingOwner,
}