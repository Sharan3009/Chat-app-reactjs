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
      confirmPassword:'',
      formErrors: {
        firstName:"",
        email:"",
        password:"",
        confirmPassword:""
      },
      formValid:false
    }
  }

  setForm = (event) => {
    const {name,value} = event.target
    this.setState({[name]:value},()=>this.validateField(name,value));
  }

  submitForm = () =>{
    console.log(this.state)
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    switch(fieldName) {
      case "firstName":
      fieldValidationErrors.firstName = value ? '': 'First Name cannot be empty';
      break;
      case 'email':
        let emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : 'Email is invalid';
        break;
      case 'password':
        let passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '': 'Password is too short';
        break;
      case "confirmPassword":
        let confirmPasswordValid = value === this.state.password;
        fieldValidationErrors.password = confirmPasswordValid ? '': 'Passwords do not match';
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                  }, this.validateForm);
  }
  
  validateForm() {
    let formErrors = this.state.formErrors;
    this.setState({formValid: !formErrors.firstName && !formErrors.email && !formErrors.password && !formErrors.confirmPassword});
  }

  render(){
    return(
     <div className="credentials-bg">
       <Form className="bg-white p-3 custom-form rounded" onSubmit={this.submitForm}>
       <Form.Row>
          <Form.Group as={Col} controlId="formGridFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control name="firstName" type="text" placeholder="First Name" value={this.state.firstName} onChange={this.setForm} isInvalid={this.state.formErrors.firstName} />
            <Form.Control.Feedback type="invalid">
              {this.state.formErrors.firstName}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} controlId="formGridLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control name="lastName" type="text" placeholder="Enter last name" value={this.state.lastName} onChange={this.setForm} />
          </Form.Group>
        </Form.Row>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control name="email" type="email" placeholder="Enter email" value={this.state.email} onChange={this.setForm} isInvalid={this.state.formErrors.email}/>
          <Form.Control.Feedback type="invalid">
              {this.state.formErrors.email}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control name="password" type="password" placeholder="Password" value={this.state.password} onChange={this.setForm} isInvalid={this.state.formErrors.password} />
          <Form.Control.Feedback type="invalid">
              {this.state.formErrors.password}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formBasicConfirmPasswod">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control name="confirmPassword" type="password" placeholder="Re-enter password" value={this.state.confirmPassword} onChange={this.setForm} isInvalid={this.state.formErrors.confirmPassword}/>
          <Form.Control.Feedback type="invalid">
              {this.state.formErrors.confirmPassword}
          </Form.Control.Feedback>
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