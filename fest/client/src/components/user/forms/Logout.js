import React from 'react'
import {connect} from 'react-redux'
import {logoutAction} from '../../../action'


const Logout = (props) => {

    const logout = () => {
        props.logoutAction()
    }

    return(
        <a href="#logout"  onClick={logout}   className="nav__link">logout</a>
    );

}

export default connect(null,{logoutAction})(Logout)