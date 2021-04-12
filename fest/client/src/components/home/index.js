import React from 'react'
import About from './About';
import Footer from './Footer';
import Header from './Header';
import Nav from './Nav';
import Sponsor from './Sponsor';



const Main = function() {

    return(
        <div>
            <Nav />
            <Header />        
            <About />  
            <Sponsor />
            <Footer />
        </div>
    );

}

export default Main