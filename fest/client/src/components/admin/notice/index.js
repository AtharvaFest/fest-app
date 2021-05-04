import React from 'react'
// import {withRouter} from 'react-router-dom'
import Sidebar from '../sidebar/Sidebar'

class Notice extends React.Component{

    render(){
        return(
            <>
                <div className="admin-panel__container">
                    <Sidebar />
                    <div className="admin-panel__section">
                        Notice
                    </div>
                </div>
            </>
        );
    }
}

 
export default Notice