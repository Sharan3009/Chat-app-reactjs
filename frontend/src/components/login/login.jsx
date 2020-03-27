import React from 'react';
import {Form,Button,Col,Row,Alert} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import axios from "axios";
import './login.scss';
import { setFormData, setFormValid, afterFormSubmit } from '../../actions/credentials-form';
import { connect } from 'react-redux';

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  setForm = (event) => {
    const {name,value} = event.target;
    this.props.dispatch(setFormData(name,value))
    .then(()=>this.validateForm())
  }

  submitForm = (event) => {
    event.preventDefault();
    this.props.dispatch(setFormValid(false));
    axios.post(`${process.env.REACT_APP_DOMAIN || ""}/api/v1/users/login`,
    {
      email:this.props.email,
      password:this.props.password
    }).then(
      (apiResponse)=>{
        this.props.dispatch(setFormValid(true));
        if(apiResponse.data){
          if(apiResponse.data.status===200){
          this.props.history.push("/home");
          } else {
            this.handleConfirmation(true,"warning",apiResponse.data.message);
          }
        }
      }
    ).catch(
      (apiError)=>{
        this.props.dispatch(setFormValid(true));
        let message = "Something went wrong!"
        if(apiError.data){
          message=apiError.data.message;
        }
        this.handleConfirmation(true,"danger",message);
      }
    );
  }

  validateForm = () =>{
    let bool = false;
    if(this.props.email && this.props.password){
      bool = true;
    }
    this.props.dispatch(setFormValid(bool));
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
          <Form.Control name="email" type="email" placeholder="Enter email"
            value={this.props.email} onChange={this.setForm}/>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control name="password" type="password" placeholder="Password"
            value={this.props.password} onChange={this.setForm}/>
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check name="rememberMe" type="checkbox" label="Remember me"
            defaultChecked={this.props.rememberMe} onChange={this.setForm}/>
        </Form.Group>
        <Row>
          <Col>
            <Button variant="primary" type="submit" disabled={!this.props.formValid}>
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

const mapStateToProps = ({credentialsForm}) => {
  let {email,password,rememberMe,formValid,afterSubmit} = credentialsForm;
  return {
    email,
    password,
    rememberMe,
    formValid,
    afterSubmit
  }
}

export default connect(mapStateToProps)(Login);