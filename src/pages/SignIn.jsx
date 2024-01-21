import React, {useEffect, useState} from 'react';
import axios from 'axios';
import '../CSS/Sign.css';
import '../CSS/index.css';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { toast } from 'react-toastify';
import { BrowserRouter as Router, Route, Routes,Link } from 'react-router-dom';

const SignIn = ( { isLoggedIn, onLoginChange, operatingData, setOperatingData} ) => {
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
        
        const userData = {
          idUser: response.data.idUser,
          isAdmin: response.data.isAdmin,
        };

        toast.success('loged in succsessfully');
        setOperatingData(userData);

        try {

          const resp = await axios.post(`https://localhost:7298/api/Calendar/AddDate?idUser=${userData.idUser}`);

        } catch (error) {
          console.error('Error during saving date', error);
          toast.error('Error during saving date');
        }
        
      } catch (error) {
        console.error('Error during sign in:', error);
        toast.error('Error during sign-in. Please check your credentials and try again.');
      }

    };

    useEffect(() => {
      console.log('IdUser = ',operatingData.idUser,', IsAdmin = ',operatingData.isAdmin);
      if (operatingData.idUser !== 0 && operatingData.idUser !== undefined && operatingData.isAdmin !== undefined) {
        onLoginChange(operatingData.idUser);
      }
    }, [operatingData.idUser, operatingData.isAdmin]);

    return (
      <>
      <div className='main-c'>
        <Navbar isLoggedIn={isLoggedIn} operatingData={operatingData}/>
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
          <button className="button">Sign In</button>
        </form>
        <Link to="/problem" className="link">i have some issues</Link>
      </div>
      <Footer />
      </>
    );
  };
  
  export default SignIn;