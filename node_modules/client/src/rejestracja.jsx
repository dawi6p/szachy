import './App.css'

function register() {

  return (
    <>
      <form method="post" action="/api/users/rejestracja">
        <label>Enter your NickName:
        <input 
          type="text" 
          name="NickName" 
        />
        </label>
        <label>Enter your password:
          <input 
            type="password" 
            name="password" 
          />
          </label>
          <label>Enter your email:
          <input 
            type="email" 
            name="email" 
          />
          </label>
          <input type="submit" />
      </form>
    </>
  )
}

export default register
