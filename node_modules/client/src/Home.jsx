import { useEffect, useState } from 'react'
import './App.css'

function Home() {
  const [token, setToken] = useState('');

  useEffect(() =>{
    fetch('/api')
    .then((res)=>res.text())
    .then(setToken);
  }, []);

  return (
    <>
      <div class="login-box">
        <h2>Login Page</h2>
        <form method="post" action="/api/auth/login">
          <div class="user-box">
            <input 
                type="text" 
                name="username" 
                required
              />
            <label>Username</label>
          </div>
          <div class="user-box">
            <input 
                type="password" 
                name="password" 
                required
              />
            <label>Password</label>
          </div>
          <div class="submit">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <input type='submit' value='Log In'/>
          </div>
        </form>
      </div>
    </>
  )
}

export default Home
