import React from 'react';
import {Form,Button} from 'react-bootstrap';
import './login.scss';

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email:"",
      password:"",
      rememberMe:false
    }
  }

  setForm = (event) => {
    const {name,value} = event.target;
    this.setState({[name]:value});
  }

  submitForm = () =>{
    console.log(this.state)
  }

  validateForm = () =>{
    if(this.state.email && this.state.password){
      return true;
    }
    return false;
  }

  render(){
    return(
      <div className="credentials-bg">
        <Form className="bg-white p-3 custom-form rounded" onSubmit={this.submitForm} method="POST">
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control name="email" type="email" placeholder="Enter email" value={this.state.email} onChange={this.setForm}/>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control name="password" type="password" placeholder="Password" value={this.state.password} onChange={this.setForm}/>
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check name="rememberMe" type="checkbox" label="Remember me" defaultChecked={this.state.rememberMe} onChange={this.setForm}/>
          </Form.Group>
          <Button variant="primary" type="submit" disabled={!this.validateForm()}>
            Login
          </Button>
        </Form>
      </div>
    )
  }
}

export default Login;