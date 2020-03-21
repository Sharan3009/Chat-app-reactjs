import React from 'react';
import {Button, Modal} from 'react-bootstrap';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      show:false
    }
  }
  
  setShow(bool){
    this.setState({show:bool});
  }

  handleClose(){
    this.setShow(false);
  }

  handleShow(){
    this.setShow(true);
  }

  render(){
    return(
      <>
      <Button variant="primary" onClick={this.handleShow.bind(this)}>
        Open Modal
      </Button>

      <Modal show={this.state.show} onHide={this.handleClose.bind(this)}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose.bind(this)}>
            Close
          </Button>
          <Button variant="primary" onClick={this.handleClose.bind(this)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    )
  }
}

export default App;