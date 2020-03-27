import React from 'react';
import { Form, Button, Col,Row, Alert } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './signup.scss';
import axios from "axios";
import { 
  FORM_VALID,AFTER_SUBMIT,
  FORM_HANDLER,
  FORM_FIELD_ERROR_HANDLER,
  FORM_FIELD_TOUCHED_HANDLER } from '../../actions/credentials-form';
import { connect } from 'react-redux';
import { Action } from '../../classes/Action';

class SignUp extends React.Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  setForm = (event) => {
    const {name,value} = event.target;
    this.props.dispatch(this.setFormDispatchPromise(FORM_HANDLER,{name,value}))
    .then(()=>this.validateField(name,value))
  }

  setFormDispatchPromise = (type,data)=>{
    return function(dispatch){
      let action = {...new Action(type,data)};
      dispatch(action);
      return Promise.resolve();
    }
  }

  setTouched = (event) => {
    const {name,value} = event.target
    let formTouched = this.props.formTouched;
    formTouched[name] = true;
    this.props.dispatch(this.setFormTouchedDispatchPromise(formTouched))
    .then(()=>this.validateField(name,value));
  }

  setFormTouchedDispatchPromise = (formTouched)=>{
    return function(dispatch){
      let action = {...new Action(FORM_FIELD_TOUCHED_HANDLER,formTouched)};
      dispatch(action);
      return Promise.resolve();
    }
  }

  submitForm = (event) =>{
    event.preventDefault();
    let action = {...new Action(FORM_VALID,false)};
    this.props.dispatch(action);
    axios.post(`${process.env.REACT_APP_DOMAIN || ""}/api/v1/users/signup`,
    {
      firstName:this.props.firstName,
      lastName:this.props.lastName,
      email:this.props.email,
      password:this.props.password
    }).then(
      (apiResponse)=>{
        action.payload = true;
        this.props.dispatch(action);
        if(apiResponse.data){
          if(apiResponse.data.status===200){
            this.handleConfirmation(true,"success",apiResponse.data.message);
          } else {
            this.handleConfirmation(true,"warning",apiResponse.data.message);
            action.payload = false;
            this.props.dispatch(action);
          }
        }
      }
    ).catch(
      (apiError)=>{
        action.payload = true;
        this.props.dispatch(action);
        let message = "Something went wrong!"
        if(apiError.data){
          message=apiError.data.message;
        }
        this.handleConfirmation(true,"danger",message);
      }
    );
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.props.formErrors;
    switch(fieldName) {
      case "firstName":
        if(this.props.formTouched[fieldName]){
          fieldValidationErrors.firstName = value ? '': 'First Name cannot be empty';
        }
      break;
      case 'email':
        if(this.props.formTouched[fieldName]){
          let emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
          fieldValidationErrors.email = emailValid ? '' : 'Email is invalid';
        }
        break;
      case 'password':
        if(this.props.formTouched[fieldName]){
          let passwordValid = value.length >= 8;
          fieldValidationErrors.password = passwordValid ? '': 'Password is too short';
        }
        break;
      case "confirmPassword":
        if(value){
          if(value===this.props.password){
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
    this.props
    .dispatch(this.setFormDispatchPromise(FORM_FIELD_ERROR_HANDLER,fieldValidationErrors))
    .then(()=>this.validateForm())
  }
  
  validateForm() {
    let formErrors = this.props.formErrors;
    let bool = false;
    if(!formErrors.firstName && !formErrors.email 
      && !formErrors.password && formErrors.confirmPassword.status==="valid"){
      bool = true;
    }
    let action = {...new Action(FORM_VALID,bool)}
    this.props.dispatch(action);
  }

  handleConfirmation = (show,variant,message) =>{
    let action = {...new Action(AFTER_SUBMIT,{show,message,variant})}
    this.props.dispatch(action);
  }
  render(){
    return(
     <div className="credentials-bg">
       <Form className="bg-white p-3 custom-form rounded" onSubmit={this.submitForm}>
       {this.props.afterSubmit.show && 
        (<Alert variant={this.props.afterSubmit.variant} 
        onClose={() => this.handleConfirmation(false)} dismissible>
          {this.props.afterSubmit.message}
       </Alert>)}
       <Form.Row>
          <Form.Group as={Col} controlId="formGridFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control name="firstName" type="text" placeholder="First Name" 
            value={this.props.firstName} 
            onChange={this.setForm} 
            isInvalid={this.props.formErrors.firstName}
            onBlur={this.setTouched} />
            <Form.Control.Feedback type="invalid">
              {this.props.formErrors.firstName}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} controlId="formGridLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control name="lastName" type="text" placeholder="Enter last name" 
            value={this.props.lastName} 
            onChange={this.setForm}
            onBlur={this.setTouched} />
          </Form.Group>
        </Form.Row>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control name="email" type="email" placeholder="Enter email"
          value={this.props.email}
          onChange={this.setForm}
          isInvalid={this.props.formErrors.email}
          onBlur={this.setTouched}/>
          <Form.Control.Feedback type="invalid">
              {this.props.formErrors.email}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control name="password" type="password" placeholder="Password"
          value={this.props.password}
          onChange={this.setForm}
          isInvalid={this.props.formErrors.password}
          onBlur={this.setTouched} />
          <Form.Control.Feedback type="invalid">
              {this.props.formErrors.password}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formBasicConfirmPasswod">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control name="confirmPassword" type="password" placeholder="Re-enter password" 
          value={this.props.confirmPassword} 
          onChange={this.setForm} 
          isInvalid={this.props.formErrors.confirmPassword.status==="invalid"}
          isValid={this.props.formErrors.confirmPassword.status==="valid"}/>
          <Form.Control.Feedback type={this.props.formErrors.confirmPassword.status}>
              {this.props.formErrors.confirmPassword.text}
          </Form.Control.Feedback>
        </Form.Group>
        <Row>
          <Col>
            <Button variant="primary" type="submit" disabled={!this.props.formValid}>
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

const mapStateToProps = ({credentialsForm}) => {
  let { firstName, lastName, email,
    password, confirmPassword, formValid,
    afterSubmit, formErrors, formTouched } = credentialsForm;
  return {
    firstName, lastName, email,
    password, confirmPassword, formValid,
    afterSubmit, formErrors, formTouched
  }
}

export default connect(mapStateToProps)(SignUp);