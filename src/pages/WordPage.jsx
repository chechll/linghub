import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { toast } from 'react-toastify';

function WordPage({ isLoggedIn, onLoginChange, idUser}) {
    const [wordData, setWordData] = useState({
        idWord: 0,
        enword: '',
        uaword: '',
        ensent: '',
        uasent: '',
    });

    useEffect(() => {
        if (idUser == 0) {
          onLoginChange(idUser);
        }

        const fetchWordData = async () => {
            try {
                const response = await axios.get('https://localhost:7298/api/Word/GetWord' ,
                {
                    params: {
                      idUser: idUser,
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
                console.error('Error fetching word data:', error);
                toast.error('Error fetching word data');
            }
        };

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
            toast.success('Correct answer!');

            console.log( idUser, "  ", wordData.idWord);

            const saveAnsData = async () => {
                try {
                    const response = await axios.post('https://localhost:7298/api/UWord/AddSolvedWord' ,
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

    return (
        <div>
            <Navbar isLoggedIn={isLoggedIn}/>

            <div className='main-c'>
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
                            <button>Check</button>
                        </form>
             </section>

            </div>

            <Footer />
        </div>
        
    )
}

export default WordPage;