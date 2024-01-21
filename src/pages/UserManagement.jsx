import React, {useEffect, useState} from 'react';
import axios from 'axios';
import '../CSS/index.css';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { toast } from 'react-toastify';

const UserManager = ( { isLoggedIn, onLoginChange, operatingData} ) => {
  const [user, setUsers] = useState([]);
  const [isEditing, setEditing] = useState(false);
  const [choosedUser, setChoosedUser] = useState({});
  const [prevEditing, setPrevEditing] = useState(isEditing);

  useEffect(() => {
    if (operatingData.idUser === 0 || operatingData.idUser === undefined) {
      onLoginChange(operatingData.idUser);
    }
    console.log('Im he');
    console.log('PrevEd = ',prevEditing,' isEd = ',isEditing);
    if( prevEditing === isEditing) {
      console.log('Im here');
      const fetchUsers = async () => {
        try {
            const response = await axios.get('https://localhost:7298/api/User/GetAllUsers');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    fetchUsers();
    }
  }, [operatingData.idUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChoosedUser((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDelete = async (idUser) => {
  
      const isConfirmed = window.confirm('Are you sure?');
  
      if (isConfirmed) {
        try {
          const response = await axios.delete('https://localhost:7298/api/User/UserDelete', {
            params: {
              idUser: idUser,
            },
          });
          console.log('Deleted successfully');
          setUsers((prevUsers) => prevUsers.filter((user) => user.id !== idUser));
        } catch (error) {
          console.error('Error during delete:', error);
          toast.error('Error during delete');
        }
      }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    try {
      const formData = new FormData();
      formData.append('idUser', choosedUser.idUser);
      formData.append('name', choosedUser.name);
      formData.append('surname', choosedUser.surname);
      formData.append('email', choosedUser.email);
      formData.append('userPassword', choosedUser.userPassword);
      formData.append('Admin', choosedUser.Admin);
    
      console.log('Updating');

      const response = await axios.put('https://localhost:7298/api/User/Update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    
      console.log('User updated successfully:', response.data);
      toast.success('User updated successfully:', response.data);
    } catch (error) {
    console.error('Error during update:', error);
    toast.error('Error during update');
    }
    
    handleEdit(choosedUser);
  };

  const handleEdit = (user) => {
    console.log('Im in handle edit');
    setEditing(!isEditing);
    setChoosedUser(user);
  };

  return (
    <div className='main-c'>
      <Navbar isLoggedIn={isLoggedIn} operatingData={operatingData}/>
      {!isEditing ? (
        <>          
          <h2>All Users</h2>
          <ul className="item-list">
          {user.map((user) => (
              <li key={user.id} className="item">
              <strong>Email:</strong> {user.email}
              <div className="user-buttons">
                <button className="button" onClick={() => handleEdit(user)}>
                    Update
                </button>
                <button className="button" onClick={() => handleDelete(user.id)}>
                    Delete
                </button>
              </div>
              </li>
          ))}
          </ul>
        </>
      ) : (
        <>
          <div>
            <label>
              <strong>Name: </strong>
              <input type="text" name="name" value={choosedUser.name} onChange={handleChange} />
            </label>
          </div>
          <div>
            <label>
              <strong>Surname: </strong>
              <input type="text" name="surname" value={choosedUser.surname} onChange={handleChange} />
            </label>
          </div>
          <div>
            <label>
              <strong>Email: </strong>
              <input type="text" name="email" value={choosedUser.email} onChange={handleChange} />
            </label>
          </div>
          <div>
            <label>
              <strong>isAdmin:</strong>
              <input type="number" name="Admin" value={choosedUser.Admin} onChange={handleChange} />
            </label>
          </div>
          <div className="user-actions">
            <ul>
              <li><button className="button" onClick={handleUpdate}>Update</button></li>
              <li><button className="button" onClick={() => handleEdit(choosedUser)}>Back</button></li>
            </ul> 
          </div> 
        </>
      )}  
      <Footer/>  
    </div>
  );
};
  
export default UserManager;