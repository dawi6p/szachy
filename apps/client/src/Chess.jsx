import React, { Component } from "react";
import { isExpired, decodeToken } from "react-jwt";
import io from "socket.io-client";
import { Navigate } from 'react-router-dom';
import NavBar from "./integrations/NavBar";

import WithMoveValidation from "./integrations/WithMoveValidation";
var socket;

class Chess extends Component {
  constructor(props) {
		super(props);

    this.state = {
			token: String,
			TokenisLoaded: false,
      messages: [],
		};

    socket = io("http://localhost:3000");
  }

  getData = items => {
    console.log(items);
    this.setState({ messages: items });
  };
  
  componentDidMount() {
    fetch("/api")
    .then((res) => res.text())
    .then((String) => {
      this.setState({
        token: String,
        TokenisLoaded: true
      });
    })

    socket.emit('findAllMessages');
    socket.on("messages", this.getData);
  }

  render() {
    const { TokenisLoaded, token } = this.state;
    
    if(!TokenisLoaded) return '';
    if(isExpired(token)) return (<Navigate to="/Home" />);

    return (
      <div class='inline'>
        <NavBar/>
        <div style={boardsContainer} >
          <WithMoveValidation/>
        </div>
        {
            this.state.messages.map((item) => (
            <><td> {item.id} </td><td> {item.name}</td><td> {item.text} </td></>
          ))
        }
      </div>
    );
  }
}

export default Chess;

const boardsContainer = {
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  flexWrap: "wrap",
  width: "100vw",
  marginTop: 30,
  marginBottom: 50
};