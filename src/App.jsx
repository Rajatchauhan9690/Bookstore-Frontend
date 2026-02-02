import React, { useState } from "react";
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
import ProfileForm from "./components/profile.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { Toaster } from "react-hot-toast";
import "./App.css";

function App() {
  const [theme] = useTheme();
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      <Routes>
        <Route
          element={
            <Layout searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          }
        >
          <Route
            path="/"
            element={
              <>
                <Banner />
                <Freebook searchTerm={searchTerm} />
              </>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Protected Course Route */}
          <Route
            path="/course"
            element={
              <ProtectedRoute>
                <Course />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<ProfileForm />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
