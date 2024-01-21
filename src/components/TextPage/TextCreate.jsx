import React, { useState, useEffect } from 'react';
import '../../CSS/index.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const TextCreate = ({ handleCreate , fetchTexts}) => {
  const [formData, setFormData] = useState({
    text1: '',
    textName: '',
    ans: '',
    ans1: '',
    ans2: '',
    ans3: '',
    question: '',
    idAns: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://localhost:7298/api/Text/CreateText', formData);
      toast.success('Created successfully');
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

    await fetchTexts();
  };

  return (
      <div className='main-b'>
      <h1>New Text</h1>
      <form onSubmit={handleSubmit}>
        <label>
          
          <textarea
            placeholder='text '
            type="text"
            name="text1"
            value={formData.text1}
            onChange={handleChange}
            style={{ fontSize: '16px', minHeight: '100px'}}
            required
          />            
        </label>
        <label>
          
          <input
            placeholder='Name'
            type="text"
            name="textName"
            value={formData.textName}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          <input
            placeholder='ans1'
            type="text"
            name="ans"
            value={formData.ans}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          <input
            placeholder='ans2'
            type="text"
            name="ans1"
            value={formData.ans1}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          <input
            placeholder='ans3'
            type="text"
            name="ans2"
            value={formData.ans2}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          <input
            placeholder='ans4'
            type="text"
            name="ans3"
            value={formData.ans3}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          <input
            placeholder='Question'
            type="text"
            name="question"
            value={formData.question}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          <input
            placeholder='idAns'
            type="number"
            name="idAns"
            value={formData.idAns}
            onChange={handleChange}
            required
          />
        </label>
        <div  className="user-actions">
            <ul className="user-buttons">
                <li><button className="button" type="submit">Update</button></li>
                <li><button className="button" onClick={() => handleCreate()}>Back</button></li>
            </ul>
        </div>
      </form>

      </div>  
  );
};

export default TextCreate