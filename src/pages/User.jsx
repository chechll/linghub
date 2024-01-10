import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

function User({ isLoggedIn, onLoginChange }) {

    const [userData, setUserData] = useState({
        name: '',
        surname: '',
        email: '',
    });
    
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('https://localhost:7298/api/User/GetUser' ,
                {
                    params: {
                      token: localStorage.getItem('token'),
                    },
                });
                const user = response.data; 
                setUserData({
                    name: user.Name,
                    surname: user.Surname,
                    email: user.Email,
                });
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);


    const handleLogout = () => {
        localStorage.removeItem('token');

        onLoginChange();
    };

    return (
        <div>
            <Navbar isLoggedIn={isLoggedIn}/>

            <div className='main-c'>

            <h2>User Information</h2>
                <div>
                    <strong>Name:</strong> <p></p>
                </div>
                <div>
                    <strong>Surname:</strong> <p></p>
                </div>
                <div>
                    <strong>Email:</strong> <p></p>
                </div>
                <div className="user-actions">
                <ul>
                    <li><button>Change</button></li>
                    <li><button>Delete</button></li>
                    <li><button onClick={handleLogout}>Log Out</button></li>
                </ul>    
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default User;