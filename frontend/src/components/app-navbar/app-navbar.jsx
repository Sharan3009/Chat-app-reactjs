import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Navbar, Button, Nav, Spinner } from 'react-bootstrap';
import { withRouter, Link } from 'react-router-dom';
import { logoutApi,startLogout,stopLogout } from '../../actions/app-navbar.action';
import CreateRoomButton from '../create-room-button';

class AppNavbar extends React.Component{

    constructor(props){
        super(props);
        this.state = {};
    }

    
  logout(){
    this.props.dispatch(startLogout());
    logoutApi()
    .then(
      (apiResponse)=>{
        this.props.dispatch(stopLogout());
        localStorage.clear();
        this.props.history.push("/login");
      })
      .catch(
      (apiError)=>{
        this.props.dispatch(stopLogout());
        let message = ""
        if(apiError.data){
          message=apiError.data.message;
        }
      })
    }

    render(){
        return(
            <Navbar bg="dark" variant="dark" expand="lg">
              <Link to="/rooms" className="navbar-brand">Home</Link>
              <Navbar.Toggle aria-controls="basic-navbar-nav" className="ml-auto" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <div className="d-flex justify-content-between my-1">
                    <CreateRoomButton className="mr-2"/>
                    <Button variant="outline-light" size="sm" onClick={this.logout.bind(this)} disabled={this.props.logoutStatus==='start'}>
                    {
                        (this.props.logoutStatus==="start")?(
                        <Spinner as="span" animation="border" size="sm"
                        role="status" aria-hidden="true" className="mr-1"/>
                        ):''
                    } Log out</Button>
                    </div>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
        )
    }
}

const mapStateToProps = ({appNavbar}) => {
    return appNavbar
  }

export default compose(
    connect(mapStateToProps),
    withRouter
)(AppNavbar)