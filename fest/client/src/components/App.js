import React from 'react'
import {Router,Switch,Route} from 'react-router-dom'



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
import Login from './admin/auth/Login'
import Users from './admin/users/User'

//////////////////////////////////
///// OTHER SECTION
import history from  '../history'
import {ProtectedRoute,ProtectedAdminRoute} from '../protectedRoute/protected.route'



const App = function() {

    return(
        <div>
            <Router history={history}>
                <Switch >
                    {/* User Routes */}
                    <Route path='/home' exact component={Home}  />
                    <Route path='/' exact component={Gallery}  />
                    <ProtectedRoute path='/event/register' exact component={Event}/>
                    <Route path='/about' exact component={About}  />
                    <Route path='/contact' exact component={Contact}  />
                    <ProtectedRoute path='/profile' exact component={Profile}  />

                    {/* Admin Routes */}
                    <Route path='/adminlogin' exact component={Login}  />
                    {/* <Route path='/admin' exact component={Users}  /> */}
                    <ProtectedAdminRoute path="/admin" exact component={Users} />

                    <Route path='*' exact component={()=>"404 Page not found"}  />
                </Switch>
            </Router>
        </div>
    );

}

export default App