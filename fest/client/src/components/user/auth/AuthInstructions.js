import React from 'react';
import ReactDOM from 'react-dom';



class AuthInstructions extends React.Component {

    hideModal = () => {
        const modal = document.querySelector('#checkout-instruction');
        modal.classList.remove('visible')
    }

    render(){
        return (
            ReactDOM.createPortal(
                <>
                <div className="modal" id="checkout-instruction" onClick={this.hideModal}>
                    <div className="modal__container" onClick={(e) => e.stopPropagation()}>
                        <div className="modal__sub-container" >
                            <h4 className="heading--4 modal__heading">Instructions</h4>
                            <div className="modal__content">
                                <ul className="instruction__list">
                                    <li>
                                        The students that are from Atharva college register using Atharva G-suit id.
                                    </li>
                                    <li>
                                        Students registered using Atharva email id will only be allowed to play intra-college events.
                                    </li>
                                    <li>Instruction for signup 1</li>
                                    <li>Instruction for signup 1</li>
                                </ul>
                            </div>           
                        </div>
                    </div>
                </div>

            </>
            ,document.querySelector('#auth')
            )
        )
    }
    
}


export default AuthInstructions