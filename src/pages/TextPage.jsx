import React from 'react';
import '../CSS/index.css';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import UserText from '../components/TextPage/UserText';
import AdminText from '../components/TextPage/AdminText';

function TextPage({ isLoggedIn, onLoginChange, operatingData }) {

    return (
        <div className="main-c">

            <Navbar isLoggedIn={isLoggedIn} operatingData={operatingData} />

            {operatingData.isAdmin == 0 ? (
                <UserText onLoginChange={onLoginChange} operatingData={operatingData} />
            ) : (
                <AdminText isLoggedIn={isLoggedIn} onLoginChange={onLoginChange} operatingData={operatingData} />
            )}

            <Footer />

        </div>

    )
}

export default TextPage;