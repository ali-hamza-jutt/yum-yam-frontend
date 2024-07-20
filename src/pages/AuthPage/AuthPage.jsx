import React from 'react';
import SignupForm from '../../components/Signup/SignupForm';
import './AuthPage.css'; // Import the CSS file for styling
import LoginForm from '../../components/Login/LoginForm';

const AuthPage = () => {
  return (
    <div className="auth-container">
      <div className="form-container">
        <h1>Signup</h1>
        <SignupForm />
      </div>
      <div className="form-container">
        <h1>Login</h1>
        <LoginForm />
      </div>
    </div>
  );
};

export default AuthPage;
