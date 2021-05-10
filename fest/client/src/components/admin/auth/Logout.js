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
                <button className="logout__btn" onClick={this.logoutHandler}>Logout</button>
        );
    }
}

export default connect(null,{adminLogoutAction})(Logout)