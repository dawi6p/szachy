import React from "react";
import './App.css';

class UsersList2 extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			items: [],
			DataisLoaded: false
		};
        this.token = {
			token: String,
			DataisLoaded: false
		};
	}

	componentDidMount() {
        fetch(
            "/api")
                        .then((res) => res.json())
                        .then((json) => {
                            this.setState({
                                token: json,
                                DataisLoaded: true
                            });
                        })
		fetch(
"/api/users/listaUsers")
			.then((res) => res.json())
			.then((json) => {
				this.setState({
					items: json,
					DataisLoaded: true
				});
			})
	}
	render() {
		const { DataisLoaded, items } = this.state;
		if (!DataisLoaded) return <div>
			<h1> Tańcz.... </h1> </div> ;

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
                        <td><form method='post' action="user"><input type='submit' value='Szczegóły'></input></form></td>
                    </tr>
				))
			}
            </table>{this.token.token}
		</div>
	);
}
}

export default UsersList2;
