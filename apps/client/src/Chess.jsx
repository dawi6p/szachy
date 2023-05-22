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
      from:"",
      to: "",
      white: Boolean,
		};

    socket = io("http://localhost:3000");
  }

  callbackFunction = async (_fen) => {
    /*await this.setState({
      fen: _fen,
    });*/
    socket.emit('createChess', {text: _fen})
    //socket.emit('findAllChess');
    //console.log(_fen);
  }
  
  componentDidMount() {
    fetch("/api")
    .then((res) => res.text())
    .then((String) => {
      if(!isExpired(String))
      {
        var temp = decodeToken(String);
        socket.emit('join', {id: temp.id, name: temp.nickName});
        socket.on('white', (items) =>{
          console.log(items)
          this.setState({
            white: items,
          });
        });

        socket.emit('findAllMessages', {}, (items) =>{
        this.setState({ messages: items });
      });
      }
      
      this.setState({
        token: String,
        TokenisLoaded: true
      });
    })

    socket.on("message", (items) =>{
      socket.emit('findAllMessages', {}, (items) =>{
        this.setState({ messages: items });
      });
    });

    socket.on("chessMove", (items) =>{
      console.log(items)
      this.setState({
        from: items.text.from,
        to: items.text.to,
      });
    });
  }

  sendMessage = e =>{
    e.preventDefault();
    socket.emit('createMessage', {text: this.state.messageText});
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

      }
      
    }

    return (
      <div class='inline'>
        <NavBar/>
        <div style={boardsContainer} >
          <WithMoveValidation parentCallback = {this.callbackFunction} opMovef = {this.state.from} opMovet  = {this.state.to} white = {this.state.white}/>
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