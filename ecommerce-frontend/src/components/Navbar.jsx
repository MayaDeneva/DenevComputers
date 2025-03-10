import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import CartDropdown from "./CartDropdown";
import Search from "./Search";
import UserDropdown from "./UserDropdown";

const Navbar = () => {
  

  return (
    <div className="navbar bg-base-100 bg-white fixed top-0 left-0 w-full z-50 shadow-md px-4 md:px-8 h-16">
      <div className="flex-1">
        <Link to="/">
          <img src={logo} alt="Denev Computers" className="h-14" />
        </Link>
        <Search />
      </div>
      <div className="flex-none content-between">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost flex items-center space-x-0"
          >
            <div className="indicator">
              <svg
                width="39"
                className="h-6 w-6"
                viewBox="0 0 39 35"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.5781 29.6594L19.3881 29.8501L19.1791 29.6594C10.1541 21.4387 4.18806 16.0027 4.18806 10.4905C4.18806 6.67575 7.03806 3.81471 10.8381 3.81471C13.7641 3.81471 16.6141 5.72207 17.6211 8.31608H21.1551C22.1621 5.72207 25.0121 3.81471 27.9381 3.81471C31.7381 3.81471 34.5881 6.67575 34.5881 10.4905C34.5881 16.0027 28.6221 21.4387 19.5781 29.6594ZM27.9381 0C24.6321 0 21.4591 1.54496 19.3881 3.9673C17.3171 1.54496 14.1441 0 10.8381 0C4.98606 0 0.388062 4.59673 0.388062 10.4905C0.388062 17.6812 6.84806 23.5749 16.6331 32.4823L19.3881 35L22.1431 32.4823C31.9281 23.5749 38.3881 17.6812 38.3881 10.4905C38.3881 4.59673 33.7901 0 27.9381 0Z"
                  fill="#1126EA"
                />
              </svg>
            </div>
            <span className="hidden md:inline">Любими</span>
          </div>
        </div>
        <CartDropdown />
        <UserDropdown/>
      </div>
    </div>
  );
};

export default Navbar;
