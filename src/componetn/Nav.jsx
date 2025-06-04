import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { IoClose } from "react-icons/io5";
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { FaUser } from "react-icons/fa";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const handleLogin = () => {
    navigate("/login");
  };
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    localStorage.removeItem("userType");
    navigate("/login");
  };

  return (
    <div>
      <nav className="flex justify-between  items-center h-13 lg:h-16 text-white bg-gradient-to-r from-violet-600 to-violet-800  w-full fixed px-5 md:px-5 lg:px-25 py-1.5 shadow-md z-50">
        <div className="flex h-full  items-center ">
          <img
            className="h-full w-10 lg:w-35 object-cover p-1 bg-white rounded-2xl shadow-md"
            src="https://sadasaudi.net/wp-content/uploads/2024/10/logo-h-scaled.webp"
            alt=""
          />
          <ul className="hidden gap-5 ml-10 text-lg font-medium text-neutral-200 lg:flex">
            <Link
              to="/home"
              className="transition duration-500 ease-in-out hover:text-white hover:scale-105"
            >
              {" "}
              <li>Home</li>{" "}
            </Link>
            <Link
              to="/homework"
              className="transition duration-500 ease-in-out hover:text-white hover:scale-105"
            >
              <li>Homework</li>
            </Link>
          </ul>
        </div>
        <div className="hidden lg:flex items-center w-full justify-end ">
          {localStorage.getItem("user") ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center bg-white text-violet-600 rounded-full p-2">
                <FaUser className="text-xl" />
              </div>
              <p className="text-lg">{localStorage.getItem("user")}</p>
              <button
                onClick={() => handleLogout()}
                className=" bg-white text-violet-600 px-4 py-1 rounded hover:bg-violet-100 transition cursor-pointer"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => handleLogin()}
              className="bg-white text-violet-600 px-4 py-1 rounded hover:bg-violet-100 transition cursor-pointer"
            >
              Login
            </button>
          )}
        </div>
        <div
          className={`lg:flex fixed lg:static top-12 right-0 w-full lg:w-auto bg-gradient-to-r from-violet-600 to-violet-800 text-white transition-transform duration-300 ease-in-out lg:bg-transparent lg:translate-x-0 ${
            isOpen ? "translate-x-0" : "translate-x-[-100%]"
          }`}
        >
          <ul className="flex flex-col gap-5 p-5 text-lg lg:hidden ">
            <Link to="/home" onClick={toggleMenu}>
              <li>Home</li>
            </Link>
            <Link to="/homework" onClick={toggleMenu}>
              <li>Homework</li>
            </Link>
          </ul>
          <div className="flex flex-col gap-5 pb-5 pl-5 text-lg lg:hidden ">
            {localStorage.getItem("user") ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center bg-white text-violet-600 rounded-full p-2">
                  <FaUser className="text-base md:text-lg lg:text-xl" />
                </div>
                <p className="text-sm md:text-base lg:text-lg">
                  {localStorage.getItem("user")}
                </p>
                <button
                  onClick={() => handleLogout()}
                  className=" bg-white text-violet-600 px-4 py-1 rounded hover:bg-violet-100 transition cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleLogin()}
                className="bg-white text-violet-600 px-4 py-1 w-30 rounded hover:bg-violet-100 transition cursor-pointer"
              >
                Login
              </button>
            )}
          </div>
        </div>
        <div className="lg:hidden">
          {isOpen ? (
            <IoClose className="text-3xl" onClick={toggleMenu} />
          ) : (
            <HiMiniBars3BottomRight className="text-2xl" onClick={toggleMenu} />
          )}
        </div>
      </nav>
    </div>
  );
}

export default Nav;
