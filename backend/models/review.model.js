import mongoose, { Schema } from "mongoose";
import { User } from "./user.model.js";

    const reviewSchema = new Schema({
        comment: {
            type: String,
        },
        rating: {
            type: Number,
            min: 1,
            max: 5,
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { 
        timestamps: true 
    } 
);

export const Review = mongoose.model("Review", reviewSchema);