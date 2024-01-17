import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import WelcomePage from './pages/WelcomePage';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import TextPage from './pages/TextPage';
import WordPage from './pages/WordPage';
import User from './pages/User';
import Problems from './pages/Problems';
import NoPage from "./pages/NoPage";
import 'react-toastify/dist/ReactToastify.css';

function App() {

    const [isLoggedIn, setLoggedIn] = useState(false);
    const [idUser, setId] = useState(0);
    const history = useNavigate();

    
    const handleLoginChange = (id) => {
        setId(id);
        setLoggedIn(!isLoggedIn);
        if(id == 0) 
        {
                setLoggedIn(false);
                history('/');
        } else {
            !isLoggedIn ? history('/home') : history('/');
        }
    };

    return (
        <>
            <Routes>
                <Route exact path="/"  element={<WelcomePage isLoggedIn={isLoggedIn} onLoginChange={handleLoginChange} idUser={idUser}/>} />
                <Route path="/home" element={<Home isLoggedIn={isLoggedIn} onLoginChange={handleLoginChange} idUser={idUser}/>} />
                <Route path="/sign_up" element={<SignUp isLoggedIn={isLoggedIn} onLoginChange={handleLoginChange} idUser={idUser}/>} />
                <Route path="/sign_in" element={<SignIn isLoggedIn={isLoggedIn} onLoginChange={handleLoginChange} idUser={idUser}/>} />
                <Route path="/text_page" element={<TextPage isLoggedIn={isLoggedIn} onLoginChange={handleLoginChange} idUser={idUser}/>} />
                <Route path="/word_page" element={<WordPage isLoggedIn={isLoggedIn} onLoginChange={handleLoginChange} idUser={idUser}/>} />
                <Route path="/user" element={<User isLoggedIn={isLoggedIn} onLoginChange={handleLoginChange} idUser={idUser}/>} />
                <Route path="/problem" element={<Problems isLoggedIn={isLoggedIn} onLoginChange={handleLoginChange} idUser={idUser}/>} />
                <Route path="*" element={<NoPage />} />
            </Routes>
        </>
    )
}

export default App;