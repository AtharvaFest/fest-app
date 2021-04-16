import React from 'react'


const Alert = function(props) {

    const hideAlert = () => {
        const alert = document.querySelector(props.containerId);
        alert.classList.add('hide-alert');
    }


    return(
        <div className={`alert alert--${props.alertType}`}>
            <span className={`close close--${props.alertType}`} onClick={hideAlert}>&times;</span>
            <span className="msg">{props.message}</span>
        </div>
    );


}


export default Alert