import { useEffect, useState } from 'react'
import './App.css'
import NavBar from './integrations/NavBar';

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
              <NavBar/>
        
            </>
          )
    }
}

export default EndGame