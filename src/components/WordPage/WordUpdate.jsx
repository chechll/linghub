import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function WordUpdate({ handleEdit, choosedWord, setChoosedWord }) {

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('IdWord', choosedWord.idWord);
      formData.append('Enword', choosedWord.enword);
      formData.append('Uaword', choosedWord.uaword);
      formData.append('Ensent', choosedWord.ensent);
      formData.append('Uasent', choosedWord.uasent);

      console.log('Updating');

      const response = await axios.put('https://localhost:7298/api/Word/UpdateWord', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Word updated successfully:', response.data);
      toast.success('Word updated successfully:', response.data);

      handleEdit(choosedWord);
    } catch (error) {
      if (error.response && error.response.status === 422) {
        const errorMessages = error.response.data[''].errors;
        console.log('Error Messages:', errorMessages);
        //toast.error('Error Messages: ', errorMessages[0]);
        errorMessages.forEach((error) => {
          toast.error(`Validation Error: ${error.errorMessage}`);
        });
      } else {
        console.error('Error:', error.message);
        toString.error('error', error);
      }
    }

  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChoosedWord((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className='main-b'>
      <h2>Word Info</h2>
      <div>
        <label>
          <strong>EnWord: </strong>
          <input type="text" name="enword" defaultValue={choosedWord.enword} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>
          <strong>UaWord: </strong>
          <input type="text" name="uaword" defaultValue={choosedWord.uaword} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>
          <strong>EnSent: </strong>
          <input type="text" name="ensent" defaultValue={choosedWord.ensent} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>
          <strong>UaSent: </strong>
          <input type="text" name="uasent" defaultValue={choosedWord.uasent} onChange={handleChange} />
        </label>
      </div>
      <div className="user-actions">
        <ul className="user-buttons">
          <li><button className="button" onClick={handleUpdate}>Update</button></li>
          <li><button className="button" onClick={() => handleEdit(choosedWord)}>Back</button></li>
        </ul>
      </div>
    </div>
  );
}

export default WordUpdate;