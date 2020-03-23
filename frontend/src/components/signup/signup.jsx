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

  setForm(key,event){
    this.setState({[key]:event.target.value});
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
            <Form.Control type="text" placeholder="First Name" value={this.state.firstName} onChange={(e)=>this.setForm("firstName",e)} />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" placeholder="Enter last name" value={this.state.lastName} onChange={(e)=>this.setForm("lastName",e)} />
          </Form.Group>
        </Form.Row>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={this.state.email} onChange={(e)=>this.setForm("email",e)}/>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={this.state.password} onChange={(e)=>this.setForm("password",e)} />
        </Form.Group>
        <Form.Group controlId="formBasicConfirmPasswod">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" placeholder="Re-enter password" value={this.state.confirmPassword} onChange={(e)=>this.setForm("confirmPassword",e)}/>
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