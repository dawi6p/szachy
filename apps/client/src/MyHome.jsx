import React, { Component} from "react";
import io from "socket.io-client";
import NavBar from "./integrations/NavBar";

var socket;

class MyHome extends Component {
  constructor(props) {
		super(props);

    this.state = {
        matchType: [],
        matchTypeIsLoaded: false,
        message: [],
        messageIsLoaded: false
	};
    socket = io("http://localhost:3000");
  }
  
  componentDidMount() {
    fetch("/api/matchtype/getAllMatchtype")
    .then((res) => res.json())
    .then((json) => {
        this.setState({
            matchType: json,
            matchTypeIsLoaded: true,
        });
    })

    fetch("/api/message/MyHomeMessage")
    .then((res) => res.json())
    .then((json) => {
        this.setState({
            message: json,
            messageIsLoaded: true,
        });
    })
  }

  render() {
    const { matchType, matchTypeIsLoaded, messageIsLoaded, message } = this.state;

    let matchTypeF = [
        { time: 0, name: "wczytywanie" },
        { time: 0, name: "wczytywanie" },
        { time: 0, name: "wczytywanie" }, 
        { time: 0, name: "wczytywanie" },
        { time: 0, name: "wczytywanie" }
    ];

    let messageF = [
        { title: "wczytywanie", message: "wczytywanie" },
        { title: "wczytywanie", message: "wczytywanie" }
    ];

    let i = 0;

    console.log(matchType)

    if(matchTypeIsLoaded)
    {
        for (const object of matchType) {
            matchTypeF[i].time = object.time;
            matchTypeF[i].name = object.name;
            matchTypeF[i].id = object.id;
            i++;
          }
    }

    if(messageIsLoaded){
        i=0;
        for(const obj of message){
            messageF[i].title = obj.title;
            messageF[i].message = obj.message
            i++
        }
    }
    
    return (
      <div class='inline' style={div}>
        <NavBar/>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <div style={divFlex}>
            <div class="row row-cols-1 row-cols-md-2 g-4">
                <div class="col">
                    <button onClick={() => { window.location.href = 'Chess?type='+matchTypeF[0].id; }} class="card noHeight" style={card}>
                        <img src=".\src\assets\ches.png" class="card-img-top" alt="Obraz szahcow"></img>
                        <div class="card-body text-info">
                            <h5 class="card-title">{ matchTypeF[0].name }</h5>
                            <p class="card-text">Czas trwania: { matchTypeF[0].time }</p>
                        </div>
                    </button>
                </div>
                <div class="col">
                    <button onClick={() => { window.location.href = 'Chess?type='+matchTypeF[1].id; }} class="card noHeight" style={card}>
                        <img src=".\src\assets\ches.png" class="card-img-top" alt="Obraz szahcow"></img>
                        <div class="card-body text-info">
                            <h5 class="card-title">{ matchTypeF[1].name }</h5>
                            <p class="card-text">Czas trwania: { matchTypeF[1].time }</p>
                        </div>
                    </button>
                </div>
                <div class="col">
                    <button onClick={() => { window.location.href = 'Chess?type='+matchTypeF[2].id; }} class="card noHeight" style={card}>
                        <img src=".\src\assets\ches.png" class="card-img-top" alt="Obraz szahcow"></img>
                        <div class="card-body text-info">
                            <h5 class="card-title">{ matchTypeF[2].name }</h5>
                            <p class="card-text">Czas trwania: { matchTypeF[2].time }</p>
                        </div>
                    </button>
                </div>
                <div class="col">
                    <button onClick={() => { window.location.href = 'Chess?type='+matchTypeF[3].id; }} class="card noHeight" style={card}>
                        <img src=".\src\assets\ches.png" class="card-img-top" alt="Obraz szahcow"></img>
                        <div class="card-body text-info">
                            <h5 class="card-title">{ matchTypeF[3].name }</h5>
                            <p class="card-text">Czas trwania: { matchTypeF[3].time }</p>
                        </div>
                    </button>
                </div>
                <div class="col">
                    <button onClick={() => { window.location.href = 'Chess?type='+matchTypeF[4].id; }} class="card noHeight" style={card}>
                        <img src=".\src\assets\ches.png" class="card-img-top" alt="Obraz szahcow"></img>
                        <div class="card-body text-info">
                            <h5 class="card-title">{ matchTypeF[4].name }</h5>
                            <p class="card-text">Czas trwania: { matchTypeF[4].time }</p>
                        </div>
                    </button>
                </div>
            </div>
            <div style={textArea}>
                <p class="font-weight-bold" style={text}><h2>{ messageF[1].title }</h2></p>
                <p class="font-weight-normal" style={text}><h5>{ messageF[1].message }</h5></p>
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