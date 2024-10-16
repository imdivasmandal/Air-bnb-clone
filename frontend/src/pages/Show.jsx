import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useState,useEffect, useRef } from 'react';
import axios from 'axios'
import Button from "../components/Button.jsx"
import Input from '../components/Input.jsx';
import {useSelector} from 'react-redux'
import {useForm} from "react-hook-form"
import Map from '../components/Map.jsx';
import StarRating from '../components/StarRating.jsx';
import { toast } from "react-toastify";


function Show() {
  const {id} = useParams();
  const currUser = useSelector((state) => state.auth.userData);

  const [listing, setListing] = useState([""]);
  const [reviews, setReviews] = useState([""]);
  const {register, handleSubmit, reset } = useForm()

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);  // Scroll to the top when the component mounts
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data }  = await axios.get(
          `http://localhost:8000/api/v1/listings/${id}`,
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
        setListing(data.data);
        setReviews(data.data.reviews);
      } catch (error) {
        console.log("listings fetching failed", error);
      }
    }
    fetchUser();
  },[ ]);


  const deleteListing = async() => {
    try {
       await axios.delete(
        `http://localhost:8000/api/v1/listings/${id}`,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      )
      .then(() => {
        toast.success("Listing deleted successfully")
        navigate("/")
      })
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
      console.log("listings fetching failed", error);
    }
  }

  const createReview = async (data) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/reviews/${id}`,
        { comment: data.comment, rating: data.rating },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success("Review created successfully!");

      setReviews((prevReviews) => [...prevReviews, response.data.data]);
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
      setError(error.message);
    }
    reset();
  };  

  const handleDeleteReview = async (reviewId) => {
    try {

      await axios.delete(`http://localhost:8000/api/v1/reviews/${listing._id}/${reviewId}`, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      toast.success("Review deleted successfully!");
      setReviews((prevReviews) => prevReviews.filter(review => review._id !== reviewId));
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
      console.error("Failed to delete review", error);
    }
  };


  return (
    <div className='mt-28 mx-10 md:mx-32 xl:mx-60 mb-5'>
      <div className="text-xl font-bold text-gray-900 p-2">
          <p>{listing?.title}</p>
      </div>

      <div className='mb-4'>
        {listing.image && listing.image.url ? (
          <img
            className='rounded-xl h-60 sm:h-72 xl:h-80 w-full object-cover shadow-md'
            src={listing.image.url}
            alt={listing.title}
          />
        ) : (
          <div className='flex items-center justify-center h-60 sm:h-72 xl:h-80 rounded-xl border border-gray-300 bg-gray-200 text-gray-500'>
            Image Unavailable
          </div>
        )}
      </div>

      <div className="bg-gray-50 mb-4 p-6 rounded-lg space-y-4">
        <div className="text-xl font-bold text-gray-900">
          <p>Owned by <span className="text-blue-600">{listing.owner?.username}</span></p>
        </div>

        <div>
          <p className="text-gray-700 leading-relaxed">{listing.description}</p>
        </div>

        <div className="text-lg font-semibold text-gray-800">
          <p className="text-green-600">&#8377; {listing?.price?.toLocaleString()}</p>
        </div>

        <div className="text-gray-600">
          <p className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16.88 3.549a5.5 5.5 0 11-7.76 0M12 21v-6m0-4a4 4 0 100-8 4 4 0 000 8z" />
            </svg>
            {listing.location}
            , {listing.country}
          </p>
        </div>
      </div>

      {(String(currUser?._id) == String(listing.owner?._id)) && (
        <div className='flex justify-between'>
          <div><Button onClick={() => {navigate(`/listing/edit/${id}`)}} className='w-20' bgColor={"bg-gray-700"}>Edit</Button></div>
          <div onClick={deleteListing}><Button bgColor={'bg-red-500'}>Delete</Button></div>
        </div>
      )}

      {/* review writing part */}
      <div className="mt-10">
            <h3 className="text-xl font-semibold mb-6 text-gray-800">Write a Review</h3>
            <form onSubmit={handleSubmit(createReview)} className="space-y-6">

                <div>
                  <label className="block font-medium text-gray-700 mb-2">Your Rating:</label>
                    <div className="rating flex gap-2">
                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-black" value={1} {...register("rating", {required: true})} />
                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-black" defaultChecked value={2} {...register("rating", {required: true})}/>
                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-black" value={3} {...register("rating", {required: true})}/>
                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-black" value={4} {...register("rating", {required: true})}/>
                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-black" value={5} {...register("rating", {required: true})}/>
                    </div>
                </div>

                <div>
                  <Input
                    label="Comment:"
                    type="textarea"
                    className="border border-gray-300 rounded-lg p-3 w-full text-gray-700"
                    placeholder="Write your comment here..."
                    {...register("comment", {
                      required: true,
                    })}
                  />
                </div>

                <Button
                type="submit"
                className="w-full bg-green-700"
                >Submit</Button>
            </form>
      </div>

      {/* All Reviews */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-7'>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review._id} className='bg-white shadow-lg rounded-lg p-5 border border-gray-200'>
              <div className='flex items-center mb-4'>
                <div className='w-12 h-12 rounded-full bg-gray-200 mr-4 flex items-center justify-center'>
                  <span className='text-gray-700 font-semibold text-xl'>
                    {review?.author?.username && review?.author?.username?.[0]?.toUpperCase()}
                  </span>
                </div>
                <div className='flex-1'>
                  <div className='font-semibold text-lg text-gray-800'>{review?.author?.username}</div>
                  <StarRating rating={review.rating} />
                </div>
              </div>

              <div className='text-gray-600 italic'>{review.comment}</div>

              {/* <div className='mt-3 text-sm text-gray-500'>
                {new Date(review.createdAt)?.toLocaleDateString()}
                <span><button>Delete</button></span>
              </div> */}

              <div className='mt-3 text-sm text-gray-500 flex justify-between items-center'>
                <span>{new Date(review.createdAt)?.toLocaleDateString()}</span>
                
                <button
                  className="bg-black text-white text-xs py-1 px-3 rounded-md hover:bg-red-600 transition duration-300"
                  onClick={() => handleDeleteReview(review._id)} // Assuming you have a delete handler function
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className='text-center text-gray-500'>No reviews available</div>
        )}
      </div>

      {/* map box */}
      <div className="listing-details mt-10">
        <h2 className="text-2xl font-bold mb-3 text-gray-800">Location</h2>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-3">
            <p className="text-gray-600">See the exact location of the listing on the map below.</p>
          </div>
          
          <div className="h-72">
            <Map latitude={28.6139} longitude={77.2088} />
          </div>
        </div>
      </div>

  </div>
)}

export default Show