import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        validate: validator.isEmail,
        required: true,
        unique:true,
        trim: true,
    },
    password: {
        type: String,
        select: false,
    },
    bio: {
        type: String,
    },
    dob: {
        type: Date,
    },
    phone: {
        type: Number,
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Others"],
    },
    address: {
        type: String,
    }
});


userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
      { 
        id: this._id,
        email: this.email 
      }, 
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: process.env.JWT_EXPIRY,
      }
    )
};

export const User = mongoose.model("User", userSchema);