import React from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import './signup.scss';

class SignUp extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      firstName:'',
      lastName:'',
      email:'',
      password:'',
      confirmPassword:''
    }
  }

  setForm = (event) => {
    const key = event.target.name;
    const value = event.target.value;
    this.setState({[key]:value});
  }

  submitForm = () =>{
    console.log(this.state)
  }

  render(){
    return(
     <div className="credentials-bg">
       <Form className="bg-white p-3 custom-form rounded" onSubmit={this.submitForm}>
       <Form.Row>
          <Form.Group as={Col} controlId="formGridFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control name="firstName" type="text" placeholder="First Name" value={this.state.firstName} onChange={this.setForm} />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control name="lastName" type="text" placeholder="Enter last name" value={this.state.lastName} onChange={this.setForm} />
          </Form.Group>
        </Form.Row>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control name="email" type="email" placeholder="Enter email" value={this.state.email} onChange={this.setForm}/>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control name="password" type="password" placeholder="Password" value={this.state.password} onChange={this.setForm} />
        </Form.Group>
        <Form.Group controlId="formBasicConfirmPasswod">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control name="confirmPassword" type="password" placeholder="Re-enter password" value={this.state.confirmPassword} onChange={this.setForm}/>
        </Form.Group>
        <Button variant="primary" type="submit">
          Sign Up
        </Button>
      </Form>
     </div>
    )
  }
}

export default SignUp;