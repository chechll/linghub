import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import ShowUser from '../components/UserPage/ShowUser';
import UserUpdate from '../components/UserPage/UserUpdate';
import { toast } from 'react-toastify';

function User({ isLoggedIn, onLoginChange, operatingData }) {
  const [userData, setUserData] = useState({
    name: '',
    surname: '',
    email: '',
    userPassword: '',
    idUser: operatingData.idUser,
    photo: '',
    isAdmin: 0,
  });

  const [isEditing, setEditing] = useState(false);
  const [prevEditing, setPrevEditing] = useState(false);

  useEffect(() => {
    if (operatingData.idUser === 0 || operatingData.idUser === undefined) {
      onLoginChange(operatingData.idUser);
    }

    if (prevEditing === isEditing) {

      const fetchUserData = async () => {
        try {
          const response = await axios.get('https://localhost:7298/api/User/GetUser', {
            params: {
              id: operatingData.idUser,
            },
          });

          const user = response.data;

          let photoUrl;
          if (user.photo != null && user.photo !== '') {
            const binaryString = atob(user.photo);
            const byteArray = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
              byteArray[i] = binaryString.charCodeAt(i);
            }
            const blob = new Blob([byteArray], { type: 'image/jpeg' });
            photoUrl = URL.createObjectURL(blob);
          } else {
            photoUrl = 'src/assets/userPhoto.jpg';
          }

          setUserData({
            name: user.name,
            surname: user.surname,
            email: user.email,
            idUser: operatingData.idUser,
            isAdmin: operatingData.isAdmin,
            photo: photoUrl,
          });
        } catch (error) {
          console.error('Error fetching user data:', error);
          toast.error('Error fetching user data');
        }
      };

      fetchUserData();
    }
  }, [operatingData.idUser, isEditing]);

  const handleEdit = () => {
    setEditing(!isEditing);
  };

  return (
    <div className="main-c">
      <Navbar isLoggedIn={isLoggedIn} operatingData={operatingData} />

      {operatingData.isAdmin !== 1 ? (
        !isEditing ? (
          <ShowUser handleEdit={handleEdit} userData={userData} onLoginChange={onLoginChange} />
        ) : (
          <UserUpdate handleEdit={handleEdit} userData={userData} setUserData={setUserData} />
        )
      ) : (
        <ShowUser handleEdit={handleEdit} userData={userData} onLoginChange={onLoginChange} />
      )}
      <Footer />
    </div>
  );
}

export default User;