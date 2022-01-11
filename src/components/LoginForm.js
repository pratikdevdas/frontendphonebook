import React from 'react'

const LoginForm = ({
  // registerForm,
  handleLogin,
  message,
  username,
  password,
  handleUsername,
  handlePassword
}) => {

  // const [show, setShow] = useState(false)

  // const handleClick = (event) => {
  //   event.preventDefault()
  //   setShow(true)
  // }

  // if (show===true)
  // {
  //   return registerForm
  // }

  return (
    <div>
      {message}
      <form onSubmit={handleLogin}>
        {/* <button onClick={handleClick}>signup</button> */}
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
