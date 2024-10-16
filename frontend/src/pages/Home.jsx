import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";

function Home() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const { data } = await axios.get("http://localhost:8000/api/v1/listings", {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        });
        setListings(data.data);
      } catch (error) {
        toast.error("Listing fetching failed!")
        console.log("Listings fetching failed!", error);
      }
    };
    fetchListings();
  }, []);


  return (
    <div className='mt-28'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-7 p-8'>
        {listings.map((listing) => (
          <Link to={`/listing/${listing._id}`} key={listing._id}>
            <div className='m-1 h-full max-w-sm rounded-xl overflow-hidden'>
              <div className='w-full'>
                {listing.image && listing.image.url ? (
                  <img
                    className='rounded-xl h-64 w-full object-cover hover:opacity-70'
                    src={listing.image.url}
                    alt={listing.title}
                  />
                ) : (
                  <div className='w-full h-64 flex items-center justify-center text-gray-500'>
                    Image Unavailable
                  </div>
                )}
              </div>
              <div className='p-4'>
                <div className='font-semibold'>{listing.title}</div>
                <div className='font-medium italic text-gray-600'>
                  Hosted By {listing?.owner?.username || 'Unknown'}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
  
}

export default Home;

