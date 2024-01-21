import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../CSS/index.css';
import HomeAdmin from '../components/HomePage/HomeAdmin';
import HomeUser from '../components/HomePage/HomeUser';

function Home( { isLoggedIn, onLoginChange, operatingData }) {
    return (
        <div>
            <Navbar isLoggedIn={isLoggedIn} operatingData={operatingData}/>
            <div className="main-body">
                
                    {operatingData.isAdmin == 0 ? (
                        <HomeUser onLoginChange={onLoginChange} operatingData={operatingData}/>
                    ) : (
                        <HomeAdmin onLoginChange={onLoginChange} operatingData={operatingData}/>
                    )}
                
            </div>
            <Footer/> 
        </div>
    )
}

export default Home;