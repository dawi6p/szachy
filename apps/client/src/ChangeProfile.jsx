import React from "react";
import { Navigate } from 'react-router-dom';
import { isExpired, decodeToken } from "react-jwt";
import { useLocation } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import './App.css';


class ChangeProfile extends React.Component {

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
        const { token, TokenisLoaded} = this.state;

        if(!TokenisLoaded) return '';
        if(isExpired(token)) 
        {
            return (<Navigate to="/Login" />);
        }

        const temp = decodeToken(token)
        console.log(temp)

        return (
            <>
            <div class="login-box">
                <h2>Register Page</h2>
                <form method="post" action="/api/users/changeEmail">
                    <div class="user-box">
                        <input 
                            type="email" 
                            name="email"
                            required
                            defaultValue={temp.email}
                        />
                        <label>E-mail</label>
                    </div>
                    <input type='submit' value='Change Email' class='navButton'/>
                </form>
                <form method="post" action="/api/users/changeNickName">
                <br/>
                    <div class="user-box">
                        <input 
                        type="text" 
                        name="NickName" 
                        defaultValue={temp.nickName}
                        required
                        />
                        <label>Nick Name</label>
                    </div>
                    <input type='submit' value='Change Nick Name' class='navButton'/>
                </form>
                <form method="post" action="/api/users/changePassword">
                <br/>
                    <div class="user-box">
                        <input 
                            type="password" 
                            name="password" 
                            required
                        />
                        <label>Password</label>
                    </div>
                    <input type='submit' value='Change Password' class='navButton'/>
                </form>
            </div>
            </>
        )
    }
}

export default ChangeProfile;