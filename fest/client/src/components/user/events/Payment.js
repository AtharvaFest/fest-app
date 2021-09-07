import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import {registerEventAction} from '../../../action';
import StripeCheckout from "react-stripe-checkout";


class Payment extends React.Component {
    
    makePayment = async (token) => {
        const body = {
          token,
          events: this.props.events,
          price: this.props.price
        };
        const headers = {
          "Content-Type": "application/json",
        };

    
        try {
          // const response = await axios.post('/payment',{...body});
          this.props.registerEventAction(body).then((result) =>{
            console.log(result)
          }).catch((err)=> {
            console.log(err)
          })
          

          // console.log("Response", response);
          // const { status } = response;
          // console.log("STATUS", status);
        } catch (error) {
          console.log(error);
        }
      };

    hideModal = () => {
        const modal = document.querySelector('#payment');
        modal.classList.remove('visible')
    }


    render(){
        return (
            ReactDOM.createPortal(
                <>
                <div className="modal" id="payment" onClick={this.hideModal}>
                    <div className="modal__container" onClick={(e) => e.stopPropagation()}>
                        <div className="modal__sub-container" >
                            <h4 className="heading--4 modal__heading">Make payment</h4>
                            <div className="modal__content">
                              <div>
                                Events: {
                                  this.props.events.map((event,index) => {
                                    return <div key={index}>{event}</div>
                                  })
                                }
                              </div>
                                <StripeCheckout
                                  stripeKey="pk_test_51JQTVkSEfiwwi2ln4vzN7Vn1Yyyl3r3UxOrCtF8C2X737ALCFROPWhwtWvtHDAZFARYS65KSasHPkrLb0QTl18aP00LdzUAKOo"
                                  token= {this.makePayment}
                                  name="Buy Events"
                                  currency = "INR"
                                  amount={this.props.price * 100}
                                >
                                  <button style={{ cursor: "pointer", fontSize:'10px' }} className="event__registration_submit">
                                    Pay {this.props.price} &#8377;
                                  </button>
                                </StripeCheckout>
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


export default connect(null,{registerEventAction})(Payment)