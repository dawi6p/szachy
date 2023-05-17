import React, { Component} from "react";
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
    this.setState({ messages: items });
  };

  changeData = () => {
    var sendMessage = {id: decodeToken(token).id, name: decodeToken(token).nickName, text: message };
    socket.emit("createMessage", sendMessage);
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

    socket.emit('findAllMessages');
    socket.on("messages", this.getData);
    socket.on("message", this.changeData);
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
        <div class="chat">
          <div class="user-box w-100">
            <form>
              <input 
                type="text" 
                name="Wiadomość" 
                required
              />
              <label>Wiadomość</label>
              </form>
            </div>
            {
              this.state.messages.map((item) => (
              <div class="text-white">{item.name}: {item.text}</div>
              ))
            }
         </div>
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