import Rreract from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

function WordPage({ isLoggedIn, onLoginChange }) {
    return (
        <div>
            <Navbar isLoggedIn={isLoggedIn}/>

            <div className='main-c'>
            <h1>Title</h1>
            <section>
                    
                    <p>
                        Lorem ipsum dolor sit amet,___________consectetur adipisicing elit. Nisi cumque iste ad quo? Modi odit sunt deleniti eum! Perspiciatis quasi et at, accusantium distinctio corrupti vel? Fugit molestiae fuga nihil!
                    </p>
            </section>

            <section>
                        <h3>Answer</h3>
                        <p>translatin</p>
             </section>

            </div>

            <Footer />
        </div>
        
    )
}

export default WordPage;