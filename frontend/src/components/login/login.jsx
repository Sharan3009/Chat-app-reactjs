import React from 'react';
import {Form,Button,Col,Row,Alert} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import axios from "axios";
import './login.scss';
import { FORM_VALID,AFTER_SUBMIT,FORM_HANDLER } from '../../actions/credentials-form';
import { connect } from 'react-redux';
import { Action } from '../../classes/Action';

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  setForm = (event) => {
    const {name,value} = event.target;
    this.props.dispatch(this.setFormDispatchPromise(name,value))
    .then(()=>this.validateForm())
  }

  setFormDispatchPromise = (name,value)=>{
    return function(dispatch){
      let action = {...new Action(FORM_HANDLER,{name,value})};
      dispatch(action);
      return Promise.resolve();
    }
  }

  submitForm = (event) =>{
    event.preventDefault();
    let action = {...new Action(FORM_VALID,false)};
    this.props.dispatch(action);
    axios.post(`${process.env.REACT_APP_DOMAIN || ""}/api/v1/users/login`,
    {
      email:this.props.email,
      password:this.props.password
    }).then(
      (apiResponse)=>{
        action.payload = true;
        this.props.dispatch(action);
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

  validateForm = () =>{
    let bool = false;
    if(this.props.email && this.props.password){
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