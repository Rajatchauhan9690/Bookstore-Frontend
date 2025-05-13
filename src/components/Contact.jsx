import React from "react";

const Contact = () => {
  return (
    <div className="max-w-screen-2xl container mx-auto px-4 md:px-20 mt-20  my-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold ">Contact Us</h1>
        <p className="text-lg  mt-4">
          We'd love to hear from you! Please fill out the form below.
        </p>
      </div>

      <div className="rounded-lg p-8 md:p-12 max-w-4xl mx-auto mt-8 shadow-[0_10px_20px_rgba(0,0,0,0.3)]">
        <form>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold mb-2">First Name</label>
              <input
                type="text"
                placeholder="First Name"
                className="w-full px-4 py-2 border rounded-md focus:outline-none "
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">Last Name</label>
              <input
                type="text"
                placeholder="Last Name"
                className="w-full px-4 py-2 border rounded-md focus:outline-none "
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block font-semibold mb-2">Email</label>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none "
            />
          </div>

          <div className="mt-6">
            <label className="block font-semibold mb-2">Message</label>
            <textarea
              rows="5"
              placeholder="Your message..."
              className="w-full px-4 py-2 border rounded-md focus:outline-none "
            ></textarea>
          </div>

          <div className="mt-8 text-center">
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600  font-semibold py-2 px-6 rounded-md transition duration-300"
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
