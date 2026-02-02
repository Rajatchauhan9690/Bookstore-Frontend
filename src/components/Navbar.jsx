import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import { useAuth } from "../context/AuthProvider";
import Logout from "./Logout";

const Navbar = ({ searchTerm, setSearchTerm }) => {
  const [inputValue, setInputValue] = useState(searchTerm || "");
  const [authUser, setAuthUser] = useAuth();
  const [sticky, setSticky] = useState(false);
  const [theme, setTheme] = useTheme();

  const handleSearch = (e) => {
    setInputValue(e.target.value);
  };
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchTerm(inputValue);
    }, 400);

    return () => clearTimeout(handler);
  }, [inputValue, setSearchTerm]);
  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/course">Course</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/contact">Contact</Link>
      </li>
    </>
  );

  return (
    <div
      className={`max-w-screen-2xl container mx-auto md:px-20 px-4 fixed top-0 left-0 right-0 z-50 ${
        sticky
          ? "sticky-navbar shadow-md bg-base-200 duration-300 transition-all ease-in-out"
          : ""
      }`}
    >
      <div className="navbar">
        {/* Left Section */}
        <div className="navbar-start">
          {/* Mobile Hamburger */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <i className="fas fa-bars text-xl"></i>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 w-52 bg-base-100"
            >
              {navItems}
              {!authUser && (
                <li>
                  <Link to="/login">Login</Link>
                </li>
              )}
            </ul>
          </div>

          {/* Brand Logo */}
          <Link to="/" className="text-2xl font-bold cursor-pointer">
            BookStore
          </Link>
        </div>

        {/* Center Section (nav links) */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navItems}</ul>
        </div>

        {/* Right Section */}
        <div className="navbar-end space-x-3">
          {/* Search */}
          <div className="hidden md:block">
            <label className="px-3 py-1 border rounded-md flex items-center gap-2">
              <input
                type="text"
                className="grow outline-none rounded-md px-1"
                placeholder="Search"
                value={inputValue}
                onChange={handleSearch}
              />
              <i className="fas fa-search"></i>
            </label>
          </div>

          {/* Theme toggle */}
          <label className="swap swap-rotate cursor-pointer">
            <input
              type="checkbox"
              onChange={(e) => setTheme(e.target.checked ? "light" : "dark")}
              checked={theme === "light"}
            />
            <i className="fas fa-sun swap-off text-yellow-500 text-2xl"></i>
            <i className="fas fa-moon swap-on text-gray-700 text-2xl"></i>
          </label>

          {authUser ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <img
                  className="w-10 rounded-full"
                  src={
                    authUser && authUser.profileImage
                      ? authUser.profileImageUrl
                      : "https://tse1.mm.bing.net/th?id=OIP.LpjCGnSs4RBk-z1P2E-WCgHaHa&pid=Api&P=0&h=180"
                  }
                  alt="user"
                  onError={(e) => {
                    e.currentTarget.onerror = null; // prevent infinite loop
                    e.currentTarget.src =
                      "https://tse1.mm.bing.net/th?id=OIP.LpjCGnSs4RBk-z1P2E-WCgHaHa&pid=Api&P=0&h=180";
                  }}
                />
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <li className="font-semibold px-2">{authUser.fullName}</li>
                <li>
                  <Link to="/profile">Your Profile</Link>
                </li>
                <li>
                  <Logout />
                </li>
              </ul>
            </div>
          ) : (
            <div className="hidden lg:flex gap-2">
              <Link to="/login" className="btn btn-sm text-md">
                Login
              </Link>
              <Link to="/signup" className="btn btn-sm btn-outline text-md">
                Signup
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
