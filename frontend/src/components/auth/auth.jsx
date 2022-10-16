import React from 'react';
import { Form, Button, Col,Row, Alert } from 'react-bootstrap';
import { 
  afterFormSubmit,
  setFormData,
  signUpApi} from '../../actions/credentials-form.action';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Field, reduxForm,startSubmit,stopSubmit } from 'redux-form';
const formName = "signup";

class Auth extends React.Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  UNSAFE_componentWillMount(){
    this.handleConfirmation(false);
  }

  setForm = (event) => {
    const {name,value} = event.target;
    this.props.dispatch(setFormData(name,value))
  }

  submitForm = (event) =>{
    event.preventDefault();
    this.props.dispatch(startSubmit(formName));
    let {firstName,lastName,email,password}=this.props;
    signUpApi(firstName,lastName,email,password)
    .then(
      (apiResponse)=>{
        this.props.dispatch(stopSubmit(formName));
        if(apiResponse.data){
          if(apiResponse.data.status===200){
            this.handleConfirmation(true,"success",apiResponse.data.message);
          } else {
            this.handleConfirmation(true,"warning",apiResponse.data.message);
          }
        }
      })
      .catch(
      (apiError)=>{
        this.props.dispatch(stopSubmit(formName));
        let message = "";
        if(apiError.data){
          message=apiError.data.message;
        }
        this.handleConfirmation(true,"danger",message);
      }
    );
  }

  handleConfirmation = (show,variant,message) =>{
    this.props.dispatch(afterFormSubmit(show,message,variant));
  }

  render(){
    return(
      <>
     <div className="credentials-bg"></div>
      <Form className="bg-white p-3 custom-form rounded" onSubmit={this.submitForm}>
      {this.props.afterSubmit.show && 
      (<Alert variant={this.props.afterSubmit.variant} 
      onClose={() => this.handleConfirmation(false)} dismissible>
        {this.props.afterSubmit.message}
      </Alert>)}
      <Form.Group controlId="formBasicEmail">
        <Field label="Email address" name="email" 
          type="email" placeholder="someone@hawk.iit.edu"
          value={this.props.email}
          onChange={this.setForm}
          component={getFormControlField} />
      </Form.Group>
      <Row>
        <Col>
          <Button variant="primary" type="submit" disabled={this.props.invalid || this.props.submitting}>
            GET OTP
          </Button>
        </Col>
      </Row>
    </Form>
    </>
    )
  }
}

const getFormControlField = ({type,placeholder,label, input ,meta:{error,touched,valid,dirty}})=>{
  let isError = null;
  if(error && touched){
    isError = true;
  } else {
    isError = false;
  }
  return (
    <>
      <Form.Label>{label}</Form.Label>
      <Form.Control
      {...input}
      type={type} placeholder={placeholder} 
      isInvalid={isError}
      isValid={dirty && valid}
      />
      <Form.Control.Feedback type="invalid">
        {(isError)?error:""}
      </Form.Control.Feedback>
    </>
  )
}

const validate = ({firstName,email,password,confirmPassword}) => {
  const errors = {};
  if (!firstName) {
    errors.firstName = "First name is required";
  }
  if (!email) {
    errors.email = "Email is required";
  } else if(!(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(email))){
    errors.email = "Email is invalid";
  }

  if (!password) {
    errors.password = "Password is required";
  } else if(password.length < 8){
    errors.password = "Password must be atleast 8 digits";
  }

  if (!confirmPassword) {
    errors.confirmPassword = "Password is required";
  } else if(confirmPassword !== password){
    errors.confirmPassword = "Passwords do not match";
  }
  return errors;
};


const mapStateToProps = ({credentialsForm}) => {
  let { firstName, lastName, email,
    password, confirmPassword, afterSubmit } = credentialsForm;
  return {
    firstName, lastName, email,
    password, confirmPassword, afterSubmit
  }
}

export default compose(
  connect(mapStateToProps),
  reduxForm({ 
    form: formName,
    validate })
)(Auth)