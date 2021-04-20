import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import auth from '../auth'


export class ProtectedRoute extends React.Component{
    constructor({component: Component,...rest}){
        super();
        this.Component = Component;
        this.rest = rest;
        
    }

    componentDidMount(){
        if(!auth.isAuthenticated()){
            alert("Login to continue!");
        }
            
    }

    render(){
            return(
                <Route 
                    {...this.rest}
                    render={props =>{
                        if(auth.isAuthenticated()){
                            return <this.Component {...this.rest} />
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
}



export class ProtectedAdminRoute extends React.Component{
    constructor({component: Component,...rest}){
        super();
        this.Component = Component;
        this.rest = rest;
        
    }


    render(){
            return(
                <Route 
                    {...this.rest}
                    render={props =>{
                        if(auth.isAdminAuthenticated()){
                            return <this.Component {...this.rest} />
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
}