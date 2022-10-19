import React from 'react';
import { Form, Button, Col,Row, Alert } from 'react-bootstrap';
import { 
  afterFormSubmit,
  setFormData,
  genearteOTP,
  verifyOTP} from '../../actions/credentials-form.action';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Field, reduxForm,startSubmit,stopSubmit } from 'redux-form';
import { userDetails } from '../../higher-order-components/user';
import AppNavbar from '../app-navbar/app-navbar';
const formName = "signup";

class Auth extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      screenOne: true
    }
  }

  UNSAFE_componentWillMount(){
    this.handleConfirmation(false);
  }

  setForm = (event) => {
    const {name,value} = event.target;
    this.props.dispatch(setFormData(name,value))
  }

  submitOTPForm = (event) =>{
    event.preventDefault();
    this.props.dispatch(startSubmit(formName));
    genearteOTP(this.props.email)
    .then(
      (apiResponse)=>{
        this.props.dispatch(stopSubmit(formName));
        if(apiResponse.data){
          if(apiResponse.data.status===200){
            this.props.setUserDetailsInStorage(apiResponse.data.data);
            this.handleConfirmation(true,"success",apiResponse.data.message);
            this.setState({screenOne: false});
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

  submitVerifyOTPForm = (event) =>{
    event.preventDefault();
    this.props.dispatch(startSubmit(formName));
    verifyOTP(this.props.getUserDetailsFromStorage().userId,this.props.otp)
    .then(
      (apiResponse)=>{
        this.props.dispatch(stopSubmit(formName));
        if(apiResponse.data){
          if(apiResponse.data.status===200){
            this.props.history.push("/room");
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
      <AppNavbar/>
      <div className="parent-flex">
     <div className="credentials-bg"></div>
     {
     (()=>{
      if(this.state.screenOne){
          return(
            <>
          <Form className="bg-white p-3 custom-form rounded" onSubmit={this.submitOTPForm}>
            <Alert variant="info">
            Please enter a college email address ending in <b>hawk.iit.edu</b> to verify you're in college.
            We'll email you to verify your college address, and that's all. 
            </Alert>
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
      } else {
          return (
          <Form className="bg-white p-3 custom-form rounded" onSubmit={this.submitVerifyOTPForm} autoComplete="off">
            {this.props.afterSubmit.show && 
            (<Alert variant={this.props.afterSubmit.variant} 
            onClose={() => this.handleConfirmation(false)} dismissible>
              {this.props.afterSubmit.message}
            </Alert>)}
            <Form.Group controlId="formBasicEmail">
              <Field label="Enter OTP" name="otp" 
                type="text" placeholder="OTP"
                value={this.props.otp}
                onChange={this.setForm}
                component={getFormControlField}/>
            </Form.Group>
            <Row>
              <Col>
                <Button variant="primary" type="submit" disabled={this.props.invalid || this.props.submitting}>
                  Verify
                </Button>
              </Col>
            </Row>
          </Form>
          )
      }
     })()
     }
     </div>
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

const validate = ({email,otp}) => {
  const errors = {};
  if (!email) {
    errors.email = "Email is required";
  } else if(!(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(email))){
    errors.email = "Email is invalid";
  }
  if (!otp) {
    errors.otp = "OTP is required";
  }
  return errors;
};


const mapStateToProps = ({credentialsForm}) => {
  let { email, otp, afterSubmit } = credentialsForm;
  return {
    email, otp, afterSubmit 
  }
}

export default compose(
  connect(mapStateToProps),
  reduxForm({ 
    form: formName,
    validate }),
  userDetails
)(Auth)