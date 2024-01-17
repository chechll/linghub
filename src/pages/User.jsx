import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

function User({ isLoggedIn, onLoginChange, idUser }) {
  const [userData, setUserData] = useState({
    name: '',
    surname: '',
    email: '',
    userPassword: '',
    idUser: idUser,
    photo: '',
    isAdmin: 0,
  });

  const [isEditing, setEditing] = useState(false);

  useEffect(() => {
    if (idUser === 0) {
      onLoginChange(idUser);
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get('https://localhost:7298/api/User/GetUser', {
          params: {
            id: idUser,
          },
        });

        const user = response.data;

        let photoUrl;
        if (user.photo != null && user.photo !== '') {
          // Decode the base64-encoded image
          const binaryString = atob(user.photo);
          const byteArray = new Uint8Array(binaryString.length);
          for (let i = 0; i < binaryString.length; i++) {
            byteArray[i] = binaryString.charCodeAt(i);
          }
          const blob = new Blob([byteArray], { type: 'image/jpeg' });
          photoUrl = URL.createObjectURL(blob);
        } else {
          // Default photo URL if no photo is available
          photoUrl = 'src/assets/userPhoto.jpg';
        }

        setUserData({
          name: user.name,
          surname: user.surname,
          email: user.email,
          idUser: idUser,
          photo: photoUrl,
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Error fetching user data');
      }
    };

    fetchUserData();
  }, [idUser]);

  const handleDelete = async (e) => {
    e.preventDefault();

    const isConfirmed = window.confirm('Are you sure you want to delete your account?');

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
      const formData = new FormData();
      formData.append('idUser', idUser);
      formData.append('name', userData.name);
      formData.append('surname', userData.surname);
      formData.append('email', userData.email);
      formData.append('userPassword', userData.userPassword);
      formData.append('isAdmin', userData.isAdmin);

      // Append the new photo file, if it exists
      if (userData.newPhotoFile) {
        formData.append('photo', userData.newPhotoFile);
      }

      const response = await axios.put('https://localhost:7298/api/User/Update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('User updated successfully:', response.data);
    } catch (error) {
      console.error('Error during update:', error);
      toast.error('Error during update');
    }

    setEditing(false);
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === 'file') {
      const newPhotoFile = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        const photoBase64 = reader.result.split(',')[1];
        setUserData((prevData) => ({ ...prevData, newPhotoFile, photo: `data:image/jpeg;base64,${photoBase64}` }));
      };

      if (newPhotoFile) {
        reader.readAsDataURL(newPhotoFile);
      } else {
        setUserData((prevData) => ({ ...prevData, newPhotoFile, photo: '' }));
      }
    } else {
      setUserData((prevData) => ({ ...prevData, [name]: value }));
    }
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

      <div className="main-c">
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
                <strong>New Photo:</strong>
                <input type="file" name="photo" accept="image/*" onChange={handleChange} />
              </label>
            </div>
            <div>
              <label>
                <strong>Name: </strong>
                <input type="text" name="name" value={userData.name} onChange={handleChange} />
              </label>
            </div>
            <div>
              <label>
                <strong>Surname: </strong>
                <input type="text" name="surname" value={userData.surname} onChange={handleChange} />
              </label>
            </div>
            <div>
              <label>
                <strong>Email: </strong>
                <input type="text" name="email" value={userData.email} onChange={handleChange} />
              </label>
            </div>
            <div>
              <label>
                <strong>Password:</strong>
                <input type="password" name="userPassword" value={userData.userPassword} onChange={handleChange} />
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