import React, { useEffect, useState } from 'react';
import '../../CSS/index.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

function HomeUser({ onLoginChange, operatingData }) {
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
        if (operatingData.idUser === 0) {
            onLoginChange(operatingData.idUser);
        }
        const fetchData = async () => {
            try {
                const [calendarResponse, wordResponse, textResponse] = await Promise.all([
                    axios.get(`https://localhost:7298/api/Calendar/Appointments`, {
                        params: {
                            idUser: operatingData.idUser,
                        },
                    }),
                    axios.get('https://localhost:7298/api/Word/GetCount', {
                        params: {
                            idUser: operatingData.idUser,
                        },
                    }),
                    axios.get('https://localhost:7298/api/Text/GetCount', {
                        params: {
                            idUser: operatingData.idUser,
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
    }, [operatingData.idUser, onLoginChange]);

    const calculateProgress = (solved, total) => {
        const percentage = total === 0 ? 0 : (solved / total) * 100;
        return Math.floor(percentage);
    };

    return (
        <div className="main-b">

            
            <section className="home-user-section">
                <p>
                    You have visited us this week:</p>
                <div className="icon-line">
                    {appointmentsData.values.map((count, index) => (
                        <div key={index} className="icon-item">
                            {count > 0 ? (
                                <FontAwesomeIcon icon={faCheckCircle} color="#21209C" />
                            ) : (
                                <FontAwesomeIcon icon={faTimesCircle} color="#21209C" />
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
            <div className='wel-sections'>
            <section className="home-user-section">
                <p>
                    Your progress in words is {countWords.solvedWords}/{countWords.allWords}
                </p>
                <p>
                    <progress className="progress-bar" value={countWords.solvedWords} max={countWords.allWords}> </progress> {calculateProgress(countWords.solvedWords, countWords.allWords)}%
                </p>
            </section>

            <section className="home-user-section">
                <p>
                    Your progress in texts is {countTexts.solvedTexts}/{countTexts.allTexts}
                </p>
                <p>
                    <progress className="progress-bar" value={countTexts.solvedTexts} max={countTexts.allTexts}></progress> {calculateProgress(countTexts.solvedTexts, countTexts.allTexts)}%
                </p>
            </section>
            </div>
        </div>

    )
}

export default HomeUser;