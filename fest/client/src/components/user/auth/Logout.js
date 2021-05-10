import React from 'react'
import {connect} from 'react-redux'
import {logoutAction} from '../../../action'
import {Alert} from '../../Alert'

class Logout extends React.Component{

    state = {
        alertInfo:false,
        alertErr:false,
    }
    showAlert = false

    logout = () => {
        this.props.logoutAction().then(()=>{
            this.props.showAccountMenu();
            this.showAlert = true;
            this.setState({alertInfo:true,alertErr:false});  
        })
    }

    // TOGGLE BETWEEN INFO AND ERROR ALERTS
    alertPopup=(alertInfo,alertErr)=>{
        if(alertInfo && this.showAlert){
            this.showAlert = false
            return(
                <Alert message="Logout successful" containerId="alert-logout" alertType={"info"} />
            );
        }
        return<></>;
    }

        render(){
            return(
                <>
                    <a href="#logout" className={this.props.class_name} onClick={this.logout}>Logout</a>
                    {this.alertPopup(this.state.alertInfo,this.state.alertErr)}
                </>
            );
        }
        

}

export default connect(null,{logoutAction})(Logout)