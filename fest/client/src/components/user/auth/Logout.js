import React from 'react'
import {connect} from 'react-redux'
import {logoutAction} from '../../../action'
import history from  '../../../history'

class Logout extends React.Component{

    state = {
        alertInfo:false,
        alertErr:false,
    }
    showAlert = false

    logout = () => {
        this.props.logoutAction().then(()=>{
            this.props.showAccountMenu();
            history.push("/login")
        })
    }


        render(){
            return(
                <>
                    <a href="#logout" className={this.props.class_name} onClick={this.logout}>Logout</a>
                </>
            );
        }
        

}

export default connect(null,{logoutAction})(Logout)