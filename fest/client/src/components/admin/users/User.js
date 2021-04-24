import React from 'react'
import {connect} from 'react-redux'
import Sidebar from '../sidebar/Sidebar'
import {adminAllUsersAction,deleteUserAction} from '../../../action'
import EditUser from './EditUser'

class User extends React.Component{
    deleteCount = 0;
    state = {editUserData:{}}

    //on signup click, display signUp form and hide login form
    displayEditUser = () => {
        const modalEditUser = document.querySelector(`#modal-editUser`);
        modalEditUser.classList.add('visible');
    }

    showEditUserModal = () => {
        return <EditUser editUserData={this.state.editUserData} />
    }

    editUser = (user) => {
        this.setState({editUserData:user});
        this.displayEditUser();
    }

    deleteUser = (id) => {
        this.deleteCount += 1;
        if(this.deleteCount < 4){
            if(window.confirm("Delete user?")){
                this.props.deleteUserAction(id);
            }
        }else{
            this.props.deleteUserAction(id);
        }
        
    }

    getAllUsersData = () =>{
        if(this.props.allUsers === null) {
            return (<div className="no-content">Loading...</div>);
        }

        if(this.props.allUsers.length === 0) {
            return (<div className="no-content">no registered users</div>);
        }

        return(
            <table className="table">
                <thead>
                    <tr>
                        <th>sr.</th>
                        <th>name</th>
                        <th>username</th>
                        <th>email</th>
                        <th>admin</th>
                        <th>edit</th>
                        <th>delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    this.props.allUsers.map((user,index)=>{
                        return(
                            <tr key={user._id}>
                                <td>{index+1}</td>
                                <td>{user.name}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.isAdmin.toString()}</td>
                                <td>
                                    <span className="edit-btn" onClick={()=>this.editUser(user)}>
                                        <ion-icon name="create-outline"></ion-icon>
                                    </span>
                                </td>
                                <td>
                                    <span className="delete-btn" onClick={()=>this.deleteUser(user._id)}>
                                        <ion-icon name="trash-outline"></ion-icon>
                                    </span>
                                </td>
                            </tr>
                        );
                    })
                    }
                    
                </tbody>
            </table>
        );
    }

    componentDidMount(){
        this.props.adminAllUsersAction();
    }

    render(){
        return(
            <>
                <div className="admin-panel__container">
                    <Sidebar />
                    <div className="admin-panel__section">
                        <div className="user__section">
                            <h4 className="heading--4 user__heading">user</h4>
                            <div className="user__container">
                                    <div id="shadow_overlay_top"></div>
                                    <div id="shadow_overlay_left"></div>
                                    <div id="shadow_overlay_right"></div>
                                    <div id="shadow_overlay_bottom"></div>
                                <div className="user__content">
                                    {this.getAllUsersData()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {this.showEditUserModal()}
            </>
        );
    }
}

const mapStatetoProps = (state) => {
    return state.adminCRUDUserReducer
}

 
export default connect(mapStatetoProps,{adminAllUsersAction,deleteUserAction})(User)