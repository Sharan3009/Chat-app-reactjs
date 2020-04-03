import React from 'react';
import style from './home.module.scss';
import Side from '../side-component/';
import Main from '../main-component/';
import { Container, Row, Col, Navbar, Button, Nav, Spinner } from 'react-bootstrap';
import { socketConnect, socketDisconnect,socketOn,socketEmit } from '../../actions/socket.action';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { logoutApi,startLogout,stopLogout } from '../../actions/home-component.action';

class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }

  componentDidMount(){
    this.connectSocketAndAuthorize();
  }

  componentWillUnmount(){
    this.props.dispatch(socketDisconnect());
  }

  connectSocketAndAuthorize(){
    this.props.dispatch(socketConnect())
    .then(
      ()=>{
        this.props.dispatch(socketOn("verifyUser",()=>{
          let authToken = this.getCookieValue("authToken");
          this.props.dispatch(socketEmit("set-user",authToken))
        }))
      }
    );
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
        this.handleConfirmation(true,"danger",message);
      })
  }

  getCookieValue(name){
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) return match[2];
  }

  render(){
    return(
      <>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="ml-auto" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <div className="d-flex justify-content-between my-1">
                <Button variant="success" size="sm" className="mr-2">Create room</Button>
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
        <Container fluid className="parent-flex">
          <Row>
            <Col lg="3" md="4" className="p-0">
              <Side />
            </Col>
            <Col lg="9" md="8" className="parent-flex p-0">
              <Main />
            </Col>
          </Row>
        </Container>
      </>
    )
  }
}

const mapStateToProps = ({homeComponent}) => {
  return homeComponent
}

export default compose(
  connect(mapStateToProps),
  withRouter
)(Home)