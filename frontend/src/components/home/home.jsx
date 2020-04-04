import React from 'react';
import style from './home.module.scss';
import AppNavbar from '../app-navbar';
import Side from '../side-component/';
import Main from '../main-component/';
import { Container, Row, Col } from 'react-bootstrap';
import { socketConnect, socketDisconnect,socketOn,socketEmit } from '../../actions/socket.action';
import { connect } from 'react-redux';
import { compose } from 'redux';

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

  getCookieValue(name){
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) return match[2];
  }

  render(){
    return(
      <div className="parent-flex">
        <AppNavbar />
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
      </div>
    )
  }
}

const mapStateToProps = ({homeComponent}) => {
  return homeComponent
}

export default compose(
  connect(mapStateToProps)
)(Home)