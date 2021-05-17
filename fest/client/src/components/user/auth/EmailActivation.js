import React from 'react'
import {connect} from 'react-redux'
import {emailActivationAction} from '../../../action'

import {Alert} from '../../Alert'
import history from '../../../history'

class EmailActivation extends React.Component{

    state = {
        alertInfo:false,
        alertErr:false,
    }


    emailActivate = () => {
        this.props.emailActivationAction().then((value)=>{
            this.setState({alertInfo:true,alertErr:false});
        }).catch(()=>{
            this.setState({alertInfo:false,alertErr:true});
        })
    }

    // TOGGLE BETWEEN INFO AND ERROR ALERTS
    alertPopup=(alertInfo,alertErr)=>{
        if(alertInfo){
            return(
                <Alert message="Account successfully activated" containerId="alert-activate-account" alertType={"info"} />
            );
        }
        if(alertErr){
            return(
            <Alert message="Email is already active or Link is expired" containerId="alert-activate-account" alertType={"error"} />
            );
        }

        return<></>;
        
    }

    render(){
        return(
            <>
                <div className="email-activation__container">
                    <p className="paragraph">Click &lsquo;Activate Email&rsquo; to activate your email account.</p>
                    <button className="email-activation__btn" onClick={this.emailActivate}>
                        Activate Email
                    </button>
                    <p className="paragraph">Click &lsquo;Go&rsquo; to redirect to our website.</p>
                    <button className="home__btn" onClick={()=>history.push('/')}>
                        GO
                    </button>
                </div>
                {this.alertPopup(this.state.alertInfo,this.state.alertErr)}
            </>
        );
    }


}

export default connect(null,{emailActivationAction})(EmailActivation)

