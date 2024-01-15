import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { toast } from 'react-toastify';

function TextPage({ isLoggedIn, onLoginChange, idUser}) {

    const [selectedOption, setSelectedOption] = useState(0);

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

            console.log( idUser, "  ", textData.idText);

            const saveAnsData = async () => {
                try {
                    const response = await axios.post('https://localhost:7298/api/Utext/AddSolvedText' ,
                    {
                        params: {
                          idUser: idUser,
                          idText: textData.idText,
                        },
                    });
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

    useEffect(() => {
        if (idUser == 0) {
            onLoginChange(idUser);
        }
        const fetchTextData = async () => {
            try {
                const response = await axios.get('https://localhost:7298/api/Text/GetText' ,
                {
                    params: {
                      idUser: idUser,
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
                console.error('Error fetching user data:', error);
                toast.error('Error fetching text data');
            }
        };

        fetchTextData();
    }, []);

    

    return (
        <div>
            <div className="main-body">

                <Navbar isLoggedIn={isLoggedIn}/>
                
                <div className="main-c">

                    <h2>{textData.textName}</h2>

                    <section>
                        <p>
                            {textData.text1}
                        </p>
                    </section>

                    <section>
                        <h3>{textData.question}</h3>
                    </section>

                    <section>
                    <form onSubmit={handleSubmit}>
                        <label>
                            <input
                                type="radio"
                                name="option1"
                                value= {1}
                                checked={selectedOption === 1}
                                onChange={handleOptionChange}
                            />
                            {textData.ans}
                        </label>

                        <label>
                            <input
                                type="radio"
                                name="option2"
                                value={2}
                                checked={selectedOption === 2}
                                onChange={handleOptionChange}
                            />
                            {textData.ans1}
                        </label>

                        <label>
                            <input
                                type="radio"
                                name="option3"
                                value={3}
                                checked={selectedOption === 3}
                                onChange={handleOptionChange}
                            />
                            {textData.ans2}
                        </label>

                        <label>
                            <input
                                type="radio"
                                name="option4"
                                value={4}
                                checked={selectedOption === 4}
                                onChange={handleOptionChange}
                            />
                            {textData.ans3}
                        </label>

                        <button type="submit">Submit</button>
                    </form>  
                    </section>       
                </div>

                <Footer/> 

            </div>
        </div>
        
    )
}

export default TextPage;