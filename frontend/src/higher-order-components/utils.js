import React from 'react';

export function utils(){
    return class extends React.Component{
        constructor(props) {
            super(props);
          }
      
          render() {
            return <WrappedComponent {...this.props} />;
          }
    }
}