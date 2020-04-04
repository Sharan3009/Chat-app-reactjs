const USER_DETAILS_KEY = "userDetails";

function getDataFromStorage(key){
    let data = localStorage.getItem(key);
    try{
        data = JSON.parse(data);
        return data;
    } catch (e){
        return data;
    }
}

function setDataInStorage(key,value){
    let data = JSON.stringify(value);
    localStorage.setItem(key,data);
}

function removeDataFromStorage(key){
    localStorage.removeItem(key);
}

function clearStorage(){
    localStorage.clear();
}

function getUserDetailsFromStorage(){
    let user = getDataFromStorage(USER_DETAILS_KEY);
    if(user && user.userId){
        return user;
    } else {
        return {};
    }
}

function getFullName(user){
    if(user){
        return (user.firstName || "" + user.lastName ||  "").trim();
    }
    return "";
}

module.exports = {
    USER_DETAILS_KEY,
    getDataFromStorage,
    setDataInStorage,
    removeDataFromStorage,
    clearStorage,
    getUserDetailsFromStorage,
    getFullName,
}