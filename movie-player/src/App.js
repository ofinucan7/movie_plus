import React from 'react';
import { Routes, Route } from 'react-router-dom';

import OpeningPage from './pages/OpeningPage';
import Login from './pages/Login';
import Main from './pages/Main';
import Search from './pages/Search';
import Joining from './pages/Joining';
import UserProfile from './pages/UserProfile'

function App() {

  return (
    <Routes>
      <Route path="/" element={<OpeningPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/main" element={<Main />} />
      <Route path="/search" element={<Search />} />
      <Route path="/join" element={<Joining />} />
      <Route path="/profile" element={<UserProfile />} />
    </Routes>
  );
}

export default App;