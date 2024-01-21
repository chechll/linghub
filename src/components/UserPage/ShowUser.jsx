import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

function ShowUser ({handleEdit, userData, onLoginChange}) {
    const handleLogout = () => {
        onLoginChange();
    };

    const handleDelete = async (e) => {
        e.preventDefault();
    
        const isConfirmed = window.confirm('Are you sure you want to delete your account?');
    
        if (isConfirmed) {
          try {
            const response = await axios.delete('https://localhost:7298/api/User/Delete', {
              params: {
                userId: userData.idUser,
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

    return (
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
          <div className="user-actions">
            <ul>
              {userData.isAdmin !== 1 && (
                <>
                  <li>
                    <button className="button" onClick={handleEdit}>Update</button>
                  </li>
                  <li>
                    <button className="button" onClick={handleDelete}>Delete</button>
                  </li>
                </>
              )}
                <li>
                  <button className="button" onClick={handleLogout}>Log Out</button>
                </li>
            </ul>
            <Link to="/problem">i have some issues</Link>
          </div>
        </>
    );
}

export default ShowUser;