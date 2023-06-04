import React from "react";
import { Navigate } from 'react-router-dom';
import { isExpired, decodeToken } from "react-jwt";
import { useLocation } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import './App.css';

class User extends React.Component {

	constructor(props) {
		super(props);
    const queryParameters = new URLSearchParams(window.location.search)
    this.id = queryParameters.get("id")
    

		this.state = {
			items: [],
			DataisLoaded: false,
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
	fetch("/api/users/User?id="+this.id)
		.then((res) => res.json())
		.then((json) => {
			this.setState({
				items: json,
				DataisLoaded: true
			});
		})
	}
	render() {
		const { DataisLoaded, items, token, TokenisLoaded} = this.state;

		if(!TokenisLoaded) return '';
    if(isExpired(token) || decodeToken(token).adminPower !== 1) 
		{
			return (<Navigate to="/Login" />);
		}

		if (!DataisLoaded) return <div><h1> Tańcz.... </h1> </div> ;

		return (
      <>
        <div class="text-white">
          <p><label>User Id: {items.id}</label></p>
          <p><label>Nick Name: {items.nickName}</label></p>
          <p><label>E-mail: {items.email}</label></p>
          <p><label>Rgistration Date: {items.registrationDate}</label></p>
          <p><label>Banned until: {items.bannedUntil}</label></p>
          <p><label>Is Admin: {items.adminPowerId}</label></p>
          <form method='get' action="../api/users/listaUsers/banowanie"><input type="datetime-local" name="date" required></input><input type='hidden' name='id' value={items.id}></input><input type='submit' value='Bann User'></input></form>
          <form method='get' action="../api/users/lista/usuwanie"><input type='hidden'  name='id' value={items.id}></input><input type='submit' value='Delete User'></input></form>
        </div>
      </>
    )
}
}

export default User;