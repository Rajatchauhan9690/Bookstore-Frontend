import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useTheme from "../hooks/useTheme";

const Navbar = () => {
  const [sticky, setSticky] = useState(false);
  const [theme, setTheme] = useTheme();

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
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <i className="fas fa-bars text-xl"></i>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 w-52"
            >
              {navItems}
            </ul>
          </div>
          <Link to="/" className="text-2xl font-bold cursor-pointer">
            BookStore
          </Link>
        </div>

        <div className="navbar-end space-x-3">
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{navItems}</ul>
          </div>

          <div className="hidden md:block">
            <label className="px-3 py-1 border rounded-md flex items-center gap-2">
              <input
                type="text"
                className="grow outline-none rounded-md px-1"
                placeholder="Search"
              />
              <i className="fas fa-search"></i>
            </label>
          </div>

          {/* Theme Toggle */}
          <label className="swap swap-rotate cursor-pointer">
            <input
              type="checkbox"
              onChange={(e) => setTheme(e.target.checked ? "light" : "dark")}
              checked={theme === "light"}
            />
            <i className="fas fa-sun swap-off text-yellow-500 text-2xl"></i>

            <i className="fas fa-moon swap-on text-gray-700 text-2xl"></i>
          </label>

          <div className="navbar-end">
            <Link to="/login" className="btn text-xl">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
