import React from 'react'
import {connect} from 'react-redux'
import {emailActivationAction} from '../../../action'

import history from '../../../history'
import Toast,{toast} from '../../toast'

class EmailActivation extends React.Component{

    state = {
        alertInfo:false,
        alertErr:false,
    }


    emailActivate = () => {
        this.props.emailActivationAction().then((value)=>{
            this.props.toast({
                containerId: "toast-activate-account",
                toastType: "info",
                message: "Account successfully activated",
                showToast:true
            }) 
        }).catch(()=>{
            this.props.toast({
                containerId: "toast-activate-account",
                toastType: "error",
                message: "Email is already active or Link is expired",
                showToast:true
            }) 
        })
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
                <Toast />
            </>
        );
    }


}

export default connect(null,{emailActivationAction,toast})(EmailActivation)

