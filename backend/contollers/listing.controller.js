import { Listing } from "../models/listing.model.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { asyncHandler } from "../utils/asyncHandler.js";


//Show All Listings
const allListings = asyncHandler(async (req, res, next) => {
    const data = await Listing.find();
    return res
    .status(200)
    .json(new ApiResponse(
        200,
        data,
        "Listings fetched successfully"
    ))
});

//Edit Listing
const editListings = asyncHandler(async (req, res, next) => {
    const {id} = req.params;
    const data = await Listing.findById(id);
    if(!data){
        return next(new ApiError(400, "Listing not found"));
    }
    return res
    .status(200)
    .json(new ApiResponse(
        200,
        data,
        "Listings fetched successfully"
    ))
});

//create New Listing
const createListing = asyncHandler(async(req, res, next) => {
    const { title, description, price, location, country, longitude, latitude } = req.body;

    if(
        [title, description, location, country].some((data) => data?.trim() === "") || 
        !price || !longitude || !latitude
    ) {
        return next(new ApiError(400, "All fields are required"));
    }

    const localFilePath = req.file?.path;

    console.log("local file path",localFilePath)

    if(!localFilePath){
        return next(new ApiError(400, "Image is required"))
    }

    const listingImage = await uploadOnCloudinary(localFilePath);

    if(!listingImage){
        return next( new ApiError(400, "upload image failed"))
    }

     // Geocode the location to get the latitude and longitude


    // let coordinates;
    // try {
    //     const geocodeResponse = await axios.get(
    //         `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json`,
    //         {
    //             params: {
    //                 access_token: MAPBOX_API_TOKEN,
    //                 limit: 1,
    //                 country: country,
    //             },
    //         }
    //     );

    //     const features = geocodeResponse.data.features;

    //     if (features.length === 0) {
    //         return next(new ApiError(400, "Invalid location provided"));
    //     }

    //     // Extract longitude and latitude from the response
    //     coordinates = features[0].geometry.coordinates; // [longitude, latitude]
    // } catch (error) {

    //     console.error("Geocoding failed:", error.response?.data || error.message);
    //     return next(new ApiError(500, "Geocoding failed"));
    // }

    const url = listingImage.url
    const filename =  listingImage.original_filename

    const newListing = new Listing({
            title,
            description,
            price,
            location,
            country,
            geometry: {
                type: "Point",
                coordinates: [longitude, latitude], // Store the coordinates
            },
        });

    newListing.owner = req.user._id;
    newListing.image = {url, filename};
    // newListing.geometry = response.body.features[0].geometry;

    const listing = await newListing.save();

    return res.status(200).json(
        new ApiResponse(200, listing, "Listing created sucessfully")
    )
});

//Update Listing
const updateListing = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { title, description, price, location, country, longitude, latitude } = req.body;

    if (
        [title, description, location, country].some((data) => !data || data.trim() === "") ||
        !price || !longitude || !latitude
    ) {
        return next(new ApiError(400, "All fields are required"));
    }

    let listing = await Listing.findById(id);
    if (!listing) {
        return next(new ApiError(404, "Listing not found"));
    }

    listing.title = title;
    listing.description = description;
    listing.price = price;
    listing.location = location;
    listing.country = country;
    listing.geometry = {
        type: 'Point',
        coordinates: [longitude, latitude], 
    };

    if (req.file) {
        const localFilePath = req.file.path;
        const uploadedImage = await uploadOnCloudinary(localFilePath);
        if (!uploadedImage) {
            return next(new ApiError(400, "Image upload failed"));
        }

        const { url, original_filename: filename } = uploadedImage;
        listing.image = { url, filename };
    }

    await listing.save();

    return res.status(200).json(
        new ApiResponse(200, listing, "Listing updated successfully")
    );
});

//Delete Listing
const deleteListing = asyncHandler(async(req, res) => {
    let {id} = req.params;

    let deletedListing = await Listing.findByIdAndDelete(id);
    
    console.log(deletedListing);
    return res.status(200)
    .json(
        new ApiResponse(200, {}, "Listing deleted sucessfully")
    )
})

//showOneListing
const showListing = asyncHandler(async(req, res, next) => {
    const {id} = req.params;
    const listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: {
                path: "author",
            },
        })
        .populate("owner");

    if(!listing){
        return next(new ApiError(400, "Listing not found"))
    }

    return res.status(200).json(
        new ApiResponse(200, listing, "Listing fetched sucessfully")
    )
})

export {
    allListings,
    editListings,
    createListing,
    deleteListing,
    showListing,
    updateListing,
}