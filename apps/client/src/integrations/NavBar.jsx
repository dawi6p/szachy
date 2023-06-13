import React, { Component } from "react";
import { isExpired, decodeToken } from "react-jwt";




class NavBar extends Component {

    constructor(props) {
		super(props);

    this.state = {
			token: String,
			TokenisLoaded: false,
    }
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

        const { TokenisLoaded, token} = this.state;

        if(!TokenisLoaded) return '';

    return (
        <div class="card">
            <div class="body">
                <ul>
                    <li>
                        <div class="submit">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <button class='submitButton' onClick={() => { window.location.href = 'Chess'; }}><i class="fas fa-chess-king icon"></i>Play</button>
                        </div>
                    </li>
                    <li><button class='navButton' onClick={() => { window.location.href = 'MyHome'; }}><i class="fas fa-home icon"></i> Home</button></li>
                    <li><button class='navButton' onClick={() => { window.location.href = 'Profile'; }}><i class="fas fa-user-alt icon"></i> Profile</button></li>
                    
                    {
                        !isExpired(token) && <li><button class='navButton' onClick={() => { window.location.href = '/api/auth/logOut'; }}><i class="fas fa-user-alt icon"></i> Log out</button></li>
                    }
                    {
                        isExpired(token) && <li><button class='navButton' onClick={() => { window.location.href = '/Login'; }}><i class="fas fa-user-alt icon"></i> Log in</button></li>
                    }
                    {
                        isExpired(token) && <li><button class='navButton' onClick={() => { window.location.href = '/rejestracja'; }}><i class="fas fa-user-alt icon"></i> Register</button></li>
                    }
                </ul>
            </div>
        </div>
        );
    }
}

export default NavBar;