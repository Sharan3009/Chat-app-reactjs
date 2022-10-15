import React from 'react';
import { compose } from 'redux';
import { Navbar } from 'react-bootstrap';
import { withRouter, Link } from 'react-router-dom';

class AppNavbar extends React.Component{

    render(){
        return(
            <Navbar bg="dark" variant="dark" expand="lg">
              <Link to="/rooms" className="navbar-brand">Home</Link>
            </Navbar>
        )
    }
}

export default compose(
    withRouter
)(AppNavbar)