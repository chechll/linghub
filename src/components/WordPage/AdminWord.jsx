import React, {useEffect, useState} from 'react';
import axios from 'axios';
import '../../CSS/index.css';
import { toast } from 'react-toastify';
import WordCreate from './WordCreate';
import WordUpdate from './WordUpdate';

const AdminWord = ({ isLoggedIn, onLoginChange, operatingData }) => {
    const [wordsData, setWordsData] = useState([]); // Change variable name to avoid conflicts
    const [isEditing, setEditing] = useState(false);
    const [isCreating, setCreating] = useState(false);
    const [choosedWord, setChoosedWord] = useState({});

    const fetchWords = async () => {
        try {
            const response = await axios.get('https://localhost:7298/api/Word/GetAllWords');
            setWordsData(response.data); // Update the state with the fetched data
        } catch (error) {
            console.error('Error fetching word:', error);
        }
    };

    useEffect(() => {
        if (operatingData.idUser === 0 || operatingData.idUser === undefined) {
            onLoginChange(operatingData.idUser);
        }

        fetchWords();
    }, [operatingData.idUser]);

    const handleDelete = async (idWord) => {
        const isConfirmed = window.confirm('Are you sure?');
        if (isConfirmed) {
            try {
                const response = await axios.delete('https://localhost:7298/api/Word/DeleteWord', {
                    params: {
                        idWord: idWord,
                    },
                });
                console.log('Deleted successfully');
                toast.success('Deleted successfully');
                setWordsData((prevWords) => prevWords.filter((word) => word.idWord !== idWord));
            } catch (error) {
                console.error('Error during delete:', error);
                toast.error('Error during delete');
            }
        }
    };

    const handleEdit = (word) => {
        console.log('Im in handle edit');
        setEditing(!isEditing);
        setChoosedWord(word);
    };

    const handleCreate = () => {
        setCreating(!isCreating);
    };

    return (
        <div>
            {!isEditing && !isCreating && (
                <>
                    <h2>All Words</h2>
                    <ul className="item-list">
                        {wordsData.map((word) => (
                            <li key={word.idWord} className="item">
                                <strong>UAWord:</strong> {word.uaword}
                                <strong>EnWord:</strong> {word.enword}
                                <div className="user-buttons">
                                    <button className="button" onClick={() => handleEdit(word)}>
                                        Update
                                    </button>
                                    <button className="button" onClick={() => handleDelete(word.idWord)}>
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <button className="button" onClick={() => handleCreate()}>Create</button>
                </>
            )}
            {isEditing && !isCreating && (
                <WordUpdate handleEdit={handleEdit} choosedWord={choosedWord} setChoosedWord={setChoosedWord} />
            )}
            {isCreating && !isEditing && <WordCreate handleCreate={handleCreate} fetchWords={fetchWords}/>}
        </div>
    );
};

export default AdminWord;