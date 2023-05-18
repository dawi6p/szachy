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
      messageText: String,
      done: false,
		};

    socket = io("http://localhost:3000");
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

    socket.emit('findAllMessages', {}, (items) =>{
      this.setState({ messages: items });
    });

    socket.on("message", (items) =>{
      socket.emit('findAllMessages', {}, (items) =>{
        this.setState({ messages: items });
      });
    });
  }

  sendMessage = e =>{
    e.preventDefault();
    socket.emit('createMessage', {text: this.state.messageText})
  }

  handleMessageTextChanged(event) {
    this.setState({ messageText: event.target.value });
  }

  render() {
    const { TokenisLoaded, token } = this.state;
    
    if(!TokenisLoaded) return '';
    if(isExpired(token)) return (<Navigate to="/Home" />);
    else{
      if(!this.state.done)
      {
        this.state.done = true;
        var temp = decodeToken(token);

        socket.emit('join', {id: temp.id, name: temp.nickName});
      }
      
    }

    return (
      <div class='inline'>
        <NavBar/>
        <div style={boardsContainer} >
          <WithMoveValidation/>
        </div>
        <div class="chat">
          <div class="user-box w-100">
            <form onSubmit={this.sendMessage}>
                <input 
                  required
                  value={this.state.messageText}
                  onChange={this.handleMessageTextChanged.bind(this)}
                />
              <label>Wiadomość</label>
            </form>
            </div>
            <div class='messageList'>
              {
                this.state.messages.map((item) => (
                <div class="text-white">{item.name}: {item.text}</div>
                ))
              }
            </div>
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