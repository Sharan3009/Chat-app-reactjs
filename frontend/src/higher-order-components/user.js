import React from 'react';
import { getDataFromStorage } from './local-storage';
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
            user.userName = this.getFullName(user);
            return user;
        } else {
            return {};
        }
      }

      setUserDetailsInStorage(data){
        this.props.setDataInStorage(this.key,JSON.stringify(data));
      }

      
      getFullName(user){
        if(user){
            return (user.firstName || "" + user.lastName ||  "").trim();
        }
        return "";
      }
  
      render() {
        return <WrappedComponent currentUser={this.currentUser}
         getFullName={this.getFullName}
         setUserDetailsInStorage={this.setUserDetailsInStorage}
         {...this.props} />;
      }
    };
}
