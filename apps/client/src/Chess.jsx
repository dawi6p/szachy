import React, { Component } from "react";
import { isExpired, decodeToken } from "react-jwt";
import { Navigate } from 'react-router-dom';

import WithMoveValidation from "./integrations/WithMoveValidation";

class Chess extends Component {

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
      <div>
        <div style={boardsContainer} >
          <WithMoveValidation/>
        </div>
        { token }
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