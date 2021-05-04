import React from 'react'
import {connect} from 'react-redux'
import {logoutAction} from '../../../action'

class Logout extends React.Component{

    logout = () => {
        this.props.logoutAction().then(()=>{
            this.props.showAccountMenu();
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