import { getUserDetailsFromStorage, USER_DETAILS_KEY } from '../utils';
class Auth {
    constructor(){
        
    }

    login(userDetails,cb){
        localStorage.setItem(USER_DETAILS_KEY,JSON.stringify(userDetails));
        if(cb){
            cb();
        }
    }

    logout(cb){
        localStorage.removeItem(USER_DETAILS_KEY);
        if(cb){
            cb();
        }
    }

    isAuthenticated(){
        if(getUserDetailsFromStorage().userId){
            return true;
        } else {
            return false;
        }
    }
}

export default new Auth();