import React from "react";

function About() {
  return (
    <div className="container p-8 bg-gray-200 rounded-lg shadow-lg my-auto flex flex-col mt-14 text-center sm:w-[80vw] sm:mx-auto">
      <h1 className="text-3xl font-extrabold mb-6 text-indigo-700">
        Discover Our Authentication System
      </h1>
      <p className="text-lg mb-6 text-gray-700 leading-relaxed font-semibold">
        Welcome to our cutting-edge authentication system, crafted with the
        powerful MERN stack. We leverage MongoDB for seamless data storage,
        Express.js for robust server-side logic, React for a dynamic frontend,
        and Node.js for a scalable server environment. The authentication
        process is fortified with JWT (JSON Web Token) for secure user
        verification. For a flawless user experience, we employ Redux Toolkit
        for efficient state management, ensuring responsiveness and reliability.
      </p>
      <p className="text-lg mb-6 text-gray-700 leading-relaxed font-semibold">
        Empowering users with versatile actions such as profile image uploads,
        username and password changes, and account deletions. Our system
        enhances user sessions with the use of cookies, guaranteeing a smooth
        and persistent login experience.
      </p>
      <p className="text-lg text-gray-700 leading-relaxed font-semibold">
        Elevating aesthetics with the elegance of Tailwind CSS, our interface is
        visually pleasing and intuitive. Immerse yourself in the seamless fusion
        of functionality and style seamlessly integrated into our authentication
        system.
      </p>
      <h2 className="text-xl font-bold text-indigo-700 my-6">
        Thank you for exploring our system!
      </h2>
    </div>
  );
}

export default About;
