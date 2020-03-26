import React from 'react';
import {Form,Button,Col,Row,Alert} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import axios from "axios";
import './login.scss';
import { FORM_VALID } from '../../actions/credentials-form';
import { connect } from 'react-redux';

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email:"",
      password:"",
      rememberMe:false,
      loginConfirmation:{
        show:false,
        variant:"",
        message:""
      }
    }
  }

  setForm = (event) => {
    const {name,value} = event.target;
    this.setState({[name]:value},()=>this.validateForm());
  }

  submitForm = (event) =>{
    event.preventDefault();
    this.props.dispatch({type:FORM_VALID,value:false});
    axios.post(`${process.env.REACT_APP_DOMAIN || ""}/api/v1/users/login`,
    {
      email:this.state.email,
      password:this.state.password
    }).then(
      (apiResponse)=>{
        this.props.dispatch({type:FORM_VALID,value:true});
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
        this.props.dispatch({type:FORM_VALID,value:true});
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
    if(this.state.email && this.state.password){
      bool = true;
    }
    this.props.dispatch({type:FORM_VALID,value:bool});
  }

  handleConfirmation = (show,variant,message) =>{
    let loginState = this.state.loginConfirmation;
    loginState.show = show;
    loginState.message = message || "";
    loginState.variant = variant || "";
    this.setState({loginConfirmation:loginState});
  }

  render(){
    return(
      <div className="credentials-bg">
        <Form className="bg-white p-3 custom-form rounded" onSubmit={this.submitForm}>
        {this.state.loginConfirmation.show && 
        (<Alert variant={this.state.loginConfirmation.variant} onClose={() => this.handleConfirmation(false)} dismissible>
          {this.state.loginConfirmation.message}
       </Alert>)}
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control name="email" type="email" placeholder="Enter email" value={this.state.email} onChange={this.setForm}/>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control name="password" type="password" placeholder="Password" value={this.state.password} onChange={this.setForm}/>
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check name="rememberMe" type="checkbox" label="Remember me" defaultChecked={this.state.rememberMe} onChange={this.setForm}/>
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
      </div>
    )
  }
}

const mapStateToProps = ({credentialsForm}) => {
  return {
    formValid: credentialsForm.formValid
  };
}

export default connect(mapStateToProps)(Login);