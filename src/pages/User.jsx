import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

function User({ isLoggedIn, onLoginChange }) {
    return (
        <div>
            <Navbar isLoggedIn={isLoggedIn}/>

            <div className='main-c'>

            <h2>User Information</h2>
                <div>
                    <strong>Name:</strong> <p>Name</p>
                </div>
                <div>
                    <strong>Surname:</strong> <p>Surname</p>
                </div>
                <div>
                    <strong>Email:</strong> <p>Email</p>
                </div>
                <div className="user-actions">
                <ul>
                    <li><button>Change</button></li>
                    <li><button>Delete</button></li>
                    <li><button onClick={onLoginChange}>Log Out</button></li>
                </ul>    
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default User;