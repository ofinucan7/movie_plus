import React from 'react';
import Header from '../components/Header'
import LoginPrompt from '../components/LoginPrompt';

const Login = () => {
  return (
    <div>
      <Header isLoggedIn={ false }/>
      <LoginPrompt />
    </div>
  );
};

export default Login;