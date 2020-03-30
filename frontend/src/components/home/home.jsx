import React from 'react';
import style from './home.module.scss';
import Side from '../side-component/';
import Main from '../main-component/';
import { Container, Row, Col, Navbar, Button } from 'react-bootstrap';

class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }

  render(){
    return(
      <>
        <Navbar bg="dark" variant="dark">
          <Button variant="outline-light ml-auto">Log out</Button>
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