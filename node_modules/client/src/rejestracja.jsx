import './App.css'

function register() {

  return (
    <>
      <div class="login-box">
        <h2>Register Page</h2>
        <form method="post" action="/api/users/rejestracja">
          <div class="user-box">
            <input 
                type="email" 
                name="email" 
                required
              />
            <label>E-mail</label>
          </div>
          <div class="user-box">
            <input 
              type="text" 
              name="NickName" 
            />
            <label>Nick Name</label>
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
            <input type='submit' value='Register Account'/>
          </div>
        </form>
      </div>
    </>
  )
}

export default register
