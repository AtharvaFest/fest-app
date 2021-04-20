import React from 'react'
import ReactDOM from 'react-dom'

export class LogoutAlert extends React.Component{

    hideAlert = () => {
        const alert = document.querySelector('#alert-logout');
        alert.classList.add('hide-alert');
    }


    render() {
        return ReactDOM.createPortal(
            <>
            <div id="alert-logout">
                <div className={`alert alert--${this.props.alertType}`}>
                    <span className={`close close--${this.props.alertType}`} onClick={this.hideAlert}>&times;</span>
                    <span className="msg">{this.props.message}</span>
                </div>
            </div>
            </>
            ,document.querySelector('#login')


        );
    }


}
