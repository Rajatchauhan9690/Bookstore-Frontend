import React from "react";

const About = () => {
  return (
    <div className="max-w-screen-2xl container mx-auto px-4 md:px-20 mt-28 mb-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold">About Us</h1>
        <p className="text-lg  mt-4">
          Learn more about our mission, vision, and the journey so far.
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="order-1 md:order-2 md:w-1/2 mt-10 md:mt-0">
          <img
            src="https://cdn-front.freepik.com/images/ai/image-generator/gallery/resource-tti-15.webp"
            className="rounded-xl shadow-lg w-full h-[450px]"
          />
        </div>

        <div className="order-2 md:order-1 md:w-1/2 text-justify leading-7">
          <h2 className="text-2xl font-semibold mb-4 text-orange-600">
            Who We Are
          </h2>
          <p>
            We are a passionate team committed to delivering the best learning
            experience to students across the world. Since our inception, we’ve
            helped thousands of learners grow their knowledge, upskill, and
            achieve their goals.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-orange-600">
            What We Do
          </h2>
          <p className="my-4 mx-2">
            Our platform offers carefully curated courses, expert guidance, and
            valuable resources tailored to the needs of each student. Whether
            you're starting your career or aiming to switch paths, we're here to
            support your journey.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
