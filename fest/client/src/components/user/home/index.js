import React from 'react'
import Login from '../forms/Login';
import Signup from '../forms/Signup';
import About from './About';
import Footer from './Footer';
import Header from './Header';
import Nav from './Nav';
import Sponsor from './Sponsor';



const Home = function() {

    return(
        <div>
            <Nav />
            <Header />        
            <About />  
            <Sponsor />
            <Footer />
            <Login />
            <Signup />
        </div>
    );

}

export default Home