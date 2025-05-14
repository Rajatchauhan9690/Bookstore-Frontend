import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";
const SignupPage = () => {
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
      FullName: data.FullName,
      Email: data.Email,
      Password: data.Password,
    };
    await axios
      .post("api/v1/register", userInfo)
      .then((res) => {
        if (res.data?.user) {
          localStorage.setItem("Users", JSON.stringify(res.data.user));
          toast.success("Signup Successfully");
          navigate("/");
        }
      })
      .catch((err) => {
        if (err.response) {
          toast.error("Error: " + err.response.data.message);
        }
      });
  };
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className=" p-6 sm:p-8 rounded-xl shadow-md w-full max-w-full sm:max-w-sm lg:max-w-[400px] relative mx-4 sm:mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-green-600 flex-grow text-center">
            <i className="fas fa-sign-in-alt mr-2"></i>Signup
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
            <label className="block mb-1">Name</label>
            <div className="flex items-center border border-gray-300 rounded-md px-3">
              <i className="fas fa-user text-gray-400 mr-2"></i>
              <input
                type="text"
                className="w-full py-2 bg-transparent focus:outline-none text-sm sm:text-base"
                placeholder="Enter your name"
                {...register("FullName", { required: true })}
              />
            </div>

            {errors.fullname && (
              <span className="text-sm text-red-500">
                This field is required
              </span>
            )}
          </div>

          <div>
            <label className="block mb-1">Email</label>
            <div className="flex items-center border border-gray-300 rounded-md px-3">
              <i className="fas fa-envelope text-gray-400 mr-2"></i>
              <input
                type="email"
                className="w-full py-2 bg-transparent focus:outline-none text-sm sm:text-base"
                placeholder="Enter your email"
                {...register("Email", { required: true })}
              />
            </div>
            {errors.email && (
              <span className="text-sm text-red-500">
                This field is required
              </span>
            )}
          </div>

          <div>
            <label className="block mb-1">Password</label>
            <div className="flex items-center border border-gray-300 rounded-md px-3">
              <i className="fas fa-lock text-gray-400 mr-2"></i>
              <input
                type="password"
                className="w-full py-2 bg-transparent  focus:outline-none text-sm sm:text-base"
                placeholder="Create a password"
                autoComplete="off"
                {...register("Password", { required: true })}
              />
            </div>
            {errors.password && (
              <span className="text-sm text-red-500">
                This field is required
              </span>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-200"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-6 text-center">
          <h2 className="">Already have an account?</h2>
          <Link to="/login" className="text-green-600 font-medium">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
