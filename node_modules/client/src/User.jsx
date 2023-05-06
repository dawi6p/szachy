import { useEffect, useState } from 'react'
import './App.css'

function User() {
  const [token, setToken] = useState('');

  useEffect(() =>{
    fetch('/api')
    .then((res)=>res.text())
    .then(setToken);
  }, []);

  return (
    <>
      <div>
        <p><label>User Id: </label></p>
        <p><label>Nick Name: </label></p>
        <p><label>E-mail: </label></p>
        <p><label>Rgistration Date: </label></p>
        <p><label>Banned until: </label></p>
        <p><label>Is Admin: </label></p>
        <form method='post'><input type='date' name='date'></input><input type='submit' value='Bann User'></input></form>
        <form method='post'><input type='submit' value='Delete User'></input></form>
      </div>
      <h1>{token}</h1>
    </>
  )
}

export default User