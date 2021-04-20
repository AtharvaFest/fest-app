import React from 'react'
// import { render } from 'react-dom'
import {connect} from 'react-redux'
import {logoutAction} from '../../../action'


class Logout extends React.Component{

    logout = () => {
        this.props.logoutAction()
    }


        render(){
            return(
                <>
                    <a href="#logout"  onClick={this.logout}   className="nav__link">logout</a>
                </>
            );
        }
        

}

export default connect(null,{logoutAction})(Logout)