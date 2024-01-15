import React, {useEffect, useState} from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../CSS/index.css';
import { toast } from 'react-toastify';
import axios from 'axios';

function Home( { isLoggedIn, onLoginChange, idUser }) {
    const [countWords, setCountWords] = useState({
        solvedWords: 0,
        allWords: 0,
    });

    const [countTexts, setCountTexts] = useState({
        solvedTexts: 0,
        allTexts: 0,
    });

    useEffect(() => {
        if (idUser == 0) {
          onLoginChange(idUser);
        }

        const fetchWordData = async () => {
            try {
                const response = await axios.get('https://localhost:7298/api/Word/GetCount' ,
                {
                    params: {
                      idUser: idUser,
                    },
                });
                const words = response.data; 
                setCountWords({
                    solvedWords: words.solvedWords,
                    allWords: words.allWords,
                });
            } catch (error) {
                console.error('Error fetching lword data:', error);
                toast.error('Error fetching lword data');
            }
        };

        const fetchTextData = async () => {
            try {
                const response = await axios.get('https://localhost:7298/api/Text/GetCount' ,
                {
                    params: {
                      idUser: idUser,
                    },
                });
                const texts = response.data; 
                setCountTexts({
                    solvedTexts: texts.solvedTexts,
                    allTexts: texts.allTexts,
                });
            } catch (error) {
                console.error('Error fetching aword data:', error);
                toast.error('Error fetching aword data');
            }
        };

        fetchWordData();
        fetchTextData();
      }, []);

      const calculateProgress = (solved, total) => {
        const percentage = total === 0 ? 0 : (solved / total) * 100;
        return Math.floor(percentage);
      };

    return (
        <div>
            <div className="main-body">

                <Navbar isLoggedIn={isLoggedIn}/>
                
                <div className="main-c">

                    <h2>Title</h2>

                    <section>
                        <p>
                            Your proggres in words is {countWords.solvedWords}/{countWords.allWords}    
                        </p>
                        <p>
                            <progress value={countWords.solvedWords} max={countWords.allWords}> </progress> {calculateProgress(countWords.solvedWords, countWords.allWords)}%
                        </p>
                    </section>

                    <section>
                        <p>
                            Your proggres in texts is {countTexts.solvedTexts}/{countTexts.allTexts}    
                        </p>
                        <p>
                            <progress value={countTexts.solvedTexts} max={countTexts.allTexts}></progress> {calculateProgress(countTexts.solvedTexts, countTexts.allTexts)}%
                        </p>
                    </section>

                    <section>
                        <p>
                            Your proggres in words is {countWords.solvedWords}/{countWords.allWords}   
                        </p>
                    </section>
     
                </div>

                <Footer/> 

            </div>
        </div>
    )
}

export default Home;