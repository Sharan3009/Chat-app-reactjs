import React from 'react';
import style from './home.module.scss';
import Side from '../side-component/';
import Main from '../main-component/';
import { Container, Row, Col, Navbar, Button, Nav } from 'react-bootstrap';

class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    }
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
                <Button variant="outline-light" size="sm">Log out</Button>
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

export default Home;