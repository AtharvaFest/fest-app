import React from 'react'

import Sidebar from '../sidebar/Sidebar'

class Event extends React.Component{

    render(){
        return(
            <>
                <div className="admin-panel__container">
                    <Sidebar />
                    <div className="admin-panel__section">
                        Event
                    </div>
                </div>
            </>
        );
    }
}

 
export default Event