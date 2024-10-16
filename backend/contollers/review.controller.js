import { Listing } from "../models/listing.model.js"
import { Review } from "../models/review.model.js"
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js"

// Create Review 
const createReview = asyncHandler(async(req, res, next) => {
    let listing = await Listing.findById(req.params.id);
    const { comment, rating } = req.body;

    if(!comment || !rating){
        return next( new ApiError(400, "Please fill full form"))
    }

    let newReview = new Review({comment, rating});
    newReview.author = req.user._id;

    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();

    return res.status(200).json(
        new ApiResponse(200, newReview, "New review created")
    )
})

// Delete Review
const deleteReview = asyncHandler(async(req, res, next) => {
    const {id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId }});
    await Review.findByIdAndDelete(reviewId);
    
    return res.status(200).json(
        new ApiResponse(200, {}, "Review Deleted Sucessfully")
    )
});

export {
    createReview,
    deleteReview,
}



