import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import { selfRoomsApi } from '../../actions/side-component.action';
import style from './side-component.module.scss';
import { withRouter } from 'react-router-dom'; 
class Side extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }

    componentDidMount(){
        this.getSelfRooms();
    }

    getSelfRooms(){
        selfRoomsApi()
        .then(
        (apiResponse)=>{
            if(apiResponse.data){
                if(apiResponse.data.status===401){
                    localStorage.clear();
                    this.props.history.push("/login");
                }
            }
        })
        .catch(
        (apiError)=>{
            let message = ""
            if(apiError.data){
              message=apiError.data.message;
            }
        });
    }

    render(){
        return(
            <div className="parent-flex" id="side">
                <div className="list-group child-flex">
                    <a href="#" className="list-group-item list-group-item-action
                    flex-column align-items-start rounded-0">
                        <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-0 text-ellipsis line-height-1.5" title="This is some really big name that should start ellipsing">This is some really big name that should start ellipsing</h5>
                        </div>
                        <p className="mb-0">
                            Joined: 5/10
                        </p>
                        <small>Owner: You</small>
                    </a>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({sideComponent}) => {
    return {sideComponent}
  }
  
export default compose(
    connect(mapStateToProps),
    withRouter
)(Side)