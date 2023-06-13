import React from "react";
import { Navigate } from 'react-router-dom';
import { isExpired, decodeToken } from "react-jwt";
import './App.css';


class editMessage extends React.Component {

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
            .then((string) => {
                this.setState({
                    token: string,
                    TokenisLoaded: true
                });
            })
    }

    render() 
    {
        const { token, TokenisLoaded} = this.state;

        if(!TokenisLoaded) return '';
        if(isExpired(token)) 
        {
            return (<Navigate to="/Login" />);
        }

        const temp = decodeToken(token)

        return (
            <>
            <div class="login-box">
                <h2>Edytowanie wiadomości</h2>
                <form method="post" action="../api/message/edit">
                    <label>Tytuł</label><br/>
                    <input type="text" name="title" required/><br/>
                    <label>Wiadomość</label><br/>
                    <input type="text" name="message" required/><br/>
                    <input type='submit' value="Zapisz" class='navButton'/>
                </form>
            </div>
            </>
        )
    }
}

export default editMessage;