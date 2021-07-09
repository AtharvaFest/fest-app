import React from 'react'
import {connect} from 'react-redux'
import Sidebar from '../sidebar/Sidebar'
import {adminAllUsersAction,deleteUserAction,deleteAllUserAction} from '../../../action'
import EditUser from './EditUser'
import Logout from '../auth/Logout'
import history from '../../../history'

class User extends React.Component{
    deleteCount = 0;
    state = {editUserData:{},search:'',prePropsAllUsers:'',allUsers:''}
    
    //on edit click, display edit form
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

    deleteAllUser = (id) => {
        if(window.confirm("Delete all user?")){
            this.props.deleteAllUserAction();
        }
    }

    getAllUsersData = () =>{
        if(this.state.allUsers === null) {
            return (<div className="no-content">Loading...</div>);
        }

        if(this.state.allUsers.length === 0) {
            return (<div className="no-content">no user found</div>);
        }

        return(
            <table className="table">
                <thead>
                    <tr>
                        <th>sr.</th>
                        <th>name</th>
                        <th>username</th>
                        <th>email</th>
                        <th>Mobile No.</th>
                        <th>admin</th>
                        <th>edit</th>
                        <th><span onClick={this.deleteAllUser} className="delete__all">delete all</span></th>
                    </tr>
                </thead>
                <tbody>
                    {
                    this.state.allUsers.map((user,index)=>{
                        return(
                            <tr key={user._id}>
                                <td>{index+1}</td>
                                <td>{user.name}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.mobileNumber}</td>
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

    enterPressed = (event) => {
        var code = event.keyCode || event.which;
        if(code === 13) { //13 is the enter keycode
            this.searchHandler()
        } 
    }

    searchHandler = () => {
        const allUsers = this.state.prePropsAllUsers;
        const searchedUsers = allUsers.filter((user)=>{
            let userStatus = false;
            const userKeys = Object.keys(user);
            
            userKeys.forEach((value)=>{
                if(value === '_id') return

                if(user[value].toString().toLowerCase().includes(this.state.search.toString().trim().toLowerCase())){
                    userStatus = true
                }
            })
            return userStatus === true
        })
        this.setState({allUsers:searchedUsers})
    }

    componentDidMount(){
        this.props.adminAllUsersAction()
        .then(()=>{
            this.setState({allUsers:this.props.allUsers})
        })
        .catch(()=>{history.push('/adminlogin')})
    }

    static getDerivedStateFromProps(props, state){
        // the state only changes when props value get change with respect to previous props,
        // and prop value only gets changes when 'user' is edited.
       if(props.allUsers !== state.prePropsAllUsers){
           return {
               prePropsAllUsers:props.allUsers,allUsers:props.allUsers
            }
       }
       return null
    }


    render(){
        return(
            <>
                <div className="admin-panel__container">
                    <Sidebar />
                    <div className="admin-panel__section">
                        <div className="admin-panel__content">  
                            <div className="admin-panel__navbar">
                                <div className="admin-panel__navbar-right">
                                    <Logout />
                                </div>  
                            </div>                        
                            <div className="admin-panel__header-section">
                                <div className="search__container"> 
                                    <input  type="text" placeholder="Search" value={this.state.search} onChange={(e)=>this.setState({search:e.target.value})} onKeyPress={this.enterPressed} className="search__box" />
                                    <span className="search__icon" onClick={this.searchHandler} >
                                        <ion-icon name="search-outline" ></ion-icon>
                                    </span>
                                </div>
                            </div>  
                                        
                            <div className="shadow__container">
                                    <div id="shadow_overlay_top"></div>
                                    <div id="shadow_overlay_left"></div>
                                    <div id="shadow_overlay_right"></div>
                                    <div id="shadow_overlay_bottom"></div>
                                <div className="table__content">
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

 
export default connect(mapStatetoProps,{adminAllUsersAction,deleteUserAction,deleteAllUserAction})(User)