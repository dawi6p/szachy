import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function Home() {
  const [hallo, setHallo] = useState('');

  useEffect(() =>{
    fetch('/api')
    .then((res)=>res.text())
    .then(setHallo);
  }, []);

  return (
    <>
      <form method="post" action="/api/auth/login">
        <label>Enter your name:
        <input 
          type="text" 
          name="username" 
        />
        </label>
        <label>Enter your password:
          <input 
            type="password" 
            name="password" 
          />
          </label>
          <input type="submit" />
      </form>
      <h1>{hallo}</h1>
    </>
  )
}

export default Home
