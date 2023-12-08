import React, { useState } from 'react';
import '../CSS/Sign.css';
import axios from 'axios';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const SignUp = ({ isLoggedIn, onLoginChange }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('https://your-csharp-backend/api/signup', formData)
      .then(response => {

        const token = response.data.token;

        onLoginChange();
      })
      .catch(error => console.error('Error during sign up:', error));
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
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
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />            
        </label>
        <label>
          
          <input
            placeholder='last name'
            type="text"
            name="lastName"
            value={formData.lastName}
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
            name="password"
            value={formData.password}
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