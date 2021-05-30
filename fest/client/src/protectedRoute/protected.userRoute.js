import React,{useEffect} from 'react'
import {Route, Redirect} from 'react-router-dom'
import auth from '../auth'

// MiddleWare, checks authorized user before entering in restricted area.
export const ProtectedUserRoute = ({component: Component,...rest}) => {

    useEffect(()=>{
        if(!auth.isAuthenticated()){
            window.alert("Login to continue")
        }
    });

    return(
        <Route 
            {...rest}
            render={props =>{
                if(auth.isAuthenticated()){
                    return <Component {...rest} />
                } else{
                    return (
                        <Redirect
                            to={{
                                pathname:"/login",
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


export const ProtectedLoginRoute = ({component: Component,...rest}) => {

    useEffect(()=>{
        if(auth.isAuthenticated()){
            window.alert("You are already logged in")
        }
    });

    return(
        <Route 
            {...rest}
            render={props =>{
                if(!auth.isAuthenticated()){
                    return <Component {...rest} />
                } else{
                    return (
                        <Redirect
                            to={{
                                pathname:"/",
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
