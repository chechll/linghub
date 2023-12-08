import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../CSS/index.css';

function Home( { isLoggedIn, onLoginChange }) {
    return (
        <div>
            <div className="main-body">

                <Navbar isLoggedIn={isLoggedIn}/>
                
                <div className="main-c">

                    <h2>Title</h2>

                    <section>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi cumque iste ad quo? Modi odit sunt deleniti eum! Perspiciatis quasi et at, accusantium distinctio corrupti vel? Fugit molestiae fuga nihil!
                             Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur sequi modi perspiciatis dolorem, quis distinctio natus ipsum, eveniet culpa saepe neque quam sunt officiis corrupti reprehenderit? Quidem dolorem totam earum!
                             Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum debitis quaerat, eius ipsum nisi odio placeat illum corporis recusandae dolor officiis facere atque incidunt, impedit pariatur vel tempore fugit, sequi nobis. Exercitationem in, et placeat officia omnis necessitatibus repellat maiores, ut repudiandae illum cumque nobis sapiente eius deserunt odio eaque!
                        </p>
                    </section>
     
                </div>

                <Footer/> 

            </div>
        </div>
    )
}

export default Home;