import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPrompt = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  // handle logging into the db
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("username", data.username); 
        navigate('/main');
      } else {
        alert(data.detail || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Server error. Please try again later.");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden text-white">
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#3535df] via-black to-indigo-600 animate-gradient bg-[length:400%_400%]" />
      <div className="absolute inset-0 bg-black bg-opacity-60 z-10" />

      {/* login forms */}
      <div className="relative z-20 w-full max-w-md bg-[#111] p-8 rounded-2xl shadow-lg">
        <h1 className="text-white text-3xl font-semibold mb-6 text-center"> Login </h1>
        <form className="flex flex-col space-y-6" onSubmit={handleLogin}>
          <input type="text" placeholder="Username" value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} className="px-4 py-3 rounded-lg bg-[#222] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white" required/>
          <input type="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="px-4 py-3 rounded-lg bg-[#222] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white" required/>

          {/* demo account info*/}
          <div className='text-sm text-gray-400'>
            <p> For a demo account, see below: </p>
            <p> Username: DemoUser </p>
            <p> Password: 12345 </p>
            <p> If you are wanting to test password change / deletion, please make a seperate account.</p>
          </div>

          <button type="submit" className="bg-white text-black font-medium py-3 rounded-lg hover:bg-gray-200 transition"> Start Streaming </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPrompt;