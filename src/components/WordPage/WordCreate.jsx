import React, { useState, useEffect } from 'react';
import '../../CSS/Sign.css';
import '../../CSS/index.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const WordCreate = ({ handleCreate , fetchWords}) => {
  const [formData, setFormData] = useState({
    enword: '',
    uaword: '',
    ensent: '',
    uasent: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://localhost:7298/api/Word/CreateWord', formData);
      toast.success('word was created successfully');
      setFormData({
        enword: '',
        uaword: '',
        ensent: '',
        uasent: '',
    });

    handleCreate();
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
      toString.error('error',error);
    }
  }
    

    await fetchWords();
  };

  return (
      <div>
      <h1 className='signUp'>New Word</h1>
      <form onSubmit={handleSubmit}>
        <label>
          
          <input
            placeholder='EnWord: '
            type="text"
            name="enword"
            value={formData.enword}
            onChange={handleChange}
            required
          />            
        </label>
        <label>
          
          <input
            placeholder='uaword'
            type="text"
            name="uaword"
            value={formData.uaword}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          <input
            placeholder='ensent'
            type="text"
            name="ensent"
            value={formData.ensent}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          
          <input
            placeholder='uasent'
            type="text"
            name="uasent"
            value={formData.uasent}
            onChange={handleChange}
            required
          />
        </label>
        <div  className="user-actions">
            <ul>
                <li><button className="button" type="submit">Create</button></li>
                <li><button className="button" onClick={() => handleCreate()}>Back</button></li>
            </ul>
        </div>
      </form>

      </div>  
  );
};

export default WordCreate