import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function UserText({ onLoginChange, operatingData }) {

    const [selectedOption, setSelectedOption] = useState(0);

    const [isThereAnyNewText, setIsThereAnyNewText] = useState(true);

    const [textData, setTextData] = useState({
        idText: 0,
        text1: '',
        textName: '',
        ans: '',
        ans1: '',
        ans2: '',
        ans3: '',
        question: '',
        idAns: 0,
    });

    const handleOptionChange = (e) => {
        console.log("Selected option: ", e.target.value);
        setSelectedOption(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Selected option: ", selectedOption, " Corrrect option: ", textData.idAns);

        if (selectedOption == textData.idAns) {
            toast.success('Correct answer!');

            const saveAnsData = async () => {
                try {
                    const response = await axios.post('https://localhost:7298/api/Utext/AddSolvedText',
                        {

                            idUser: operatingData.idUser,
                            idText: textData.idText,
                        });

                    fetchTextData();
                } catch (error) {
                    console.error('Error saving answer data:', error);
                    toast.error('Error saving answer data');
                }
            };

            saveAnsData();

        } else {
            toast.error('Incorrect answer. Please try again.');
        }
    };

    const fetchTextData = async () => {
        try {
            const response = await axios.get('https://localhost:7298/api/Text/GetText',
                {
                    params: {
                        idUser: operatingData.idUser,
                    },
                });
            const text = response.data;
            setTextData({
                idText: text.idText,
                text1: text.text1,
                textName: text.textName,
                ans: text.ans,
                ans1: text.ans1,
                ans2: text.ans2,
                ans3: text.ans3,
                question: text.question,
                idAns: text.idAns,
            });
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setIsThereAnyNewText(false);
            } else {
                console.error('Error fetching word data:', error);
                toast.error('Error fetching word data');
            }
        }
    };

    useEffect(() => {
        if (operatingData.idUser == 0) {
            onLoginChange(operatingData.idUser);
        }

        fetchTextData();
    }, []);

    return (
        <div>
            {isThereAnyNewText ? (
                <div className='user-lis'>
                    <section className="user-section">
                    <h2>{textData.textName}</h2>
                    </section>

                    <section className="user-section">
                        <p>
                            {textData.text1}
                        </p>
                    </section >

                    <section className="user-section">
                        <h3>{textData.question}</h3>
                    </section>

                    <section className="user-section">
                        <form onSubmit={handleSubmit} className="form-container">
                            <label htmlFor="op1" className="radio-label">
                                <input
                                    type="radio"
                                    name="option1"
                                    value={1}
                                    checked={selectedOption === 1}
                                    onChange={handleOptionChange}
                                    id="op1"
                                />
                                {textData.ans}
                            </label>

                            <label htmlFor="op2" className="radio-label">
                                <input
                                    type="radio"
                                    name="option2"
                                    value={2}
                                    checked={selectedOption === 2}
                                    onChange={handleOptionChange}
                                    id="op2"
                                />
                                {textData.ans1}
                            </label>

                            <label htmlFor="op3" className="radio-label">
                                <input
                                    type="radio"
                                    name="option3"
                                    value={3}
                                    checked={selectedOption === 3}
                                    onChange={handleOptionChange}
                                    id="op3"
                                />
                                {textData.ans2}
                            </label>

                            <label htmlFor="op4" className="radio-label">
                                <input
                                    type="radio"
                                    name="option4"
                                    value={4}
                                    checked={selectedOption === 4}
                                    onChange={handleOptionChange}
                                    id="op4"
                                />
                                {textData.ans3}
                            </label>

                            <button className="button" type="submit">Submit</button>
                        </form>
                    </section>
                </div>
            ) : (
                <div className="main-cent">
                    <p>
                        Good work! You've already knew all texts on this page. Wait until we will add some new.
                    </p>
                </div>
            )}
        </div>

    )
}

export default UserText;