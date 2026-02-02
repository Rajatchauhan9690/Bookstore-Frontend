import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };

    try {
      const res = await axios.post(
        "https://bookstorees-backend.onrender.com/api/v1/users/login",
        userInfo,
      );

      if (res.data?.user) {
        localStorage.setItem("Users", JSON.stringify(res.data.user));
        toast.success("Login Successful");
        navigate("/");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (err) {
      if (err.response?.data?.message) {
        toast.error("Error: " + err.response.data.message);
      } else {
        toast.error("Login failed. Please try again.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-6 sm:p-8 rounded-xl shadow-md w-full max-w-full sm:max-w-sm lg:max-w-[400px] relative mx-4 sm:mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-blue-700 flex-grow text-center sm:text-2xl">
            <i className="fas fa-sign-in-alt mr-2"></i>Login
          </h1>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-red-600 transition"
            aria-label="Close"
          >
            <i className="fas fa-times text-lg"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1">Email</label>
            <div className="flex items-center border rounded-md px-3">
              <i className="fas fa-envelope text-gray-400 mr-2"></i>
              <input
                type="email"
                className="w-full py-2 bg-transparent focus:outline-none text-sm sm:text-base"
                placeholder="Enter your email"
                {...register("email", { required: true })}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">Email is required</p>
            )}
          </div>
          <div>
            <label className="block mb-1">Password</label>
            <div className="flex items-center border rounded-md px-3">
              <i className="fas fa-lock text-gray-400 mr-2"></i>
              <input
                type="password"
                className="w-full py-2 bg-transparent focus:outline-none text-sm sm:text-base"
                placeholder="Enter your password"
                {...register("password", { required: true })}
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">Password is required</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200 text-sm sm:text-base"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <h2 className="text-sm sm:text-base">Registered here?</h2>
          <Link
            to="/signup"
            className="text-blue-600 font-medium text-sm sm:text-base"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
