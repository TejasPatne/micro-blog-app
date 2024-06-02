import React, { useState } from 'react'
import { Link, useNavigate }  from 'react-router-dom'

export const SignIn = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try{
      const res = await fetch("/api/auth/signin", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if(data.success===false){
        setError(true);
        return;
      }  
      navigate('/');
    } catch(error) {
      setError(true);
    } finally {
      setLoading(false);
    }
    
  }

  return (
    <div className='p-3 max-w-lg m-auto'>
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="email" placeholder="Email" id="email" className="bg-neutral-100 p-3 rounded-lg" onChange={handleChange} />
        <input type="password" placeholder="Password" id="password" className="bg-neutral-100 p-3 rounded-lg" onChange={handleChange} />
        <button disabled={loading} className="bg-neutral-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">Sign In</button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Don&apos;t have an account?</p>
        <Link to="/signup">
          <span className="text-blue-500">Sign Up</span>
        </Link>
      </div>
      <p className="text-red-700 mt-5">{error && "Something went wrong. Please try again."}</p>
    </div>
  )
}
