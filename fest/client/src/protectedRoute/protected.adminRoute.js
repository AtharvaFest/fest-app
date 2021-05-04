import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import auth from '../auth'


// MiddleWare, check is admin or not before entring in admin panel
const ProtectedAdminRoute = ({component: Component,...rest}) => {
    
            return(
                <Route 
                    {...rest}
                    render={props =>{
                        if(auth.isAdminAuthenticated()){
                            return <Component {...rest} />
                        } else{
                            
                            return (
                                <Redirect
                                    to={{
                                        pathname:"/adminlogin",
                                        state:{
                                            from:props.location
                                        }
                                    }}
                                />
                            );
                        }
                    }}
                />
            );
}



export default ProtectedAdminRoute