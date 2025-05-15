import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";

const Signup = () => {
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
      fullName: data.fullName,
      email: data.email,
      password: data.password,
      phone: data.phone || "",
      gender: data.gender || "",
    };

    try {
      const res = await axios.post("/api/v1/register", userInfo);
      if (res.data?.user) {
        localStorage.setItem("Users", JSON.stringify(res.data.user));
        toast.success("Signup Successfully");
        navigate("/");
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    } catch (err) {
      if (err.response) {
        toast.error("Error: " + err.response.data.message);
      } else {
        toast.error("Signup failed");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className=" p-6 sm:p-8 rounded-xl shadow-md w-full max-w-full sm:max-w-sm lg:max-w-[400px] relative mx-4 sm:mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-green-600 flex-grow text-center">
            <i className="fas fa-user-plus mr-2"></i>Signup
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
          {/* Full Name */}
          <div>
            <label className="block mb-1">Full Name</label>
            <div className="flex items-center border border-gray-300 rounded-md px-3">
              <i className="fas fa-user text-gray-400 mr-2"></i>
              <input
                type="text"
                className="w-full py-2 bg-transparent focus:outline-none text-sm sm:text-base"
                placeholder="Enter your full name"
                {...register("fullName", { required: "Full Name is required" })}
              />
            </div>
            {errors.fullName && (
              <span className="text-sm text-red-500">
                {errors.fullName.message}
              </span>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1">Email</label>
            <div className="flex items-center border border-gray-300 rounded-md px-3">
              <i className="fas fa-envelope text-gray-400 mr-2"></i>
              <input
                type="email"
                className="w-full py-2 bg-transparent focus:outline-none text-sm sm:text-base"
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: "Invalid email address",
                  },
                })}
              />
            </div>
            {errors.email && (
              <span className="text-sm text-red-500">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1">Password</label>
            <div className="flex items-center border border-gray-300 rounded-md px-3">
              <i className="fas fa-lock text-gray-400 mr-2"></i>
              <input
                type="password"
                className="w-full py-2 bg-transparent focus:outline-none text-sm sm:text-base"
                placeholder="Create a password"
                autoComplete="off"
                {...register("password", {
                  required: "Password is required",
                })}
              />
            </div>
            {errors.password && (
              <span className="text-sm text-red-500">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Phone (optional) */}
          <div>
            <label className="block mb-1">Phone (optional)</label>
            <div className="flex items-center border border-gray-300 rounded-md px-3">
              <i className="fas fa-phone text-gray-400 mr-2"></i>
              <input
                type="tel"
                className="w-full py-2 bg-transparent focus:outline-none text-sm sm:text-base"
                placeholder="Enter your phone number"
                {...register("phone", {
                  pattern: {
                    value: /^[0-9]{10,15}$/,
                    message: "Invalid phone number",
                  },
                })}
              />
            </div>
            {errors.phone && (
              <span className="text-sm text-red-500">
                {errors.phone.message}
              </span>
            )}
          </div>

          {/* Gender (optional) */}
          <div>
            <label className="block mb-1">Gender (optional)</label>
            <select
              {...register("gender")}
              className="w-full py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              defaultValue=""
            >
              <option value="" disabled>
                Select your gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
              <option value="Prefer Not To Say">Prefer Not To Say</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-200"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-6 text-center">
          <h2>Already have an account?</h2>
          <Link to="/login" className="text-green-600 font-medium">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
