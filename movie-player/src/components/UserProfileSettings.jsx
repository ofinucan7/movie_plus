import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserProfileSettings = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const storedUsername = localStorage.getItem('username');

  useEffect(() => {
    const fetchProfile = async () => {
      if (!storedUsername) return;

      try {
        const res = await fetch(`https://movieplus-production-52bb.up.railway.app/profile/${storedUsername}`);
        if (res.ok) {
          const data = await res.json();
          setUserData((prev) => ({
            ...prev,
            username: data.username,
            email: data.email,
          }));
        } else {
          console.error('Failed to load profile');
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, [storedUsername]);

  const handleUpdate = async () => {
    if (userData.password !== userData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const res = await fetch(`https://movieplus-production-52bb.up.railway.app/update-password/${storedUsername}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: userData.password }),
      });

      if (res.ok) {
        alert('Password updated');
      } else {
        alert('Update failed');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete your account?');
    if (!confirmDelete) return;

    try {
      const res = await fetch(`https://movieplus-production-52bb.up.railway.app/delete-account/${storedUsername}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        localStorage.removeItem('username');
        alert('Account deleted');
        navigate('/');
      } else {
        alert('Delete failed');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden text-white">
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#3535df] via-black to-indigo-600 animate-gradient bg-[length:400%_400%]" />
      <div className="absolute inset-0 bg-black bg-opacity-60 z-10" />

      {/* profile data */}
      <div className="relative z-20 w-full max-w-md bg-[#111] p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-semibold mb-6 text-center"> Your Profile </h2>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1"> Username </label>
          <input type="text" value={userData.username} disabled className="w-full border px-4 py-2 rounded bg-gray-800 text-white" />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1"> Email </label>
          <input type="email" value={userData.email} disabled className="w-full border px-4 py-2 rounded bg-gray-800 text-white" />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1"> New Password </label>
          <input type="password" value={userData.password} onChange={(e) => setUserData({ ...userData, password: e.target.value })} className="w-full border px-4 py-2 rounded text-black" />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1"> Confirm New Password </label>
          <input type="password" value={userData.confirmPassword} onChange={(e) => setUserData({ ...userData, confirmPassword: e.target.value })} className="w-full border px-4 py-2 rounded text-black" />
        </div>

        <div className='text-sm text-gray-400'>
          <p> As a reminder, please do not change the DemoUser account password or delete the account <br /> <br /> </p>
          <p> If you want to test that functionality, please just make a new account (or just believe me in saying that it works). </p>
        </div>
        
        
        <button onClick={handleUpdate} className="w-full bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 rounded mb-4">Update Password</button>
        <button onClick={handleDelete} className="w-full bg-red-600 hover:bg-red-800 text-white font-bold py-2 rounded">Delete Account</button>
      </div>
    </div>
  );
};

export default UserProfileSettings;
