import React, { useState, useEffect } from 'react';
import '../CSS/index.css';
import axios from 'axios';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const SignUp = ({ isLoggedIn, onLoginChange, operatingData , setOperatingData}) => {
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

      setOperatingData({
        idUser: response.data.idUser,
        isAdmin: response.data.isAdmin,
      });

      toast.success('Successfuly, created');

      try {

        const resp = await axios.post(`https://localhost:7298/api/Calendar/AddDate?idUser=${operatingData.idUser}`);

      } catch (error) {
        console.error('Error during saving date', error);
        toast.error('Error during saving date');
      }

      

      onLoginChange(operatingData.idUser);
  } catch (error) {
    if (error.response && error.response.status === 422) {
      console.error('Validation Error:', error.response.data);
      const errorMessages = error.response.data[''].errors;
      console.log('Error Messages:', errorMessages);
      toast.error('Error Messages:', errorMessages);
    } else {
      console.error('Error:', error.message);
      toString.error('error',error);
    }
  }
    setFormData({
      name: '',
      surname: '',
      email: '',
      userPassword: '',
    });
  };

  return (
    <div className='main-c'>
      <Navbar isLoggedIn={isLoggedIn} operatingData={operatingData}/> 
      <div className='main-b'>
      <h1>Sign Up</h1>
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
        <button className="button" type="submit">Sign Up</button>
      </form>
      <Link to="/problem" className="link">i have some issues</Link>   
      </div> 
      <Footer/>
    </div>
  );
};

export default SignUp