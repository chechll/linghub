import React, {useEffect, useState} from 'react';
import axios from 'axios';
import '../CSS/Sign.css';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const SignIn = ( { isLoggedIn, onLoginChange} ) => {
    const [formData, setFormData] = useState({
      email: '',
      password: '',
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      axios.post('https://your-csharp-backend/api/signin', formData)
        .then(response => {
          const token = response.data.token;
          onLoginChange();
        })
        .catch(error => console.error('Error during sign in:', error));
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
        <Footer />
      </div>
    );
  };
  
  export default SignIn;