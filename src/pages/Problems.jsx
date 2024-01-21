import React, {useEffect, useState} from 'react';
import axios from 'axios';
import '../CSS/Sign.css';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { toast } from 'react-toastify';

const Problems = ( { isLoggedIn, operatingData} ) => {
    const [formData, setFormData] = useState({
      email: '',
      description: '',
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
  
    useEffect(() => {
        if (operatingData.idUser != 0) {
            const fetchUserData = async () => {
                try {
                    const response = await axios.get('https://localhost:7298/api/User/GetUser' ,
                    {
                        params: {
                        id: operatingData.idUser,
                        },
                    });
                    const user = response.data; 
                    setFormData({
                        email: user.email,
                    });
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    toast.error('Error fetching user data');
                }
            };

            fetchUserData();
        }
    }, []);

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axios.post('https://localhost:7298/api/Error/AddError', {
            email: formData.email,
            description: formData.description,
        });
        console.log('Commited successfully');
        toast.success('Commited successfully');
      } catch (error) {
        console.error('Error during commiting:', error);
        toast.error('Error during commiting');
      }
    };

    return (
      <div className='main-c sign'>
        <Navbar isLoggedIn={isLoggedIn} operatingData={operatingData}/>
        <h1>Problem</h1>
        <form onSubmit={handleSubmit}>
          <label>
            <input
              placeholder='email'
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
          <label>
            <textarea
              placeholder='description'
              name="description"
              value={formData.description}
              onChange={handleChange}
              style={{ fontSize: '16px', minHeight: '100px'}}
            />
          </label>
          <button className="button">Submit</button>
        </form>
        <Footer />
      </div>
    );
  };
  
  export default Problems;