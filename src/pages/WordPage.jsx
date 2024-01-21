import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import UserWord from '../components/WordPage/UserWord';
import AdminWord from '../components/WordPage/AdminWord';

function WordPage({ isLoggedIn, onLoginChange, operatingData}) {

    return (
        <div>
            <div className="main-body">

                <Navbar isLoggedIn={isLoggedIn} operatingData={operatingData}/>
                
                <div className="main-c">

                    {operatingData.isAdmin == 0 ? (
                        <UserWord onLoginChange={onLoginChange} operatingData={operatingData}/>
                    ) : (
                        <AdminWord isLoggedIn={isLoggedIn} onLoginChange={onLoginChange} operatingData={operatingData}/>
                    )}
                       
                </div>

                <Footer/> 

            </div>
        </div>
        
    )
}

export default WordPage;