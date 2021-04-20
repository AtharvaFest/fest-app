import React from 'react'

import Sidebar from '../sidebar/Sidebar'

class Notice extends React.Component{

    render(){
        return(
            <>
                <div className="admin-panel__container">
                    <Sidebar />
                    <div className="">
                        Notice
                    </div>
                </div>
            </>
        );
    }
}

 
export default Notice