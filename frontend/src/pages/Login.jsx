import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as authLogin } from '../store/auth-slice/index.js';
import Button from "../components/Button.jsx";
import Input from '../components/Input.jsx';
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import axios from 'axios';
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const login = async (data) => {
    console.log(data);
    setError("");
    setIsSubmitting(true); 

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/login",
        {
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response) {
        toast.success("Login successful!");
        dispatch(authLogin({ userData: response.data.user }));
        navigate("/"); 
      }
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
      setError(error.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const password = watch("password");

  return (
    <div className="mt-36 mb-3">
      <div className="p-7 py-14 mx-5 shadow-lg shadow-gray-400 my-20  rounded-lg bg-gray-100 md:w-1/2 content-center md:mx-80">
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have an account?&nbsp;
          <Link
            to="/register"
            className="font-medium text-green-600 transition-all duration-200 hover:underline"
          >
            Register
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Email address must be valid",
                },
              })}
            />
            {errors.email && <p className="text-red-600">{errors.email.message}</p>}

            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
              })}
            />
            {errors.password && <p className="text-red-600">{errors.password.message}</p>}

            <Input
              label="Confirm Password: "
              type="password"
              placeholder="Re-enter your password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) => value === password || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && <p className="text-red-600">{errors.confirmPassword.message}</p>}

            <Button
              type="submit"
              className={`w-full bg-green-600 text-white h-9 rounded-full ${isSubmitting && 'opacity-50 cursor-not-allowed'}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;


