import React, {useEffect, useState} from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

function TextPage({ isLoggedIn, onLoginChange }) {

    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        console.log("Selected Option:", selectedOption);
    };

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

                    <section>
                        <h3>Question</h3>
                    </section>

                    <section>
                    <form onSubmit={handleSubmit}>
                        <label>
                            <input
                                type="radio"
                                name="option"
                                value="Option 1"
                                checked={selectedOption === "Option 1"}
                                onChange={handleOptionChange}
                            />
                            Option 1
                        </label>

                        <label>
                            <input
                                type="radio"
                                name="option"
                                value="Option 2"
                                checked={selectedOption === "Option 2"}
                                onChange={handleOptionChange}
                            />
                            Option 2
                        </label>

                        <label>
                            <input
                                type="radio"
                                name="option"
                                value="Option 3"
                                checked={selectedOption === "Option 3"}
                                onChange={handleOptionChange}
                            />
                            Option 3
                        </label>

                        <label>
                            <input
                                type="radio"
                                name="option"
                                value="Option 4"
                                checked={selectedOption === "Option 4"}
                                onChange={handleOptionChange}
                            />
                            Option 4
                        </label>

                        <button type="submit">Submit</button>
                    </form>  
                    </section>       
                </div>

                <Footer/> 

            </div>
        </div>
        
    )
}

export default TextPage;