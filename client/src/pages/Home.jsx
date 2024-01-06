import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Home() {
  const { currentUser } = useSelector((state) => state.user);
  const truncatedUserName =
    currentUser && currentUser.username
      ? currentUser.username.length > 8
        ? currentUser.username.substring(0, currentUser.username.length - 8)
        : currentUser.username
      : "";

  return (
    <div className="container mx-auto p-4">
      <div className="text-center">
        {currentUser ? (
          <p className="text-2xl font-bold">Welcome, {truncatedUserName}!</p>
        ) : (
          <div>
            <p className="text-2xl font-bold mb-4">
              You need to sign in first.
            </p>
            <Link to="/signin">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Sign In
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
