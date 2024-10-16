import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { generateToken } from "../utils/jwtToken.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js"


//getCurrentUser
const getCurrentUser = asyncHandler(async(req, res) => {
    return res
    .status(200)
    .json(new ApiResponse(
        200,
        req.user,
        "User fetched successfully"
    ))
})

//Signup
const registerUser = asyncHandler(async(req, res, next) => {
    const { username, email, password, bio, dob, phone, gender, address } = req.body;

    if([username, email, password, gender].some((data) => data?.trim() === "") || !phone){
        return next(new ApiError(400, "please fill full form"))
    }
    const existUser = await User.findOne({email});
    if (existUser) {
        throw new ApiError(409, "User with email or username already exists")
    }

    const user = await User.create({
        username,
        email,
        password,
        bio,
        dob,
        phone,
        address,
        gender
    });

    if(!user){
        return next( new ApiError(400, "something went wrong while creating user"));
    }

    generateToken(user, "User Registered Successfully!", 201, res)
})

//login
const login = asyncHandler(async (req, res, next) => {

    const { email, password, confirmPassword } = req.body;

    if (!email || !password || !confirmPassword){
      return next(new ApiError(400, "Please fill full form"));
    }

    if (password !== confirmPassword) {
      return next(
        new ApiError(400, "Password and confirm password did't match")
      );
    }

    let user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ApiError(400, "No account found with this email!"));
    }
  
    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      return next(new ApiError(401, "Invalid user credentials"));
    }

    generateToken(user, "User Logged in Sucessfully", 200, res);

});

//logout
const logoutUser = asyncHandler(async (req, res, next) => {
    return res
    .status(201)
    .clearCookie("accessToken", "", {
    httpOnly: true,
    secure: true,
    // expires: new Date(Date.now()),
    })
    .json({
    success: true,
    message: "Logged Out Successfully.",
    });
});


export {
    getCurrentUser,
    registerUser,
    logoutUser,
    login,
}
