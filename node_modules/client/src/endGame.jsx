import React from "react";
import { isExpired, decodeToken } from "react-jwt";
import { Navigate } from 'react-router-dom';
import NavBar from "./integrations/NavBar";

class EndGame extends React.Component {

	constructor(props) {
		super(props);
        const queryParameters = new URLSearchParams(window.location.search)
        this.id = queryParameters.get("id")

		this.state = {
			token: String,
			TokenisLoaded: false
		};
	}

	componentDidMount() {
    fetch("/api")
			.then((res) => res.text())
			.then((string) => {
				this.setState({
					token: string,
					TokenisLoaded: true
				});
			})
	}
	render() 
    {
		const {token, TokenisLoaded} = this.state;

		if(!TokenisLoaded) return '';
        if(isExpired(token)) 
		{
			return (<Navigate to="/Login" />);
		}

		return (
            <>
            <div class='inline'>
              <NavBar/>
              <div class="login-box text-white">
                <h2>Game Over</h2>
                <br/>
                <p>You Won/Lost/Drawn by</p>
                <p>Your score changed</p>
                <p>100 &rarr; 108</p>
                <div class="submit">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <button class='submitButton' onClick={() => { window.location.href = 'Chess'; }}><i class="fas fa-chess-king icon"></i>Play Again</button>
                </div>
              </div>
            </div>
            </>
          )
    }
}

export default EndGame