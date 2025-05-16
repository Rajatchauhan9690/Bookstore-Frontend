import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";

const ProfileForm = () => {
  const [authUser, setAuthUser] = useAuth();
  const [form, setForm] = useState({
    id: "",
    fullName: "",
    email: "",
    phone: "",
    gender: "",
    address: "",
    profileImage: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userData = localStorage.getItem("Users");
        if (!userData) return;

        const user = JSON.parse(userData);
        const userId = user._id || user.id;
        if (!userId) return;

        const response = await axios.post("/api/v1/getProfile", {
          id: userId,
        });
        const data = response.data.user;

        if (!data) {
          toast.error("User not found");
          return;
        }

        setForm({
          id: data._id || "",
          fullName: data.fullName || "",
          email: data.email || "",
          phone: data.phone || "",
          gender: data.gender || "",
          address: data.address || "",
          profileImage: data.profileImage || "",
        });

        if (data.profileImage) {
          setPreview(`http://localhost:3000/uploads/${data.profileImage}`);
        }
      } catch (error) {
        toast.error("Failed to fetch profile");
      }
    };

    fetchProfile();
  }, [authUser]);

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEditing) return;

    try {
      const formData = new FormData();
      ["id", "fullName", "email", "phone", "gender", "address"].forEach((key) =>
        formData.append(key, form[key])
      );

      if (imageFile) {
        formData.append("profileImage", imageFile);
      }

      const response = await axios.put("/api/v1/updateProfile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const updatedUser = response.data.user;
      if (!updatedUser) {
        toast.error("Update failed: no user data returned");
        return;
      }

      setAuthUser(updatedUser);
      localStorage.setItem("Users", JSON.stringify(updatedUser));

      setForm({
        id: updatedUser._id,
        fullName: updatedUser.fullName || "",
        email: updatedUser.email || "",
        phone: updatedUser.phone || "",
        gender: updatedUser.gender || "",
        address: updatedUser.address || "",
        profileImage: updatedUser.profileImage || "",
      });

      setPreview(
        updatedUser.profileImage ? `/uploads/${updatedUser.profileImage}` : ""
      );

      setImageFile(null);
      toast.success("Profile updated successfully");
      setIsEditing(false);
      navigate("/");
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  const handleEditClick = () => setIsEditing(true);
  const handleCancelClick = () => {
    setIsEditing(false);
    navigate("/");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white shadow-md p-6 rounded-xl space-y-4 mt-10"
      encType="multipart/form-data"
    >
      <h2 className="text-2xl font-semibold text-center text-blue-700 mb-4 relative">
        {isEditing ? "Edit Profile" : "Your Profile"}
        <button
          type="button"
          onClick={handleCancelClick}
          className="absolute top-0 right-0 p-2 text-gray-500 hover:text-red-600"
          aria-label="Close"
        >
          <i className="fas fa-times text-lg"></i>
        </button>
      </h2>

      {/* Profile Image */}
      <div className="flex justify-center">
        <div
          onClick={isEditing ? handleImageClick : undefined}
          className={`w-24 h-24 rounded-full border-2 ${
            isEditing ? "cursor-pointer border-blue-600" : "border-gray-400"
          } overflow-hidden`}
          title={isEditing ? "Click to upload" : ""}
        >
          {preview ? (
            <img
              src={preview}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
              No Image
            </div>
          )}
        </div>
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </div>

      {/* Form Fields */}
      {["fullName", "email", "phone", "gender", "address"].map((field) => (
        <input
          key={field}
          type="text"
          name={field}
          value={form[field]}
          onChange={handleChange}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          disabled={!isEditing}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100"
        />
      ))}

      {/* Action Buttons */}
      <div className="flex justify-between gap-4">
        {!isEditing ? (
          <button
            type="button"
            onClick={handleEditClick}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition"
          >
            Edit
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={handleCancelClick}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition"
            >
              Save
            </button>
          </>
        )}
      </div>
    </form>
  );
};

export default ProfileForm;
