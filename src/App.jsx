import React from "react";
import { Routes, Route } from "react-router-dom";
import useTheme from "./hooks/useTheme.js";
import Layout from "./components/Layout.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Course from "./components/Course.jsx";
import Banner from "./components/Banner";
import Freebook from "./components/Freebook.jsx";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import { Toaster } from "react-hot-toast";
import "./App.css";
function App() {
  const [theme] = useTheme();

  return (
    <div>
      {" "}
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <>
                <Banner />
                <Freebook />
              </>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/course" element={<Course />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
