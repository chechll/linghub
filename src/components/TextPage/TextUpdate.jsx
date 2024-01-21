import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const TextUpdate = ( {handleEdit, choosedText, setChoosedText} ) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setChoosedText((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    try {
      const formData = new FormData();
      formData.append('IdText', choosedText.idText);
      formData.append('Text1', choosedText.text1);
      formData.append('TextName', choosedText.textName);
      formData.append('Ans', choosedText.ans);
      formData.append('Ans1', choosedText.ans1);
      formData.append('Ans2', choosedText.ans2);
      formData.append('Ans3', choosedText.ans3);
      formData.append('Question', choosedText.question);
      formData.append('IdAns', choosedText.idAns);
    
      console.log('Updating');
      console.log('Question is', choosedText.question);

      const response = await axios.put('https://localhost:7298/api/Text/UpdateText', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    
      console.log('Text updated successfully:', response.data);
      toast.success('Text updated successfully:', response.data);
      handleEdit(choosedText);
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
  };

  return (
    <div className='main-b'>
      <h2>Text Info</h2>
          <div>
            <label>
              <strong>Name: </strong>
              <input type="text" name="textName" value={choosedText.textName} onChange={handleChange} />
            </label>
          </div>
          <div>
            <label>
              <strong>Text: </strong>
              <input type="text" name="text1" value={choosedText.text1} onChange={handleChange} />
            </label>
          </div>
          <div>
            <label>
              <strong>Question: </strong>
              <input type="text" name="question" value={choosedText.question} onChange={handleChange} />
            </label>
          </div>
          <div>
            <label>
              <strong>Ans1:</strong>
              <input type="text" name="ans" value={choosedText.ans} onChange={handleChange} />
            </label>
          </div>
          <div>
            <label>
              <strong>Ans2:</strong>
              <input type="text" name="ans1" value={choosedText.ans1} onChange={handleChange} />
            </label>
          </div>
          <div>
            <label>
              <strong>Ans3:</strong>
              <input type="text" name="ans2" value={choosedText.ans2} onChange={handleChange} />
            </label>
          </div>
          <div>
            <label>
              <strong>Ans4:</strong>
              <input type="text" name="ans3" value={choosedText.ans3} onChange={handleChange} />
            </label>
          </div>
          <div>
            <label>
              <strong>IdAns:</strong>
              <input type="number" name="idAns" value={choosedText.idAns} onChange={handleChange} />
            </label>
          </div>
          <div className="user-actions">
            <ul className="user-buttons">
              <li><button className="button" onClick={handleUpdate}>Update</button></li>
              <li><button className="button" onClick={() => handleEdit(choosedText)}>Back</button></li>
            </ul> 
          </div> 
    </div>
  );
};
  
export default TextUpdate;