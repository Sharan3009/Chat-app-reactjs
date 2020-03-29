import React from 'react';
import {Form,Button,Col,Row,Alert} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import style from './login.module.scss';
import { setFormData, afterFormSubmit,loginApi } from '../../actions/credentials-form.action';
import { connect } from 'react-redux';
import { reduxForm,Field,startSubmit,stopSubmit } from 'redux-form';
import {compose} from 'redux';
import Auth from "../../classes/Auth";
const formName = "login";

class Login extends React.Component {
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

  submitForm = (event) => {
    event.preventDefault();
    this.props.dispatch(startSubmit(formName));
    loginApi(this.props.email,this.props.password).then(
      (apiResponse)=>{
        this.props.dispatch(stopSubmit(formName));
        if(apiResponse.data){
          if(apiResponse.data.status===200){
          Auth.login(apiResponse.data.data);
          this.props.history.push("/home");
          } else {
            this.handleConfirmation(true,"warning",apiResponse.data.message);
          }
        }
      }
    ).catch(
      (apiError)=>{
        this.props.dispatch(stopSubmit(formName));
        let message = ""
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
          <Form.Label>Email address</Form.Label>
          <Field name="email" type="email" placeholder="Enter email"
            value={this.props.email} onChange={this.setForm} component={getFormControlField}/>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Field name="password" type="password" placeholder="Password"
            value={this.props.password} onChange={this.setForm} component={getFormControlField}/>
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check name="rememberMe" type="checkbox" label="Remember me"
            defaultChecked={this.props.rememberMe} onChange={this.setForm}/>
        </Form.Group>
        <Row>
          <Col>
            <Button variant="primary" type="submit" disabled={this.props.invalid|| this.props.submitting}>
              Login
            </Button>
          </Col>
          <Col className="d-flex align-items-center justify-content-end">
            <Link to={"signup"}>Create new Account</Link>
          </Col>
        </Row>
      </Form>
      </>
    )
  }
}

function getFormControlField({type,placeholder,input:{name,value,onChange},meta}){
    return (
        <Form.Control
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}/>
    )
}

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  }
  if (!values.password) {
    errors.password = 'Required'
  }
  return errors;
};


const mapStateToProps = ({credentialsForm}) => {
  let {email,password,rememberMe,afterSubmit} = credentialsForm;
  return {
    email,
    password,
    rememberMe,
    afterSubmit
  }
}

export default compose(
  connect(mapStateToProps),
  reduxForm({ 
    form: formName,
    validate })
)(Login)