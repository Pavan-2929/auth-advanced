import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  const toggleHeader = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="p-3 sm:p-[0] text-[1.5rem] font-bold bg-gray-200">
      <div className="flex justify-around items-center flex-wrap">
        <h1>AuthToolKit</h1>
        <button onClick={toggleHeader}>
          <FaBars className="block sm:hidden ml-[8rem] mr-[0rem]" />
        </button>

        <ul
          className={`sm:flex ${
            isMenuOpen ? "flex" : "hidden"
          } gap-14 text-[1.5rem] sm:text-2xl my-4`}
        >
          <Link to="/" className="hover:text-blue-500">
            <li>Home</li>
          </Link>
          <Link to="/about" className="hover:text-blue-500">
            <li>About</li>
          </Link>
          <Link to="/profile" className="hover:text-blue-500">
            {currentUser ? (
              <img
                src={currentUser.profilePicture}
                alt="Profile"
                className="w-9 h-9 rounded-full mr-2 border border-black shadow-lg"
              />
            ) : (
              "Sign-in"
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}

export default Header;
