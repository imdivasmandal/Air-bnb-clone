import Input from '../components/Input.jsx'
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import mapboxgl from 'mapbox-gl'; 
import { useNavigate } from 'react-router-dom'; 
import { toast } from "react-toastify";

const NewListing = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const geocodeLocation = async (location) => {
        try {
            const response = await axios.get(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=${mapboxgl.accessToken}`
            );
            const data = response.data;
            if (data.features && data.features.length > 0) {
                const [longitude, latitude] = data.features[0].geometry.coordinates;
                return { latitude, longitude };
            }
            throw new Error("No results found");
        } catch (error) {
            console.error("Geocoding failed:", error);
            return { latitude: null, longitude: null };
        }
    };

    const registerUser = async (data) => {
        setIsSubmitting(true);
        const { latitude, longitude } = await geocodeLocation(data.location);

        if (!latitude || !longitude) {
            setError("Unable to determine location. Please try again.");
            setIsSubmitting(false);
            return;
        }

        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("price", data.price);
        formData.append("location", data.location);
        formData.append("country", data.country);
        formData.append("avatar", data.avatar[0]);
        formData.append("latitude", latitude);
        formData.append("longitude", longitude);

        try {
            const res = await axios.post(
                "http://localhost:8000/api/v1/listings/new",
                formData,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log(res.data);
            toast.success("Listing created successfully")
            navigate("/"); 
            reset(); 
        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong");
            setError("Failed to submit the listing. Please try again.");
            console.log(error.response);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-gray-100 p-8 justify-center w-full md:px-40 sm:px-6">
            <form onSubmit={handleSubmit(registerUser)} className="space-y-5">
                {error && <p className="text-red-600">{error}</p>}
                <div className="space-y-3">
                    <Input
                        label="Title :"
                        placeholder="Enter title"
                        type="text"
                        {...register("title", { required: "Title is required" })}
                    />
                    {errors.title && <p className="text-red-600">{errors.title.message}</p>}

                    <Input
                        label="Description :"
                        placeholder="Enter description"
                        type="text"
                        {...register("description", { required: "Description is required" })}
                    />
                    {errors.description && <p className="text-red-600">{errors.description.message}</p>}

                    <Input
                        label="Image :"
                        placeholder="Select image"
                        type="file"
                        {...register("avatar", { required: "Image is required" })}
                    />
                    {errors.avatar && <p className="text-red-600">{errors.avatar.message}</p>}

                    <Input
                        label="City :"
                        placeholder="Enter city name"
                        type="text"
                        {...register("location", { required: "Location is required" })}
                    />
                    {errors.location && <p className="text-red-600">{errors.location.message}</p>}

                    <Input
                        label="Country :"
                        placeholder="Enter country name"
                        type="text"
                        {...register("country", { required: "Country is required" })}
                    />
                    {errors.country && <p className="text-red-600">{errors.country.message}</p>}

                    <Input
                        label="Price :"
                        placeholder="Enter price"
                        type="number"
                        {...register("price", { required: "Price is required" })}
                    />
                    {errors.price && <p className="text-red-600">{errors.price.message}</p>}
                </div>

                <button
                    type="submit"
                    className={`bg-green-700 text-white h-9 w-36 rounded-full ${isSubmitting && 'opacity-50 cursor-not-allowed'}`}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default NewListing;
