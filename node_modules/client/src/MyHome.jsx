import React, { Component} from "react";
import { isExpired } from "react-jwt";
import io from "socket.io-client";
import { Navigate } from 'react-router-dom';
import NavBar from "./integrations/NavBar";

var socket;

class MyHome extends Component {
  constructor(props) {
		super(props);

    this.state = {
		token: String,
		TokenisLoaded: false,
        matchType: [],
        matchTypeIsLoaded: false,
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
    fetch("/api/matchtype/getAllMatchtype")
    .then((res) => res.json())
    .then((json) => {
        this.setState({
            matchType: json,
            matchTypeIsLoaded: true,
        });
    })
  }

  render() {
    const { TokenisLoaded, token, matchType, matchTypeIsLoaded } = this.state;

    if(!TokenisLoaded) return '';
    if(isExpired(token)) return (<Navigate to="/Home" />);

    let matchTypeF = [
        { time: 0, name: "wczytywanie" },
        { time: 0, name: "wczytywanie" },
        { time: 0, name: "wczytywanie" }, 
        { time: 0, name: "wczytywanie" },
        { time: 0, name: "wczytywanie" }
    ];

    let i = 0;

    console.log(matchType)

    if(matchTypeIsLoaded)
    {
        for (const object of matchType) {
            matchTypeF[i].time = object.time;
            matchTypeF[i].name = object.name;
            i++;
          }
    }
    
    return (
      <div class='inline' style={div}>
        <NavBar/>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <div style={divFlex}>
            <div class="row row-cols-1 row-cols-md-2 g-4">
                <div class="col">
                    <button class="card" style={card}>
                        <img src=".\src\assets\ches.png" class="card-img-top" alt="Obraz szahcow"></img>
                        <div class="card-body text-info">
                            <h5 class="card-title">{ matchTypeF[0].name }</h5>
                            <p class="card-text">Czas trwania: { matchTypeF[0].time }</p>
                        </div>
                    </button>
                </div>
                <div class="col">
                    <button class="card" style={card}>
                        <img src=".\src\assets\ches.png" class="card-img-top" alt="Obraz szahcow"></img>
                        <div class="card-body text-info">
                            <h5 class="card-title">{ matchTypeF[1].name }</h5>
                            <p class="card-text">Czas trwania: { matchTypeF[1].time }</p>
                        </div>
                    </button>
                </div>
                <div class="col">
                    <button class="card" style={card}>
                        <img src=".\src\assets\ches.png" class="card-img-top" alt="Obraz szahcow"></img>
                        <div class="card-body text-info">
                            <h5 class="card-title">{ matchTypeF[2].name }</h5>
                            <p class="card-text">Czas trwania: { matchTypeF[2].time }</p>
                        </div>
                    </button>
                </div>
                <div class="col">
                    <button class="card" style={card}>
                        <img src=".\src\assets\ches.png" class="card-img-top" alt="Obraz szahcow"></img>
                        <div class="card-body text-info">
                            <h5 class="card-title">{ matchTypeF[3].name }</h5>
                            <p class="card-text">Czas trwania: { matchTypeF[3].time }</p>
                        </div>
                    </button>
                </div>
                <div class="col">
                    <button class="card" style={card}>
                        <img src=".\src\assets\ches.png" class="card-img-top" alt="Obraz szahcow"></img>
                        <div class="card-body text-info">
                            <h5 class="card-title">{ matchTypeF[4].name }</h5>
                            <p class="card-text">Czas trwania: { matchTypeF[4].time }</p>
                        </div>
                    </button>
                </div>
            </div>
            <div style={textArea}>
                <p class="font-weight-bold" style={text}><h2>Tytuł</h2></p>
                <p class="font-weight-normal" style={text}><h5>Wiadomość ram pam pam</h5></p>
            </div>
        </div>
      </div>
    );
  }
}

export default MyHome;

const card = {
    borderRadius: "10px"
}
const div = {
    height: "100vh"
}
const divFlex = {
    display: "flex",
    flexDirection: "column"
}
const text = {
    color: "white",
    textAlign: "center"
}
const textArea = {
    margin: "50px",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: "50px"
}