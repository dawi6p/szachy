import React, { Component } from "react";
import { isExpired, decodeToken } from "react-jwt";
import { Navigate } from 'react-router-dom';
import NavBar from "./integrations/NavBar";

class Profile extends Component {

  constructor(props) {
		super(props);

    this.state = {
			token: String,
			TokenisLoaded: false
		};
  }

  componentDidMount() {
    fetch("/api")
    .then((res) => res.text())
    .then((String) => {
      this.setState({
        token: String,
        TokenisLoaded: true
      });
    })
  }

  render() {
    const { TokenisLoaded, token } = this.state;
    
    if(!TokenisLoaded) return '';
    if(isExpired(token)) return (<Navigate to="/Home" />);

    return (
      <div class='inline'>
        <NavBar/>

        <div class=" shadow rounded overflow-hidden d-flex"> 
            <div class="px-4 pt-0 pb-4 cover"> 
                <div class="media align-items-end profile-head"> 
                    <div class="profile mr-3">
                        <a href="#" class="btn btn-outline-dark btn-sm btn-block">Edit profile</a>
                    </div> 
                    <div class="media-body mb-5 text-white"> 
                        <h4 class="mt-0 mb-0">Dawid Gach</h4> 
                    </div> 
                </div> 
            </div> 
            <div class="bg-light d-flex justify-content-end text-center"> 
                <ul class="list-inline mb-0"> 
                    <li class="list-inline-item"> 
                        <h5 class="font-weight-bold mb-0 d-block">415</h5>
                        <small class="text-muted">victories</small> 
                    </li> 
                    <li class="list-inline-item"> 
                        <h5 class="font-weight-bold mb-0 d-block">104</h5>
                        <small class="text-muted">Draws</small> 
                    </li> 
                    <li class="list-inline-item"> 
                        <h5 class="font-weight-bold mb-0 d-block">340</h5>
                        <small class="text-muted">Defets</small> 
                    </li> 
                </ul> 
            </div> 
            <div class="px-4 py-3"> 
                <h5 class="mb-0">About</h5> 
                <div class="p-4 rounded shadow-sm bg-light"> 
                    <p class="font-italic mb-0">Web Developer</p> 
                    <p class="font-italic mb-0">Lives in New York</p> 
                    <p class="font-italic mb-0">Photographer</p> 
                </div> 
            </div> 
        </div>
      </div>
    );
  }
}

export default Profile;