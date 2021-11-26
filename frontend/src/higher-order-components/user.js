import React from 'react';
import { getDataFromStorage, setDataInStorage } from './local-storage';
export function userDetails(WrappedComponent) {
    // ...and returns another component...
    return class extends React.Component {
      constructor(props) {
        super(props);
        this.key = "userDetails";
        this.currentUser = this.getUserDetailsFromStorage();
      }

      getUserDetailsFromStorage(){
        let user = getDataFromStorage(this.key);
        if(user && user.userId){
            return user;
        } else {
            return {};
        }
      }

      setUserDetailsInStorage=(data)=>{
        if(data){
          data.userName = this.getFullName(data)
          setDataInStorage(this.key,data);
        }
      }

      
      getFullName(user){
        if(user){
            return (user.firstName || "" + user.lastName ||  "").trim();
        }
        return "";
      }

      isAuthenticated=()=>{
        let user = this.getUserDetailsFromStorage();
        if(user.userId){
          return true;
        }
        return false;
      }
  
      render() {
        return <WrappedComponent currentUser={this.currentUser}
         getFullName={this.getFullName}
         setUserDetailsInStorage={this.setUserDetailsInStorage}
         isAuthenticated={this.isAuthenticated}
         {...this.props} />;
      }
    };
}
