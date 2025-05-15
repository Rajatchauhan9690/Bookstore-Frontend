import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const ProfileForm = () => {
  const [form, setForm] = useState({
    id: "",
    fullName: "",
    email: "",
    phone: "",
    gender: "",
    address: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userData = localStorage.getItem("Users");
        if (!userData) {
          console.warn("No user data found in localStorage");
          return;
        }

        const user = JSON.parse(userData);
        const userId = user.id || user._id;
        if (!userId) {
          console.warn("User ID not found");
          return;
        }

        const response = await axios.post("/api/v1/getProfile", { id: userId });
        const data = response.data.user;
        if (!data) {
          alert("User not found");
          return;
        }

        setForm({
          id: data._id || "",
          fullName: data.fullName || "",
          email: data.email || "",
          phone: data.phone || "",
          gender: data.gender || "",
          address: data.address || "",
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
        alert("Failed to fetch profile");
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isEditing) return;

    try {
      await axios.put("/api/v1/updateProfile", form);
      toast.success("Profile updated successfully");
      setIsEditing(false);
      navigate("/");
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update profile");
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    navigate("/");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white shadow-md p-6 rounded-xl space-y-4 mt-15"
    >
      <h2 className="text-2xl font-semibold text-center text-blue-700 mb-4 relative">
        {isEditing ? "Edit Profile" : "Your Profile"}
        <button
          onClick={handleCancelClick}
          className="absolute top-0 right-0 p-2 text-gray-500 hover:text-red-600 transition"
          aria-label="Close"
        >
          <i className="fas fa-times text-lg"></i>
        </button>
      </h2>

      {["fullName", "email", "phone", "gender"].map((field) => (
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

      <div className="flex justify-between">
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
