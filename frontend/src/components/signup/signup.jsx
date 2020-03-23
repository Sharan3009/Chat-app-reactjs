import React from 'react';
import { Form, Button, Col,Row, Alert } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './signup.scss';
import axios from "axios";

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
        confirmPassword:{
          status:"",
          text:""
        }
      },
      formTouched:{
        firstName:false,
        email:false,
        password:false,
        confirmPassword:false
      },
      formValid:false,
      registerConfirmation:{
        show:false,
        variant:"",
        message:""
      }
    }
  }

  setForm = (event) => {
    const {name,value} = event.target
    this.setState({[name]:value},()=>this.validateField(name,value));
  }

  setTouched = (event) => {
    const {name,value} = event.target
    let formTouched = this.state.formTouched;
    formTouched[name] = true;
    this.setState({formTouched},()=>this.validateField(name,value));
  }

  submitForm = (event) =>{
    event.preventDefault();
    this.setState({formValid:false});
    axios.post(`${process.env.REACT_APP_DOMAIN || ""}/api/v1/users/signup`,
    {
      firstName:this.state.firstName,
      lastName:this.state.lastName,
      email:this.state.email,
      password:this.state.password
    }).then(
      (apiResponse)=>{
        this.setState({formValid:true});
        if(apiResponse.data){
          if(apiResponse.data.status===200){
            this.handleConfirmation(true,"success",apiResponse.data.message);
          } else {
            this.handleConfirmation(true,"warning",apiResponse.data.message);
            this.setState({formValid:false});
          }
        }
      }
    ).catch(
      (apiError)=>{
        this.setState({formValid:true});
        let message = "Something went wrong!"
        if(apiError.data){
          message=apiError.data.message;
        }
        this.handleConfirmation(true,"danger",message);
      }
    );
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    switch(fieldName) {
      case "firstName":
        if(this.state.formTouched[fieldName]){
          fieldValidationErrors.firstName = value ? '': 'First Name cannot be empty';
        }
      break;
      case 'email':
        if(this.state.formTouched[fieldName]){
          let emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
          fieldValidationErrors.email = emailValid ? '' : 'Email is invalid';
        }
        break;
      case 'password':
        if(this.state.formTouched[fieldName]){
          let passwordValid = value.length >= 8;
          fieldValidationErrors.password = passwordValid ? '': 'Password is too short';
        }
        break;
      case "confirmPassword":
        if(value){
          if(value===this.state.password){
            fieldValidationErrors.confirmPassword.status = "valid";
            fieldValidationErrors.confirmPassword.text = "Passwords Matched";
          } else {
            fieldValidationErrors.confirmPassword.status = "invalid";
            fieldValidationErrors.confirmPassword.text = "Passwords do not match";
          }
        } else {
          fieldValidationErrors.confirmPassword.status = "";
          fieldValidationErrors.confirmPassword.text = "";
        }
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                  }, this.validateForm);
  }
  
  validateForm() {
    let formErrors = this.state.formErrors;
    this.setState({formValid: !formErrors.firstName && !formErrors.email && !formErrors.password && formErrors.confirmPassword.status==="valid"});
  }

  handleConfirmation = (show,variant,message) =>{
    let registerationState = this.state.registerConfirmation;
    registerationState.show = show;
    registerationState.message = message || "";
    registerationState.variant = variant || "";
    this.setState({registerConfirmation:registerationState});
  }
  render(){
    return(
     <div className="credentials-bg">
       <Form className="bg-white p-3 custom-form rounded" onSubmit={this.submitForm}>
       {this.state.registerConfirmation.show && 
        (<Alert variant={this.state.registerConfirmation.variant} onClose={() => this.handleConfirmation(false)} dismissible>
          {this.state.registerConfirmation.message}
       </Alert>)}
       <Form.Row>
          <Form.Group as={Col} controlId="formGridFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control name="firstName" type="text" placeholder="First Name" 
            value={this.state.firstName} 
            onChange={this.setForm} 
            isInvalid={this.state.formErrors.firstName}
            onBlur={this.setTouched} />
            <Form.Control.Feedback type="invalid">
              {this.state.formErrors.firstName}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} controlId="formGridLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control name="lastName" type="text" placeholder="Enter last name" 
            value={this.state.lastName} 
            onChange={this.setForm}
            onBlur={this.setTouched} />
          </Form.Group>
        </Form.Row>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control name="email" type="email" placeholder="Enter email"
          value={this.state.email}
          onChange={this.setForm}
          isInvalid={this.state.formErrors.email}
          onBlur={this.setTouched}/>
          <Form.Control.Feedback type="invalid">
              {this.state.formErrors.email}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control name="password" type="password" placeholder="Password"
          value={this.state.password}
          onChange={this.setForm}
          isInvalid={this.state.formErrors.password}
          onBlur={this.setTouched} />
          <Form.Control.Feedback type="invalid">
              {this.state.formErrors.password}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formBasicConfirmPasswod">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control name="confirmPassword" type="password" placeholder="Re-enter password" 
          value={this.state.confirmPassword} 
          onChange={this.setForm} 
          isInvalid={this.state.formErrors.confirmPassword.status==="invalid"}
          isValid={this.state.formErrors.confirmPassword.status==="valid"}/>
          <Form.Control.Feedback type={this.state.formErrors.confirmPassword.status}>
              {this.state.formErrors.confirmPassword.text}
          </Form.Control.Feedback>
        </Form.Group>
        <Row>
          <Col>
            <Button variant="primary" type="submit" disabled={!this.state.formValid}>
              Sign Up
            </Button>
          </Col>
          <Col className="d-flex align-items-center justify-content-end">
            <Link to={"login"}>Already a User?</Link>
          </Col>
        </Row>
      </Form>
     </div>
    )
  }
}

export default SignUp;