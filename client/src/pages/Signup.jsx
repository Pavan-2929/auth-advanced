import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleAuth from "../components/GoogleAuth";

function Signup() {

  const navigate = useNavigate()
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      setError(false)
      const res = await fetch("https://auth-server-jixq.onrender.com/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if(data.sucess === false){
        setError(true);
        true;
      }
      setLoading(false)
      navigate('/signin')
    } catch (error) {
      setLoading(false)
      setError(true);
    }
  };
  console.log(formData);
  return (
    <div className="p-3 max-w-lg mx-auto bg-gray-200 mt-16 rounded-lg">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading...." : "Sing-UP"}
        </button>
        <GoogleAuth />
      </form>
      <p className="text-red-700 font-semibold text-center text-[1rem] mt-5">
        {error && "Something Went wrong"}
      </p>
      <div className="flex gap-2 mt-5 justify-center text-[1.2rem] font-semibold">
        <p>Have an account?</p>
        <Link to="/signin">
          <span className="text-blue-500">Sign-in</span>
        </Link>
      </div>
    </div>
  );
}

export default Signup;
