import React, { Component } from 'react';
import {connect} from 'react-redux';

import history from '../../../history'
import {adminLogoutAction} from '../../../action'

class Logout extends Component {


    logoutHandler = () => {
        this.props.adminLogoutAction().then(()=>{
            history.push('/admin')
        })
    } 

    render(){
        return(
            <div className="logout__container">
                <button className="logout__btn" onClick={this.logoutHandler}>Logout</button>
            </div>
        );
    }
}

export default connect(null,{adminLogoutAction})(Logout)