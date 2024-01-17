import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { toast } from 'react-toastify';
import { Link, useNavigate} from 'react-router-dom';

function User({ isLoggedIn, onLoginChange, idUser}) {

  const [userData, setUserData] = useState({
      photo: '../assets/userPhoto.jpg',
      name: '',
      surname: '',
      email: '',
      userPassword: '',
      idUser: idUser,
  });

  const [isEditing, setEditing] = useState(false);
    
    useEffect(() => {
        if (idUser == 0) {
            onLoginChange(idUser);
        }
        const fetchUserData = async () => {
            try {
                const response = await axios.get('https://localhost:7298/api/User/GetUser' ,
                {
                    params: {
                      id: idUser,
                    },
                });
                const user = response.data; 
                setUserData({
                    name: user.name,
                    surname: user.surname,
                    email: user.email,
                    userPassword: user.userPassword,
                    idUser: idUser,
                    photo: user.photo !== null ? user.photo : '../assets/userPhoto.jpg',
                });
            } catch (error) {
                console.error('Error fetching user data:', error);
                toast.error('Error fetching user data');
            }
        };

        fetchUserData();
    }, []);

    const handleDelete = async (e) => {
        e.preventDefault();
    
        const isConfirmed = window.confirm("Are you sure you want to delete your account?");

        if (isConfirmed) {
            try {
                const response = await axios.delete('https://localhost:7298/api/User/Delete', {
                    params: {
                        userId: idUser,
                    },
                });
                console.log('Deleted successfully');
                onLoginChange(response.data);
            } catch (error) {
                console.error('Error during delete:', error);
                toast.error('Error during delete');
            }
        } else {
            console.log('User chose not to delete the account.');
        }
      };

      const handleUpdate = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.put(`https://localhost:7298/api/User/Update?userId=${idUser}`, userData);
        
            console.log('User updated successfully:', response.data);
        } catch (error) {
            console.error('Error during update:', error);
            toast.error('Error during update');
        }
        setEditing(false);
    };

      const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({ ...prevData, [name]: value, id_user: idUser }));
      };

      const handleEdit = () => {
        setEditing(true);
      };

    const handleLogout = () => {
        onLoginChange();
    };

    return (
        <div>
          <Navbar isLoggedIn={isLoggedIn} />
    
          <div className='main-c'>
            <h2>User Information</h2>
    
            {!isEditing ? (
              <>
                <div>
                  <img src={userData.photo} alt="Profile" className="profile-photo" />
                </div>
                <div>
                  <strong>Name:</strong> <p>{userData.name}</p>
                </div>
                <div>
                  <strong>Surname:</strong> <p>{userData.surname}</p>
                </div>
                <div>
                  <strong>Email:</strong> <p>{userData.email}</p>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label>
                    <strong>Name:  </strong>{' '}
                    <input type="text" name="name" value={userData.name} onChange={handleChange} />
                  </label>
                </div>
                <div>
                  <label>
                    <strong>Surname: </strong>{' '}
                    <input type="text" name="surname" value={userData.surname} onChange={handleChange} />
                  </label>
                </div>
                <div>
                  <label>
                    <strong>Email:   </strong>{' '}
                    <input type="text" name="email" value={userData.email} onChange={handleChange} />
                  </label>
                </div>
                <div>
                  <label>
                    <strong>Password:</strong>{' '}
                    <input type="password" name="password" value={userData.userPassword} onChange={handleChange} />
                  </label>
                </div>
              </>
            )}
    
            <div className="user-actions">
              <ul>
                {!isEditing ? (
                  <>
                    <li>
                      <button onClick={handleEdit}>Update</button>
                    </li>
                    <li>
                      <button onClick={handleDelete}>Delete</button>
                    </li>
                    <li>
                        <button onClick={handleLogout}>Log Out</button>
                    </li>
                  </>
                ) : (
                  <li>
                    <button onClick={handleUpdate}>Update</button>
                  </li>
                )}
              </ul>
              <Link to="/problem">i have some issues</Link>
            </div>
          </div>
          <Footer />
        </div>
      );
}

export default User;