class Auth {
    isAuthenticated(){
        this.authenticated = localStorage.getItem('token');

        if(this.authenticated){
            return true
        }else{
            return false
        }
    }

    isAdminAuthenticated(){
        this.adminAuthenticated = localStorage.getItem('adminToken');

        if(this.adminAuthenticated){
            return true
        }else{
            return false
        }
    }

   
}


export default new Auth();