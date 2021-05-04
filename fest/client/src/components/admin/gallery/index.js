import React from 'react'

import Sidebar from '../sidebar/Sidebar'

class Gallery extends React.Component{

    render(){
        return(
            <>
                <div className="admin-panel__container">
                    <Sidebar />
                    <div className="admin-panel__section">
                        Gallery
                    </div>
                </div>
            </>
        );
    }
}

 
export default Gallery