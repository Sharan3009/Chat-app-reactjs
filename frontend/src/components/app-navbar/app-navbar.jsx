import React from 'react';
import { compose } from 'redux';
import { Navbar } from 'react-bootstrap';
import { withRouter, Link } from 'react-router-dom';

class AppNavbar extends React.Component{

    render(){
        return(
            <Navbar bg="dark" variant="dark" expand="lg">
              <Link to="/auth" className="navbar-brand"><h2 class="mb-0">ConvoCare</h2></Link>
            </Navbar>
        )
    }
}

export default compose(
    withRouter
)(AppNavbar)