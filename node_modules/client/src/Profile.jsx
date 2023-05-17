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
        <div class="cover"> 
          <div class="media align-items-end profile-head"> 
            <div class="profile mr-5 ml-5">
              <img src="/vite.svg" alt="profilePic" height='75' width='75' class='imgProfile'></img>
              <a href="#" class="btn btn-outline-dark btn-sm btn-block">Edit profile</a>
            </div> 
            
            <div class="media-body mb-5 text-white"> 
              <h4 class="mt-0 mb-0">Dawid Gach</h4> 
            </div> 
            <div class="d-flex justify-content-end text-center"> 
              <ul class="list-inline mb-0 mr-5 ml-5"> 
                <li class="list-inline-item text-success"> 
                  <h5 class="font-weight-bold mb-0">415</h5>
                  <small>victories</small> 
                </li> 
                <li class="list-inline-item text-secondary"> 
                  <h5 class="font-weight-bold mb-0">104</h5>
                  <small>Draws</small> 
                </li> 
                <li class="list-inline-item text-danger"> 
                  <h5 class="font-weight-bold mb-0">340</h5>
                  <small>Defets</small> 
                </li> 
              </ul> 
            </div> 
          </div> 
          <div class="px-4 py-3"> 
            <h5 class="mb-0">About</h5> 
            <div class="p-4 rounded shadow-sm bg-light profileTextField"> 
              <p class="font-italic mb-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa explicabo amet corrupti perspiciatis nulla quidem voluptates,<br/> mollitia repudiandae, odit quo obcaecati accusantium sapiente inventore sint? Aspernatur nobis rem distinctio assumenda.</p> 
            </div> 
          </div>
        </div> 
      </div>
    );
  }
}

export default Profile;