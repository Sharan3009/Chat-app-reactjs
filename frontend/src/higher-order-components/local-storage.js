import React from 'react';

export function withStorage(WrappedComponent) {
    // ...and returns another component...
    return class extends React.Component {
        constructor(props) {
            super(props);
        }

        getDataFromStorage(key){
            return getDataFromStorage(key);
        }
    
        setDataInStorage(key,value){
            let data = JSON.stringify(value);
            localStorage.setItem(key,data);
        }
        
        removeDataFromStorage(key){
            localStorage.removeItem(key);
        }
        
        clearStorage(){
            localStorage.clear();
        }
  
        render() {
            // ... and renders the wrapped component with the fresh data!
            // Notice that we pass through any additional props
            return <WrappedComponent 
                getDataFromStorage={this.getDataFromStorage}
                setDataInStorage={this.setDataInStorage}
                removeDataFromStorage={this.removeDataFromStorage}
                clearStorage={this.clearStorage}
                {...this.props} />;
        }
    };
}

export function getDataFromStorage(key){
    let data = localStorage.getItem(key);
    try{
        data = JSON.parse(data);
        return data;
    } catch (e){
        return data;
    }
}