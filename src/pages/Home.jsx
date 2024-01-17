import React, {useEffect, useState} from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../CSS/index.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

function Home( { isLoggedIn, onLoginChange, idUser }) {
    const [countWords, setCountWords] = useState({
        solvedWords: 0,
        allWords: 0,
    });

    const [countTexts, setCountTexts] = useState({
        solvedTexts: 0,
        allTexts: 0,
    });

    const [appointmentsData, setAppointmentsData] = useState({
        days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        values: [0, 0, 0, 0, 0, 0, 0], 
      });


    useEffect(() => {
        if (idUser === 0) {
          onLoginChange(idUser);
        }
        const fetchData = async () => {
            try {
                const [calendarResponse, wordResponse, textResponse] = await Promise.all([
                    axios.get(`https://localhost:7298/api/Calendar/Appointments`, {
                        params: {
                            idUser: idUser,
                        },
                    }),
                    axios.get('https://localhost:7298/api/Word/GetCount', {
                        params: {
                            idUser: idUser,
                        },
                    }),
                    axios.get('https://localhost:7298/api/Text/GetCount', {
                        params: {
                            idUser: idUser,
                        },
                    }),
            ]);
  
        const appointments = calendarResponse.data;
        const words = wordResponse.data;
        const texts = textResponse.data;
  
        console.log('Appointments data:', appointments);

          // Update appointmentsData
        const appointmentsDataExtended = {
           days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
           values: [0, 0, 0, 0, 0, 0, 0],
        };
  
        appointments.appointmentsCountByDay?.forEach((count, dayIndex) => {
            appointmentsDataExtended.values[dayIndex] = count;
        });
  
        setAppointmentsData(appointmentsDataExtended);
  
          // Update countWords and countTexts
        setCountWords({
            solvedWords: words.solvedWords,
            allWords: words.allWords,
        });
  
        setCountTexts({
            solvedTexts: texts.solvedTexts,
            allTexts: texts.allTexts,
        });

        } catch (error) {
          console.error('Error fetching data:', error);
          toast.error('Error fetching data');
        }
        };
  
      fetchData();
    }, [idUser, onLoginChange]);
  
    const calculateProgress = (solved, total) => {
        const percentage = total === 0 ? 0 : (solved / total) * 100;
        return Math.floor(percentage);
    };

    

    return (
        <div>
            <div className="main-body">

                <Navbar isLoggedIn={isLoggedIn}/>
                
                <div className="main-c">

                    <section>
                        <p>
                            You have visited us this week:</p>
                            <div className="icon-line">
                            {appointmentsData.values.map((count, index) => (
                                <div key={index} className="icon-item">
                                {count > 0 ? (
                                    <FontAwesomeIcon icon={faCheckCircle} color="green" />
                                ) : (
                                    <FontAwesomeIcon icon={faTimesCircle} color="red" />
                                )}
                                </div>
                            ))}
                            </div>
                            <div className="day-line">
                            {appointmentsData.days.map((day, index) => (
                                <div key={index} className="day-item">
                                {day}
                                </div>
                            ))}
                            </div>
                        
                    </section>

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
     
                </div>

                <Footer/> 

            </div>
        </div>
    )
}

export default Home;