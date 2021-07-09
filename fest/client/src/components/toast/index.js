import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

// Toast Action this updates the toastReducer
export const toast = (toastValues) => {
    return async (dispatch) => {
        dispatch({type:"TOAST",payload:toastValues})
    }
}

class Toast extends React.Component {

    hideAlert = () => {
        this.resetToastValue()
    }

     resetToastValue = () => {
       this.props.toast({
            containerId: "",
            alertType: "",
            message: "",
            showToast:false
        })
    }
    
    componentDidUpdate(){
        const autoshowToast = () => {
                    setTimeout(() => {
                        this.resetToastValue();
                      },5000);
                }
        if(this.props.toastValues.showToast){
            autoshowToast();
        }

    }

    render() {
        return ReactDOM.createPortal(
            <>
            {
                this.props.toastValues.showToast ?
                <div id={this.props.toastValues.containerId}>
                    <div className={`toast toast--${this.props.toastValues.toastType}`}>
                        <span className={`close close--${this.props.toastValues.toastType}`} onClick={this.hideAlert}>&times;</span>
                        <span className="msg">{this.props.toastValues.message}</span>
                    </div>
                    
                </div>
                
            :
                ""
            }
            </>
            ,
            document.querySelector('#alert')
        );
    }
    
    
}

const mapStatetoProps = (state) => {
    return state.toastReducer
}

export default connect(mapStatetoProps,{toast})(Toast);