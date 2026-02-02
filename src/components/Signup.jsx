import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthProvider.jsx";

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [authUser, setAuthUser] = useAuth();

  const [step, setStep] = useState(1);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm();

  const password = watch("password", "");
  const gender = watch("gender", "");

  useEffect(() => {
    setPasswordStrength(evaluatePasswordStrength(password));
  }, [password]);

  // Password strength evaluation
  const evaluatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 6) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (strength <= 1) return "Weak";
    if (strength === 2 || strength === 3) return "Medium";
    return "Strong";
  };

  const isStrongPassword = (password) =>
    evaluatePasswordStrength(password) === "Strong";

  const onSubmit = async (data) => {
    let genderValue = data.gender;
    if (genderValue === "Other" && data.customGender) {
      genderValue = data.customGender;
    } else if (!["Male", "Female", "Other"].includes(genderValue)) {
      genderValue = "Other";
    }

    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("dob", data.dob);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("phone", data.phone || "");
    formData.append("gender", genderValue);
    formData.append("customGender", data.customGender || "");

    if (data.profileImage && data.profileImage[0]) {
      formData.append("profileImage", data.profileImage[0]);
    }

    try {
      const res = await axios.post(
        "https://bookstorees-backend.onrender.com/api/v1/users/register",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      if (res.data?.user) {
        localStorage.setItem("Users", JSON.stringify(res.data.user));
        toast.success("Signup Successfully");

        setAuthUser(res.data.user); // update auth context
        navigate(from, { replace: true }); // redirect to original page
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    }
  };

  // Handle next step
  const handleNext = async () => {
    let isValid = false;

    if (step === 1) {
      isValid = await trigger(["fullName", "email"]);
    } else if (step === 2) {
      isValid = await trigger(["password", "phone"]);
      if (isValid && !isStrongPassword(password)) {
        toast.error(
          "Password is weak. Must be strong (6+ chars, uppercase, number, special char).",
        );
        isValid = false;
      }
    } else if (step === 3) {
      isValid = await trigger(["gender"]);
      if (gender === "Other") {
        const customValid = await trigger("customGender");
        if (!customValid) isValid = false;
      }
    }

    if (isValid) setStep((prev) => prev + 1);
  };

  const handleBack = () => setStep((prev) => prev - 1);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="p-6 sm:p-8 rounded-xl shadow-md w-full max-w-full sm:max-w-sm lg:max-w-[400px] bg-white relative mx-4 sm:mx-auto">
        <h1 className="text-2xl font-bold text-green-600 text-center mb-6">
          <i className="fas fa-user-plus mr-2"></i>Signup - Step {step}
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          encType="multipart/form-data"
        >
          {/* Step 1: Name + Email */}
          {step === 1 && (
            <>
              <div>
                <label className="block mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full py-2 border rounded px-3"
                  {...register("fullName", {
                    required: "Full Name is required",
                  })}
                />
                {errors.fullName && (
                  <span className="text-red-500">
                    {errors.fullName.message}
                  </span>
                )}
              </div>

              <div>
                <label className="block mb-1">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full py-2 border rounded px-3"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                      message: "Invalid email",
                    },
                  })}
                />
                {errors.email && (
                  <span className="text-red-500">{errors.email.message}</span>
                )}
              </div>
            </>
          )}

          {/* Step 2: DOB + Password + Phone */}
          {step === 2 && (
            <>
              <div>
                <label className="block mb-1">DOB</label>
                <input
                  type="date"
                  max={new Date().toISOString().split("T")[0]}
                  className="w-full py-2 border rounded px-3"
                  {...register("dob", { required: "DOB is required" })}
                />
                {errors.dob && (
                  <span className="text-red-500">{errors.dob.message}</span>
                )}
              </div>

              <div>
                <label className="block mb-1">Password</label>
                <input
                  type="password"
                  placeholder="Create a password"
                  className="w-full py-2 border rounded px-3"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                {password && (
                  <span
                    className={`block mt-1 ${
                      passwordStrength === "Strong"
                        ? "text-green-600"
                        : passwordStrength === "Medium"
                          ? "text-yellow-600"
                          : "text-red-500"
                    }`}
                  >
                    Strength: {passwordStrength}
                  </span>
                )}
              </div>

              <div>
                <label className="block mb-1">Phone (optional)</label>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  className="w-full py-2 border rounded px-3"
                  {...register("phone", {
                    pattern: {
                      value: /^[0-9]{10,15}$/,
                      message: "Invalid phone number",
                    },
                  })}
                />
                {errors.phone && (
                  <span className="text-red-500">{errors.phone.message}</span>
                )}
              </div>
            </>
          )}

          {/* Step 3: Gender + Profile Image */}
          {step === 3 && (
            <>
              <div>
                <label className="block mb-1">Gender (optional)</label>
                <select
                  {...register("gender")}
                  className="w-full py-2 border rounded px-3"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select your gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>

              {gender === "Other" && (
                <div>
                  <input
                    type="text"
                    placeholder="Please specify your gender"
                    className="w-full py-2 border rounded px-3 mt-2"
                    {...register("customGender", {
                      required: "Please specify your gender",
                    })}
                  />
                  {errors.customGender && (
                    <span className="text-red-500">
                      {errors.customGender.message}
                    </span>
                  )}
                </div>
              )}

              <div>
                <label className="block mb-1 mt-2">
                  Profile Image (optional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  {...register("profileImage")}
                  onChange={(e) =>
                    e.target.files[0] &&
                    setImagePreview(URL.createObjectURL(e.target.files[0]))
                  }
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="mt-2 h-24 w-24 object-cover rounded-full border"
                  />
                )}
              </div>
            </>
          )}

          {/* Step 4: Finish */}
          {step === 4 && (
            <div className="text-center">
              <h2 className="text-lg font-semibold mb-2">
                All steps completed!
              </h2>
              <p>Click Submit to finish registration.</p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-between mt-6">
            {step > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Back
              </button>
            )}

            {step < 4 && (
              <button
                type="button"
                onClick={handleNext}
                className="ml-auto px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Next
              </button>
            )}

            {step === 4 && (
              <button
                type="submit"
                className="ml-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Submit
              </button>
            )}
          </div>

          {/* Login link */}
          <div className="text-center mt-4 text-sm text-gray-600">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Login
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
