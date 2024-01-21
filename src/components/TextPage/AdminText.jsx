import React, {useEffect, useState} from 'react';
import axios from 'axios';
import '../../CSS/index.css';
import { toast } from 'react-toastify';
import TextCreate from './TextCreate';
import TextUpdate from './TextUpdate';

const AdminText = ( { isLoggedIn, onLoginChange, operatingData} ) => {
  const [textData, setTexts] = useState([]);
  const [isEditing, setEditing] = useState(false);
  const [isCreating, setCreating] = useState(false);
  const [choosedText, setChoosedText] = useState({});

  const fetchTexts = async () => {
    try {
        const response = await axios.get('https://localhost:7298/api/Text/GetAllTexts');
        setTexts(response.data);
    } catch (error) {
        console.error('Error fetching text:', error);
    }
  };

  useEffect(() => {
    if (operatingData.idUser === 0 || operatingData.idUser === undefined) {
      onLoginChange(operatingData.idUser);
    }
      
    fetchTexts();
    
  }, [operatingData.idUser]);

  const handleDelete = async (idText) => {
  
      const isConfirmed = window.confirm('Are you sure?');
  
      if (isConfirmed) {
        try {
          const response = await axios.delete('https://localhost:7298/api/Text/DeleteText', {
            params: {
              idText: idText,
            },
          });
          console.log('Deleted successfully');
          toast.success('Deleted successfully');
          setTexts((prevTexts) => prevTexts.filter((text) => text.idText !== idText));
        } catch (error) {
          console.error('Error during delete:', error);
          toast.error('Error during delete');
        }
      }
  };

  const handleEdit = (text) => {
    setEditing(!isEditing);
    setChoosedText(text);
  };

  const handleCreate = () => {
    setCreating(!isCreating);
};

  return (
    <div>
      {!isEditing && !isCreating && (
        <>          
          <h1>All Texts</h1>
          <button className="button" onClick={() => handleCreate()}>Create</button>
          <hr className='hr-style'/>
          
          <ul className="item-list">
          {textData.map((text) => (
              <li key={text.idText} className="item">
              <strong>Name:</strong> {text.textName}
              <div className="user-buttons">
                <button className="button" onClick={() => handleEdit(text)}>
                    Update
                </button>
                <button className="button" onClick={() => handleDelete(text.idText)}>
                    Delete
                </button>
              </div>
              </li>
          ))}
          </ul>
          
        </>
      )}
      { isEditing && !isCreating && (
        <TextUpdate handleEdit={handleEdit} choosedText={choosedText} setChoosedText={setChoosedText}/>
      )}    
      {isCreating && !isEditing && (
        <TextCreate handleCreate={handleCreate} fetchTexts={fetchTexts}/>
      )}
    </div>
  );
};
  
export default AdminText;