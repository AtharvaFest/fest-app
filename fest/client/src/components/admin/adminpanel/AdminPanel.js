import React from 'react'

import Sidebar from '../sidebar/Sidebar'

class AdminPanel extends React.Component{

    render(){
        return(
            <>
                <div className="admin-panel__container">
                    <Sidebar />
                    <div className="">
                        AdminPanel
                    </div>
                </div>
            </>
        );
    }
}

 
export default AdminPanel