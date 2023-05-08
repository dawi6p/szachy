import React from "react";
import { Navigate } from 'react-router-dom';
import { isExpired, decodeToken } from "react-jwt";
import './App.css';

class UsersList2 extends React.Component {

	constructor(props) {
		super(props);

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
		fetch("/api/users/listaUsers")
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
    	if(isExpired(token)) 
		{
			return (<Navigate to="/Home" />);
		}

		if (!DataisLoaded) return <div><h1> Tańcz.... </h1> </div> ;

		return (
		<div className = "App">
			<h1> Lista wielkich użytkowników </h1>
            <table>
                <tr>
                    <th>User Id</th>
                    <th>Nick Name</th>
                    <th>E-mail</th>
                    <th>Is Admin</th>
                    <th></th>
                </tr>
             {
				items.map((item) => (
                    <tr>
                        <td> { item.id } </td>
                        <td> { item.nickName }</td>
                        <td> { item.email } </td>
                        <td> { item.adminPowerId } </td>
                        <td><form method='get' action='/admin/user'><input type='hidden' name='id' value={ item.id } ></input><input type='submit' value='Szczegóły'></input></form></td>
                    </tr>
				))
			}
            </table>
		</div>
	);
}
}

export default UsersList2;
