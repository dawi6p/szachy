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
      restore: false,
      from:"",
      to: "",
      match: false,
      white: Boolean,
      color: 'white',
      time1: 600,
      time2: 600,
      score: 100,
      opScore: {score: 100, name: "awaiting oponent"},
		};
    socket = io("http://localhost:3000");
  }

  callbackFunction = async (_fen) => {
    socket.emit('createChess', {text: _fen})
    this.setState({white: !this.state.white});
  }
  
  componentDidMount() {
    fetch("/api")
    .then((res) => res.text())
    .then((String) => {
      if(!isExpired(String))
      {
        var temp = decodeToken(String);
        socket.emit('join', {id: temp.id, name: temp.nickName});

        socket.on('white', (items) =>
        {
          if(items)
          {
            this.setState({
              color: 'black',
            });
          }

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

    fetch("/api/score/getLatestScore")
			.then((res) => res.json())
			.then((json) => {
        console.log(json)
				this.setState({
					score: json['score'],
				});
			})

    socket.on("message", (items) =>{
      socket.emit('findAllMessages', {}, (items) =>{
        this.setState({ messages: items });
      });
    });

    socket.on("chessMove", (items) =>{
      this.setState({
        from: items.text.from,
        to: items.text.to,
        white: !this.state.white
      });
    });

    socket.on("restoreChess", (items) =>{
      this.setState({
        restore: true,
        to: items.fen,
        match: true
        //white: items.turn
      });
    });

    socket.on("otherPlayer", (i) =>{
      this.setState({
        match: i,
      });
      var temp = decodeToken(this.state.token)
      socket.emit('oponentId', {id: temp.id})
    });

    socket.on("opId", (i) =>{
      console.log(i);
      fetch("/api/score/getLatestScoreName?id="+i)
			.then((res) => res.json())
			.then((json) => {
				this.setState({
					opScore: json,
				});
			})
    });

    this.timerInterval = setInterval(() => {
      if(!this.state.match) return;

      if(this.state.white){
        this.setState({
          time1: this.state.time1-0.1
        })
      }else{
        this.setState({
          time2: this.state.time2-0.1
        })
      }
    }, 100);
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
    if(isExpired(token)) return (<Navigate to="/Login" />);
    else{
      if(!this.state.done)
      {
        this.state.done = true;
      }
    }

    var temp = decodeToken(token);

    return (
      <div class='inline'>
        <NavBar/>
          {
            //!this.state.match &&
            //<h2 style={{color:'white'}}>awaiting oponent...</h2>
          }
          <div style={boardsContainer} >
            
            <div class='timer'>
              <div style={{textAlign: 'center'}}>
                <div style={{fontSize: '30px', background: "white"}}>
                  <span>{ Math.floor(this.state.time2/3600) }</span>:<span>{ Math.floor(this.state.time2/60)%60 }</span>:<span>{ Math.floor(this.state.time2)%60 }</span>
                </div>
                <div>
                  <p class="text-white">{this.state.score}</p>
                  <p class="text-success" >{temp.nickName}</p>
                </div>
              </div>
            </div>
            <WithMoveValidation 
              parentCallback = {this.callbackFunction} 
              opMovef = {this.state.from} 
              opMovet  = {this.state.to} 
              white = {this.state.white} 
              restore = {this.state.restore}
              color = {this.state.color} 
              match = {this.state.match}/>
            <div class='timer'>
              <div style={{textAlign: 'center'}}>
                <div style={{fontSize: '30px', background: "white"}}>
                  <span>{ Math.floor(this.state.time1/3600) }</span>:<span>{ Math.floor(this.state.time1/60)%60 }</span>:<span>{ Math.floor(this.state.time1)%60 }</span>
                </div>
                <div>
                  <p class="text-white">{this.state.opScore['score']}</p>
                  <p class="text-danger" >{this.state.opScore['name']}</p>
                </div>
              </div>
            </div>
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