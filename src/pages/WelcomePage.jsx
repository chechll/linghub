import React from "react";
import '../CSS/index.css';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

function WelcomePage({ isLoggedIn, operatingData}) {
    return (
        <div className="main-c">
                <Navbar isLoggedIn={isLoggedIn} operatingData={operatingData}/>
                    <div>
                    <h1>Welcome to "Learn Ukrainian" at LingHub!</h1>

                    <div className="wel-sections">
                    <section>
                        <h2>Why Learn Ukrainian with Us?</h2>
                        <ul>
                            <li><strong>Structured Curriculum:</strong> Our carefully crafted curriculum takes you through the essentials of the Ukrainian language.</li>
                            <li><strong>Practical Conversations:</strong> Dive into real-life conversations from the start.</li>
                            <li><strong>Cultural Immersion:</strong> Explore Ukrainian traditions, customs, and historical insights.</li>
                            <li><strong>Interactive Learning:</strong> Engage in exercises, quizzes, and multimedia content designed to reinforce your learning.</li>
                        </ul>
                    </section>

                    <section>
                        <h2>Join Our Learning Community</h2>
                        <p>Connect with fellow learners, exchange tips, and participate in discussions within our vibrant learning community.</p>
                    </section>

                    <section>
                        <h2>Start Your Ukrainian Learning Journey Today!</h2>
                        <p>Whether you're drawn to Ukrainian for its rich cultural heritage, planning a trip to Ukraine, or simply eager to explore a new language, [Your Website Name] is here to guide you. Begin your Ukrainian learning adventure today and unlock a world of new possibilities.</p>
                    </section>

                        
                    <section>
                        <h2>Our Approach: Tailored for English Speakers</h2>
                        <p>Understanding the unique challenges English speakers face when learning Ukrainian, we have designed our lessons to address these specific needs.</p>
                    </section>
                    </div>
                    </div>
                    <Footer/> 
        </div>
        
    )
}

export default WelcomePage;