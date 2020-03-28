class Auth {
    constructor(){
        this._key = "userDetails";
    }

    login(userDetails,cb){
        localStorage.setItem(this._key,JSON.stringify(userDetails));
        if(cb){
            cb();
        }
    }

    logout(cb){
        localStorage.removeItem(this._key);
        if(cb){
            cb();
        }
    }

    isAuthenticated(){
        try{
            let userDetails = JSON.parse(localStorage.getItem(this._key));
            return (userDetails.userId)?true:false;
        } catch (e){
            return false;
        }
    }
}

export default new Auth();