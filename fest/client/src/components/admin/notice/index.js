import React from 'react'
import Sidebar from '../sidebar/Sidebar';
import NoticeCard from './NoticeCard'
import AddNotice from './AddNotice';
import { connect } from 'react-redux';
import {readNoticeAction} from '../../../action';

class Notice extends React.Component{

    //on addNotice click, display notice model
    displayNotice = (e) => {
        const modal = document.querySelector(`#add-notice`);
        modal.classList.add('visible');
    }

    noticeCards = () => {
        if(this.props.notices === null) {
            return (<div className="no-content">Loading...</div>);
        }


        if(this.props.notices.length === 0) {
            return (<div className="no-content">No Notice</div>);
        }

        return(
            this.props.notices.map((notice,index) => {
                return <NoticeCard id={notice._id}  heading={notice.heading} description={notice.description} key={index} />
            })
        );

    }

    componentDidMount(){
        this.props.readNoticeAction();
    }

    render(){
        return(
            <>
                <div className="admin-panel__container">
                    <Sidebar />
                    
                    <div className="admin-panel__section">
                        <div className="add__notice--container">
                            <a href="#add-notice" onClick={this.displayNotice} className="add__notice--btn">Add Notice</a>
                        </div>
                        <div className="notice__section">
                        { 
                                        
                            this.noticeCards()
                        }  
                        </div>
                    </div>
                </div>
                <AddNotice />
            </>
        );
    }
}

const mapStatetoProps = (state) => {
    return state.adminCRUDNoticeReducer
}

export default connect(mapStatetoProps,{readNoticeAction})(Notice)