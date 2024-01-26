import React, { useEffect, useState } from 'react';
import '../../CSS/index.css';
import axios from 'axios';
import { toast } from 'react-toastify';

function HomeAdmin ({onLoginChange, operatingData}) {
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (operatingData.idUser === 0 || operatingData.idUser === undefined) {
            onLoginChange(operatingData.idUser);
          }

        console.log(operatingData.idUser,' ',operatingData.isAdmin);

        const fetchErrors = async () => {
            try {
                const response = await axios.get('https://localhost:7298/api/Error/GetAllErrors');
                setErrors(response.data);
            } catch (error) {
                console.error('Error fetching errors:', error);
            }
        };

        fetchErrors();
    }, []);


    const handleDelete = async (idError) => {
    
        const isConfirmed = window.confirm('Are you sure?');

        console.log(idError);
    
        if (isConfirmed) {
          try {
            const response = await axios.delete('https://localhost:7298/api/Error/ErrorDelete', {
              params: {
                errorId: idError,
              },
            });
            console.log('Deleted successfully');
            toast.success('Deleted successfully');
            setErrors((prevErrors) => prevErrors.filter((error) => error.id !== idError));
          } catch (error) {
            console.error('Error during delete:', error);
            toast.error('Error during delete');
          }
        }
    }

    return (
        <div>
            <h1>All Errors</h1>
            <hr className='hr-style'/>
            <ul className="item-list">
            {errors.map((error) => (
                <li key={error.id} className="item">
                <strong>Email:</strong> {error.email} , <strong>Description:</strong> {error.description}
                <button className="button" onClick={() => handleDelete(error.id)}>
                    Delete
                </button>
                </li>
            ))}
            </ul>
        </div>
    );
}

export default HomeAdmin;