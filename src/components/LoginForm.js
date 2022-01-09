import React from 'react'

const LoginForm = ({
  handleLogin,
  message,
  username,
  password,
  handleUsername,
  handlePassword
}) => {
  return (
    <div>
      {message}
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <div>
               username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={handleUsername}
          />
        </div>
        <div>
               password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={handlePassword}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
