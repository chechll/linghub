import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import UserWord from '../components/WordPage/UserWord';
import AdminWord from '../components/WordPage/AdminWord';

function WordPage({ isLoggedIn, onLoginChange, operatingData }) {

    return (
        <div className="main-c">

            <Navbar isLoggedIn={isLoggedIn} operatingData={operatingData} />

            {operatingData.isAdmin == 0 ? (
                <UserWord onLoginChange={onLoginChange} operatingData={operatingData} />
            ) : (
                <AdminWord isLoggedIn={isLoggedIn} onLoginChange={onLoginChange} operatingData={operatingData} />
            )}

            <Footer />
        </div>
    )
}

export default WordPage;