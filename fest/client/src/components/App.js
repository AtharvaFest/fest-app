import React, { Component } from 'react'
import {Router,Switch,Route} from 'react-router-dom'



///////////////////////////////
//// USER SECTION
import Home from './user/home'
import Gallery from './user/gallery'
import Event from './user/events/EventRegistration'
import About from './user/about'
import Contact from './user/contact'
import Profile from './user/profile'
import UserLogin from './user/auth/Login'
import Signup from './user/auth/Signup'
import EmailActivation from './user/auth/EmailActivation'
import ResetPassword from './user/auth/ResetPassword'
import ForgotPassword from './user/auth/ForgotPassword'
////////////////////////////////
///// ADMIN SECTION
import Login from './admin/auth/Login'
import Users from './admin/users'
import AdminGallery from './admin/gallery'
import AdminNotice from './admin/notice'
import AdminEvent from  './admin/event'

//////////////////////////////////
///// OTHER SECTION
import history from  '../history'
import ProtectedUserRoute from '../protectedRoute/protected.userRoute'
import ProtectedAdminRoute from '../protectedRoute/protected.adminRoute'



class App extends Component {

    render(){
        return(
            <div>
                <Router history={history}>
                    <Switch>
                        {/* User Routes */}
                        {/* <Route exact path='/home'  component={Home}  /> */}
                        <Route exact path='/'  component={Home}  />
                        <Route path='/gallery' exact component={Gallery}  />
                         <ProtectedUserRoute path='/event/registration' exact component={Event}  />
                        <Route path='/about' exact component={About}  />
                        <Route path='/contact' exact component={Contact}  />
                        <ProtectedUserRoute path='/account/profile' exact component={Profile}  />
                        <Route path='/activate_email/:token' exact component={EmailActivation} />
                        <Route path='/reset_password/:token' exact component={ResetPassword} />
                        {/* Admin Routes */}
                        
                        <Route path='/adminlogin' exact component={Login} />
                            
                        {/* <Route path='/admin' exact component={Users}  />  */}
                        <ProtectedAdminRoute path="/admin" exact component={Users} />
                        <ProtectedAdminRoute path="/admin/gallery" exact  component={AdminGallery} />
                        <ProtectedAdminRoute path="/admin/event/manage" exact  component={AdminEvent} />
                        <ProtectedAdminRoute path="/admin/notice" exact  component={AdminNotice} />

                        <Route path='*' exact component={()=>"404 Page not found"}  />
                    </Switch>
                </Router>
                <UserLogin />
                <Signup />
                <ForgotPassword />
            </div>
        );
    }
        
    

}

export default App