import React, { useState } from 'react';
import Input from '../components/Input.jsx';
import Select from '../components/Select.jsx';
import { useForm } from "react-hook-form";
import axios from "axios";
import { login } from "../store/auth-slice/index.js";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const registerUser = async (data) => {
    setError("");
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/signup",
        {
          username: data.username,
          email: data.email,
          password: data.password,
          dob: data.DOB,
          phone: data.phone,
          gender: data.gender,
          bio: data.bio,
          address: data.address
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response) {
        toast.success("Signup successfully!");
        dispatch(login({ userData: response.data.user }));
        navigate("/"); 
      }
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
      setError(error.response?.data?.message || "Something went wrong. Please try again.");
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='bg-gray-100 p-14 justify-center w-full mt-16 md:px-52'>
      {error && <p className="text-red-600 text-center">{error}</p>}

      <form onSubmit={handleSubmit(registerUser)} className='md:px-6 md:py-8 md:rounded-lg md:shadow-md md:shadow-gray-300'>
        <div className='space-y-5'>

          <Input
            label="Name :"
            placeholder="Enter your name"
            type="text"
            {...register("username", {
              required: "Name is required",
            })}
          />
          {errors.username && <p className="text-red-600">{errors.username.message}</p>}

          <Input
            label="Bio :"
            placeholder="Enter bio"
            type="text"
            {...register("bio")}
          />

          <Input
            label="Email :"
            placeholder="Enter your email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                message: "Email address must be valid",
              }
            })}
          />
          {errors.email && <p className="text-red-600">{errors.email.message}</p>}

          <Select
            options={["Male", "Female", "Others"]}
            label="Select your gender :"
            {...register("gender", {
              required: "Gender is required",
            })}
          />
          {errors.gender && <p className="text-red-600">{errors.gender.message}</p>}

          <Input
            label="Date of birth :"
            placeholder="Enter your date of birth"
            type="date"
            {...register("DOB", {
              required: "Date of birth is required",
            })}
          />
          {errors.DOB && <p className="text-red-600">{errors.DOB.message}</p>}

          <Input
            label="Address :"
            placeholder="Enter address"
            type="text"
            {...register("address", {
              required: "Address is required",
            })}
          />
          {errors.address && <p className="text-red-600">{errors.address.message}</p>}

          <Input
            label="Phone No :"
            placeholder="Enter your phone number"
            type="text"
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Phone number must be 10 digits",
              }
            })}
          />
          {errors.phone && <p className="text-red-600">{errors.phone.message}</p>}

          <Input
            label="Password :"
            placeholder="Enter your password"
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              }
            })}
          />
          {errors.password && <p className="text-red-600">{errors.password.message}</p>}

          <button
            type="submit"
            className={`bg-green-600 text-white h-9 w-36 rounded-full ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
