import React, { useState, useEffect } from 'react';
import '../CSS/Sign.css';
import axios from 'axios';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const SignUp = ({ isLoggedIn, onLoginChange }) => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    userPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://localhost:7298/api/User/SignUp', formData);

      const token = response.data.token;

      onLoginChange(token);

      localStorage.setItem('token', token);
  } catch (error) {
      console.error('Error during sign up:', error);
  }
    setFormData({
      name: '',
      surname: '',
      email: '',
      userPassword: '',
    });
  };

  return (
    <div className='main-c sign'>
      <Navbar isLoggedIn={isLoggedIn}/> 
      <div>
      <h1 className='signUp'>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>
          
          <input
            placeholder='first name'
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />            
        </label>
        <label>
          
          <input
            placeholder='last name'
            type="text"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          <input
            placeholder='email'
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          
          <input
            placeholder='password'
            type="password"
            name="userPassword"
            value={formData.userPassword}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Sign Up</button>
      </form>
      </div>
      <Footer/>
    </div>
  );
};

export default SignUp