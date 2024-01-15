import React, {useEffect, useState} from 'react';
import axios from 'axios';
import '../CSS/Sign.css';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { toast } from 'react-toastify';
import { BrowserRouter as Router, Route, Routes,Link } from 'react-router-dom';

const SignIn = ( { isLoggedIn, onLoginChange, idUser} ) => {
    const [formData, setFormData] = useState({
      email: '',
      password: '',
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axios.get('https://localhost:7298/api/User/LogIn', {
          params: {
            email: formData.email,
            user_password: formData.password,
          },
        });

        onLoginChange(response.data);

        localStorage.clear();
        
      } catch (error) {
        console.error('Error during sign in:', error);
        toast.error('Error during sign-in. Please check your credentials and try again.');
      }
    };

    return (
      <div className='main-c sign'>
        <Navbar isLoggedIn={isLoggedIn}/>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <label>
            
            <input
              placeholder='email'
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              //required
            />
          </label>
          <label>
            
            <input
              placeholder='password'
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              //required
            />
          </label>
          <button >Sign In</button>
        </form>
        <Link to="/problem">i have some issues</Link>
        <Footer />
      </div>
    );
  };
  
  export default SignIn;