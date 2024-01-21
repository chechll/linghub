import React from 'react';
import '../CSS/index.css';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import UserText from '../components/TextPage/UserText';
import AdminText from '../components/TextPage/AdminText';

function TextPage({ isLoggedIn, onLoginChange, operatingData}) {

    return (
        <div>
            <div className="main-body">

                <Navbar isLoggedIn={isLoggedIn} operatingData={operatingData}/>
                
                <div className="main-c">

                    {operatingData.isAdmin == 0 ? (
                        <UserText onLoginChange={onLoginChange} operatingData={operatingData}/>
                    ) : (
                        <AdminText isLoggedIn={isLoggedIn} onLoginChange={onLoginChange} operatingData={operatingData}/>
                    )}
                       
                </div>

                <Footer/> 

            </div>
        </div>
        
    )
}

export default TextPage;