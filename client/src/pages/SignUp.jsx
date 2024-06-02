import React from "react";
import { Link } from "react-router-dom";

export const SignUp = () => {
  return (
    <div className="p-3 max-w-lg m-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="bg-neutral-100 p-3 rounded-lg"
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="bg-neutral-100 p-3 rounded-lg"
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-neutral-100 p-3 rounded-lg"
        />
        <button className="bg-neutral-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          Sign Up
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to="/signin">
          <span className="text-blue-500">Sign In</span>
        </Link>
      </div>
    </div>
  );
};
