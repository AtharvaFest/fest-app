import React from 'react'
import {Router,Route} from 'react-router-dom'



///////////////////////////////
//// USER SECTION
import Home from './user/home'
import Gallery from './user/gallery'
import Event from './user/events'
import About from './user/about'
import Contact from './user/contact'
import Profile from './user/profile'

////////////////////////////////
///// ADMIN SECTION



//////////////////////////////////
///// OTHER SECTION
import history from  '../history'


// axios.interceptors.response.use(function (response) {
//     // axios.interceptors.response.use( response => {
//         // console.log();
//         console.log(response);
//         return response;
//     }, function (error) {
//         // Do something with response error
//         console.log(error.response);
//         return Promise.reject(error);
//       });

const App = function() {

    return(
        <div>
            <Router history={history}>
                <Route path='/' exact component={Home}  />
                <Route path='/gallery' exact component={Gallery}  />
                <Route path='/event' exact component={Event}  />
                <Route path='/about' exact component={About}  />
                <Route path='/contact' exact component={Contact}  />
                <Route path='/profile' exact component={Profile}  />
            </Router>
        </div>
    );

}

export default App