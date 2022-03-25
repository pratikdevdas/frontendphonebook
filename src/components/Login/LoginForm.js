import React from 'react'
import './LoginForm.css'

const LoginForm = ({
  handleToggle,
  handleLogin,
  message,
  username,
  password,
  handleUsername,
  handlePassword
}) => {

  return (
    <div className='body'>
      <section>
        <form onSubmit={handleLogin}>
          {/* <button onClick={handleClick}>signup</button> */}
          <h2>Login</h2>
          <button onClick={handleToggle}>Sign Up</button>
          <div className='input-group'>
            <div>
              <div className='label'>
                <label >username</label>
              </div>
              {message}
              <input
                type="text"
                value={username}
                name="Username"
                onChange={handleUsername}
              />
            </div>
            <div>
              <div className='label'>
                <label htmlFor="">password</label>
              </div>
              <input
                type="password"
                value={password}
                name="Password"
                onChange={handlePassword}
              />
            </div>
          </div>
          <button type="submit" className='btn-submit'>login</button>
        </form>
      </section>
    </div>
  )
}

export default LoginForm
