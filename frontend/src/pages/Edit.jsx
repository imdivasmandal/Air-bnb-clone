import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Input from '../components/Input.jsx';
import Button from '../components/Button.jsx';
import { toast } from "react-toastify";

import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = 'pk.eyJ1IjoiZ3lhbnNpbmdoNjg0MCIsImEiOiJjbHR1YmdqeTgxOGRxMmp1bHQ0enB2dGx0In0.ySoVSlDDJUBLgr6uwFC_Fw';

const EditListing = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchListing = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8000/api/v1/listings/${id}`);

        setValue('title', data.data.title);
        setValue('description', data.data.description);
        setValue('price', data.data.price);
        setValue('location', data.data.location);
        setValue('country', data.data.country);
        
        if (data.data.image && data.data.image.url) {
          setImagePreview(data.data.image.url);
        }
      } catch (err) {
        setError("Error loading listing data");
      }
    };

    fetchListing();
  }, [id, setValue]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file)); 
    }
  };


  const geocodeLocation = async (location) => {
    try {
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json`,
        {
          params: {
            access_token: mapboxgl.accessToken,
          },
        }
      );

      const data = response.data;
      if (data.features && data.features.length > 0) {
        const [longitude, latitude] = data.features[0].geometry.coordinates;
        return { latitude, longitude };
      } else {
        throw new Error("No results found");
      }
    } catch (error) {
      console.error("Geocoding failed:", error);
      throw new Error("Geocoding failed");
    }
  };


  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);

    try {

      const { latitude, longitude } = await geocodeLocation(data.location);
      
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('price', data.price);
      formData.append('location', data.location);
      formData.append('country', data.country);
      formData.append('longitude', longitude);
      formData.append('latitude', latitude);
      
      if (data.image[0]) {
        formData.append('image', data.image[0]);
      }

      const res = await axios.put(`http://localhost:8000/api/v1/listings/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
      if(res){
        toast.success("Listing updated successfully");
        navigate(`/listing/${id}`);
      }
    } catch (err) {
      toast.error(error.response.data.message || "Something went wrong");
      setError("Failed to update listing");
    }
    setLoading(false);
  };

  return (
    <div className='mt-28 mx-10 md:mx-32 xl:mx-60 mb-4'>
      <h2 className='font-bold text-xl my-3 mx-1'>Edit Listing</h2>

      {error && <div className='text-red-500'>{error}</div>}

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
        <Input
          label='Title'
          name='title'
          {...register('title', { required: 'Title is required' })}
          error={errors.title?.message}
        />

        <Input
          label='Description'
          name='description'
          {...register('description', { required: 'Description is required' })}
          error={errors.description?.message}
        />

        <Input
          label='Price'
          name='price'
          type='number'
          {...register('price', { required: 'Price is required', valueAsNumber: true })}
          error={errors.price?.message}
        />

        <Input
          label='Location'
          name='location'
          {...register('location', { required: 'Location is required' })}
          error={errors.location?.message}
        />

        <Input
          label='Country'
          name='country'
          {...register('country', { required: 'Country is required' })}
          error={errors.country?.message}
        />
        
        <div>
          <label htmlFor='image' className='block text-sm font-medium text-gray-700'>
            Image
          </label>
          <input
            type='file'
            name='image'
            {...register('image')}
            onChange={handleImageChange}
            className='mt-1'
          />
          {imagePreview && (
            <div className='mt-3'>
              <img
                src={imagePreview}
                alt='Listing Preview'
                className='w-32 h-32 object-cover border rounded-md'
              />
            </div>
          )}
        </div>

        <Button type='submit' className={`bg-green-700 text-white h-9 w-36 rounded-full ${loading && 'opacity-50 cursor-not-allowed'}`}>
          {loading ? 'Updating...' : 'Update Listing'}
        </Button>
      </form>
    </div>
  );
};

export default EditListing;



