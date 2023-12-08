import React, {useState} from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import WelcomePage from './pages/WelcomePage';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import TextPage from './pages/TextPage';
import WordPage from './pages/WordPage';
import User from './pages/User';

function App() {

    const [isLoggedIn, setLoggedIn] = useState(false);

    const history = useNavigate();
 
    const handleLoginChange = () => {
        setLoggedIn(!isLoggedIn);
        !isLoggedIn ? history('/home') : history('/');
    };

    return (
            <Routes>
                <Route exact path="/"  element={<WelcomePage isLoggedIn={isLoggedIn} onLoginChange={handleLoginChange}/>} />
                <Route path="/home" element={<Home isLoggedIn={isLoggedIn} onLoginChange={handleLoginChange}/>} />
                <Route path="/sign_up" element={<SignUp isLoggedIn={isLoggedIn} onLoginChange={handleLoginChange}/>} />
                <Route path="/sign_in" element={<SignIn isLoggedIn={isLoggedIn} onLoginChange={handleLoginChange}/>} />
                <Route path="/text_page" element={<TextPage isLoggedIn={isLoggedIn} onLoginChange={handleLoginChange}/>} />
                <Route path="/word_page" element={<WordPage isLoggedIn={isLoggedIn} onLoginChange={handleLoginChange}/>} />
                <Route path="/user" element={<User isLoggedIn={isLoggedIn} onLoginChange={handleLoginChange}/>} />
            </Routes>
    )
}

export default App;