import React,{useEffect} from 'react'
import ReactDOM from 'react-dom'



export const Alert = function(props) {

    const hideAlert = () => {
        const alert = document.querySelector(`#${props.containerId}`);
        alert.classList.add('hide-alert');
    }

    

    useEffect(()=>{
        const autoshowAlert = () => {
            const alert = document.querySelector(`#${props.containerId}`);
            alert.classList.remove('hide-alert'); //Removing hide property
            setTimeout(function(){
                alert.classList.add('hide-alert');
              },5000);
        }
        autoshowAlert()
    })

    return ReactDOM.createPortal(
        <div id={props.containerId}>
            <div className={`alert alert--${props.alertType}`}>
                <span className={`close close--${props.alertType}`} onClick={hideAlert}>&times;</span>
                <span className="msg">{props.message}</span>
            </div>
        </div>,
        document.querySelector('#alert')
    );
    


}
