import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
    setValue,
  } = useForm();

  const password = watch("password", "");
  const gender = watch("gender", "");

  useEffect(() => {
    setPasswordStrength(evaluatePasswordStrength(password));
  }, [password]);

  const handleClose = () => {
    navigate("/");
  };

  // Password strength checker (simple version)
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

  // Strong password regex for validation before moving forward
  const isStrongPassword = (password) => {
    return evaluatePasswordStrength(password) === "Strong";
  };

  const onSubmit = async (data) => {
    let genderValue = data.gender;

    if (genderValue === "Other" && data.customGender) {
      // You might want to combine or keep both
    } else if (!["Male", "Female", "Other"].includes(genderValue)) {
      genderValue = "Other";
    }

    const formData = new FormData(); // Declare first

    formData.append("fullName", data.fullName);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("phone", data.phone || "");

    formData.append("gender", genderValue);
    formData.append("customGender", data.customGender || "");

    if (data.profileImage && data.profileImage[0]) {
      formData.append("profileImage", data.profileImage[0]);
    }

    try {
      const res = await axios.post("/api/v1/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data?.user) {
        localStorage.setItem("Users", JSON.stringify(res.data.user));
        toast.success("Signup Successfully");
        navigate("/");
        setTimeout(() => window.location.reload(), 500);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    }
  };

  const handleNext = async () => {
    // Validate current step fields before going forward

    let isValid = false;

    if (step === 1) {
      // Validate fullName and email
      isValid = await trigger(["fullName", "email"]);
    } else if (step === 2) {
      // Validate password and phone, also check password strength strong
      isValid = await trigger(["password", "phone"]);
      if (isValid && !isStrongPassword(password)) {
        toast.error(
          "Password is weak. It must be strong (6+ chars, uppercase, number, special char)."
        );
        isValid = false;
      }
    } else if (step === 3) {
      // Validate gender and if gender is Other, validate customGender as required
      isValid = await trigger(["gender"]);
      if (gender === "Other") {
        const customGenderValid = await trigger("customGender");
        if (!customGenderValid) isValid = false;
      }
    }

    if (isValid) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="p-6 sm:p-8 rounded-xl shadow-md w-full max-w-full sm:max-w-sm lg:max-w-[400px] bg-white relative mx-4 sm:mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-green-600 flex-grow text-center">
            <i className="fas fa-user-plus mr-2"></i>Signup - Step {step}
          </h1>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-red-600 transition"
          >
            <i className="fas fa-times text-lg"></i>
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          encType="multipart/form-data"
        >
          {/* Step 1 */}
          {step === 1 && (
            <>
              {/* Full Name */}
              <div>
                <label className="block mb-1">Full Name</label>
                <div className="flex items-center border border-gray-300 rounded-md px-3">
                  <i className="fas fa-user text-gray-400 mr-2"></i>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full py-2 bg-transparent focus:outline-none text-sm sm:text-base"
                    {...register("fullName", {
                      required: "Full Name is required",
                    })}
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
                    placeholder="Enter your email"
                    className="w-full py-2 bg-transparent focus:outline-none text-sm sm:text-base"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
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
            </>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <>
              {/* Password */}
              <div>
                <label className="block mb-1">Password</label>
                <div className="flex items-center border border-gray-300 rounded-md px-3">
                  <i className="fas fa-lock text-gray-400 mr-2"></i>
                  <input
                    type="password"
                    placeholder="Create a password"
                    className="w-full py-2 bg-transparent focus:outline-none text-sm sm:text-base"
                    {...register("password", {
                      required: "Password is required",
                      // We do validation on next step trigger, so no need here
                    })}
                  />
                </div>
                {errors.password && (
                  <span className="text-sm text-red-500">
                    {errors.password.message}
                  </span>
                )}
                {password && (
                  <span
                    className={`text-sm mt-1 font-medium block ${
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

              {/* Phone */}
              <div>
                <label className="block mb-1">Phone (optional)</label>
                <div className="flex items-center border border-gray-300 rounded-md px-3">
                  <i className="fas fa-phone text-gray-400 mr-2"></i>
                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                    className="w-full py-2 bg-transparent focus:outline-none text-sm sm:text-base"
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
            </>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <>
              {/* Gender */}
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
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>

              {/* Custom Gender input if Other */}
              {gender === "Other" && (
                <div className="mt-3">
                  <input
                    type="text"
                    placeholder="Please specify your gender"
                    className="w-full py-2 border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-green-400"
                    {...register("customGender", {
                      required: "Please specify your gender",
                    })}
                  />
                  {errors.customGender && (
                    <span className="text-sm text-red-500">
                      {errors.customGender.message}
                    </span>
                  )}
                </div>
              )}

              {/* Profile Image */}
              <div className="mt-3">
                <label className="block mb-1">Profile Image (optional)</label>
                <input
                  type="file"
                  accept="image/*"
                  {...register("profileImage")}
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setImagePreview(URL.createObjectURL(file));
                    }
                  }}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="mt-2 h-24 w-24 object-cover rounded-full border border-gray-300"
                  />
                )}
              </div>
            </>
          )}

          {/* Step 4 */}
          {step === 4 && (
            <div className="text-center">
              <h2 className="text-lg font-semibold mb-2">
                All steps completed!
              </h2>
              <p className="text-gray-600">
                Click Submit to finish registration.
              </p>
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
        </form>
      </div>
    </div>
  );
};

export default Signup;
