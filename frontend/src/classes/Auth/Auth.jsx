class Auth {
    constructor(){
        this._key = "authToken";
    }

    login(authToken,cb){
        localStorage.setItem(this._key,authToken);
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
        return localStorage.getItem(this._key);
    }
}

export default new Auth();