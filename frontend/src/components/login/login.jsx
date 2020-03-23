import React from 'react';
import {Form,Button} from 'react-bootstrap';
import './login.scss';

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  render(){
    return(
      <div className="credentials-bg">
        <Form className="bg-white p-3 custom-form rounded">
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Remember me" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </div>
    )
  }
}

export default Login;