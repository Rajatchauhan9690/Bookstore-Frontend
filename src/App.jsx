import React from "react";
import { Routes, Route } from "react-router-dom";
import useTheme from "./hooks/useTheme.js"; // Import the useTheme hook
import Layout from "./components/Layout.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Course from "./components/Course.jsx";
import Banner from "./components/Banner";
import Freebook from "./components/FreeBook";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import "./App.css";
function App() {
  const [theme] = useTheme();

  return (
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
  );
}

export default App;
