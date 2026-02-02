import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";
const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const userInfo = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      message: data.message,
    };
    await axios
      .post(
        "https://bookstorees-backend.onrender.com/api/v1/contacts/contact",
        userInfo,
      )
      .then((res) => {
        if (res.data) {
          toast.success("Form submitted Successfully");
          reset();
        }
      })
      .catch((err) => {
        if (err.response) {
          toast.error("Error: " + err.response.data.message);
        }
      });
  };

  return (
    <div className="max-w-screen-2xl container mx-auto px-4 md:px-20 mt-20 my-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold">Contact Us</h1>
        <p className="text-lg mt-4">
          We'd love to hear from you! Please fill out the form below.
        </p>
      </div>

      <div className="rounded-lg p-8 md:p-12 max-w-4xl mx-auto mt-8 shadow-[0_10px_20px_rgba(0,0,0,0.3)]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold mb-2">First Name</label>
              <input
                {...register("firstName", { required: true })}
                placeholder="First Name"
                className="w-full px-4 py-2 border rounded-md focus:outline-none"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">First name is required</p>
              )}
            </div>

            <div>
              <label className="block font-semibold mb-2">Last Name</label>
              <input
                {...register("lastName", { required: true })}
                placeholder="Last Name"
                className="w-full px-4 py-2 border rounded-md focus:outline-none"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm">Last name is required</p>
              )}
            </div>
          </div>

          <div className="mt-6">
            <label className="block font-semibold mb-2">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">Email is required</p>
            )}
          </div>

          <div className="mt-6">
            <label className="block font-semibold mb-2">Message</label>
            <textarea
              rows="5"
              {...register("message", { required: true })}
              placeholder="Your message..."
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
            ></textarea>
            {errors.message && (
              <p className="text-red-500 text-sm">Message is required</p>
            )}
          </div>

          <div className="mt-8 text-center">
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 font-semibold py-2 px-6 rounded-md transition duration-300"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
