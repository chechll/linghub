import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

function UserUpdate({ handleEdit, userData, setUserData }) {

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('idUser', userData.idUser);
      formData.append('name', userData.name);
      formData.append('surname', userData.surname);
      formData.append('email', userData.email);
      formData.append('userPassword', userData.userPassword);
      formData.append('isAdmin', userData.isAdmin);


      if (userData.newPhotoBase64) {
        formData.append('photo', userData.newPhotoBase64);
        console.log('adding photo', userData.newPhotoBase64);
      }

      console.log('FormData:', formData);
      const response = await axios.put('https://localhost:7298/api/User/Update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('User updated successfully:', response.data);
      toast.success('Updated successfully');
    } catch (error) {
      console.error('Error during update:', error);
      toast.error('Error during update');
    }

    handleEdit();
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === 'file') {
      const newPhotoFile = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        const photoBase64 = reader.result.split(',')[1];
        setUserData((prevData) => ({ ...prevData, newPhotoFile, newPhotoBase64: photoBase64 }));
      };

      if (newPhotoFile) {
        reader.readAsDataURL(newPhotoFile);
      } else {
        setUserData((prevData) => ({ ...prevData, newPhotoFile, newPhotoBase64: '' }));
      }
    } else {
      setUserData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  return (
    <div className='main-b'>
      <h2>User Information</h2>
      <div className="update-user">

        <label>
          <strong>New Photo:</strong>
          <input type="file" name="photo" accept="image/*" onChange={handleChange} />
        </label>


        <label>
          <strong>Name: &nbsp;&nbsp; &nbsp; &nbsp; </strong>
          <input type="text" name="name" value={userData.name} onChange={handleChange} />
        </label>

        <div className='form-container'>
          <label className='form-l'>
            <strong>Surname: &nbsp;</strong>
            <input type="text" name="surname" value={userData.surname} onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>
            <strong>Email: &nbsp; &nbsp; &nbsp; </strong>
            <input type="text" name="email" value={userData.email} onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>
            <strong>Password: </strong>
            <input type="password" name="userPassword" value={userData.userPassword} onChange={handleChange} />
          </label>
        </div>
      </div>

      <div className="user-actions">
        <ul className="user-buttons">
          <li><button className="button" onClick={handleUpdate}>Update</button></li>
          <li><button className="button" onClick={handleEdit}>Back</button></li>
        </ul>
        <Link to="/problem">i have some issues</Link>
      </div>
    </div>
  );
}

export default UserUpdate;