import React from 'react';
import style from './home.module.scss';
import Side from '../side-component/side-component';
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
            <Col lg="4" className="p-0">
              <Side />
            </Col>
            <Col lg="8" className="parent-flex">
              <div class="h-100 w-100 text-center">
                Some text
              </div>
            </Col>
          </Row>
        </Container>
      </>
    )
  }
}

export default Home;