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
import UserManager from "./pages/UserManagement";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

    const [operatingData, setOperatingData] = useState(() => {
        const storedData = getWithExpiry('userOperatingData');
        return storedData || { idUser: 0, isAdmin: 0 };
    });

    const [isLoggedIn, setLoggedIn] = useState(() => {
        return operatingData.idUser !== 0;
    });

    const history = useNavigate();

    useEffect(() => {
        setWithExpiry('userOperatingData', operatingData, 6 * 60 * 60 * 1000);
    }, [operatingData]);

    const handleLoginChange = (idUser, isAdmin) => {
        if (idUser === 0 || idUser === undefined) {
            setLoggedIn(false);
            setOperatingData({ idUser: 0, isAdmin: 0 });
            localStorage.removeItem('userOperatingData');
            history('/');
        } else {
            console.log('idUser = ',idUser,'isAdmin = ',isAdmin);
            setLoggedIn(true);
            setOperatingData({ idUser: idUser, isAdmin: isAdmin });
            history('/home');
        }
    };

    return (
        <>
            <Routes>
                <Route exact path="/"  element={<WelcomePage isLoggedIn={isLoggedIn} onLoginChange={handleLoginChange} operatingData={operatingData}/>} />
                <Route path="/home" element={<Home isLoggedIn={isLoggedIn} onLoginChange={handleLoginChange} operatingData={operatingData}/>} />
                <Route path="/sign_up" element={<SignUp isLoggedIn={isLoggedIn} onLoginChange={handleLoginChange} operatingData = {operatingData} setOperatingData={setOperatingData}/>} />
                <Route path="/sign_in" element={<SignIn isLoggedIn={isLoggedIn} onLoginChange={handleLoginChange} operatingData = {operatingData} setOperatingData={setOperatingData}/>} />
                <Route path="/text_page" element={<TextPage isLoggedIn={isLoggedIn} onLoginChange={handleLoginChange} operatingData={operatingData}/>} />
                <Route path="/word_page" element={<WordPage isLoggedIn={isLoggedIn} onLoginChange={handleLoginChange} operatingData={operatingData}/>} />
                <Route path="/user" element={<User isLoggedIn={isLoggedIn} onLoginChange={handleLoginChange} operatingData={operatingData}/>} />
                <Route path="/user_management" element={<UserManager isLoggedIn={isLoggedIn} onLoginChange={handleLoginChange} operatingData={operatingData}/>} />
                <Route path="/problem" element={<Problems isLoggedIn={isLoggedIn} operatingData={operatingData}/>} />
                <Route path="*" element={<NoPage />} />
            </Routes>
            <ToastContainer />
        </>
    )
}

export default App;

function setWithExpiry(key, value, ttl) {
    const now = new Date();
    const item = {
        value: value,
        expiry: now.getTime() + ttl,
    };
    localStorage.setItem(key, JSON.stringify(item));
}

function getWithExpiry(key) {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
        return null;
    }
    const item = JSON.parse(itemStr);
    const now = new Date();
    if (now.getTime() > item.expiry) {
        localStorage.removeItem(key);
        return null;
    }
    return item.value;
}