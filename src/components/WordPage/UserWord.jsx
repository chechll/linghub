import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function UserWord({ isLoggedIn, onLoginChange, operatingData}) {
    const [wordData, setWordData] = useState({
        idWord: 0,
        enword: '',
        uaword: '',
        ensent: '',
        uasent: '',
    });

    const [isThereAnyNewWord, setIsThereAnyNewWord] = useState(true); 

    const fetchWordData = async () => {
        try {
            const response = await axios.get('https://localhost:7298/api/Word/GetWord' ,
            {
                params: {
                  idUser: operatingData.idUser,
                },
            });
            const words = response.data; 
            setWordData({
                idWord: words.idWord,
                enword: words.enword,
                uaword: words.uaword,
                ensent: words.ensent,
                uasent: words.uasent,
            });
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setIsThereAnyNewWord(false);
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

        fetchWordData();
    }, []);

    const [word, setWord] = useState('');

    const handleChange = (e) => {
        const { value } = e.target;
        setWord(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (word == wordData.uaword) {

            const saveAnsData = async () => {
                try {
                    const response = await axios.post('https://localhost:7298/api/UWord/AddSolvedWord' ,
                    {
                        idUser: operatingData.idUser,
                        idWord: wordData.idWord,
                    });
                    toast.success('Correct answer');

                    setWord('');
                    fetchWordData();
                } catch (error) {
                    if (error.response && error.response.status === 422) {
                        console.error('Validation Error:', error.response.data);
                        const errorMessages = error.response.data[''].errors;
                        console.log('Error Messages:', errorMessages);
                        toast.error('Error Messages:', errorMessages);
                      } else {
                        console.error('Error:', error.message);
                        toString.error('error',error);
                      }
                }
            };
    
            saveAnsData();

          } else {
            toast.error('Incorrect answer. Please try again.');
          }
    };

    return (
        <div>
            
            {isThereAnyNewWord ? (
                <>
                <section>
                        <p>
                            {wordData.uasent}
                        </p>
                </section>

                <section>
                        <p>
                            {wordData.enword}
                        </p>
                </section>

                <section>
                        <p>
                            {wordData.ensent}
                        </p>
                </section>

                <section>
                            <form onSubmit={handleSubmit}>
                                <label>
                                    <input
                                    placeholder='word'
                                    type="text"
                                    name="word"
                                    value={word}
                                    onChange={handleChange}
                                    />
                                </label>
                                <button className="button">Check</button>
                            </form>
                </section>
                </>
            ) : (
                <p>
                    Good work! You've already knew all words on this page. Wait until we will add some new.
                </p>
            )}
            
        </div>
        
    )
}

export default UserWord;