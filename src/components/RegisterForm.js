import React,{ useState } from 'react'
import './RegisterForm.css'

const RegisterForm = ({
  handleToggle,
  createNewUser,

}) => {
  const [registerName, setRegisterName] = useState('')
  const [registerUsername, setRegisterUsername] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')

  const addUser = (event) => {
    event.preventDefault()
    createNewUser(
      { username: registerUsername,
        name: registerName,
        password: registerPassword }
    )
    setRegisterName('')
    setRegisterPassword('')
    setRegisterUsername('')

  }
  return (
    <div className='body'>
      <div>
        <section>
          <form onSubmit={addUser} className="form">
            <div className="form-header">
              <div className='logo'>
                <h2>SignUp </h2>
              </div>
              <div>
                <button onClick={handleToggle}>Login</button>
              </div>
            </div>
            <div>
              <div className="input-group">
                <div className='label'>
                  <label>Username</label>
                </div>
                <input
                  type="text"
                  value={registerUsername}
                  name="Username"
                  onChange={({ target }) => setRegisterUsername(target.value)}
                />

                <div>
                  <div className='label'>
                    <label >Name</label>
                  </div>
                  <input
                    type="text"
                    value={registerName}
                    name="Name"
                    onChange={({ target }) => setRegisterName(target.value)}
                  />
                </div>
                <div>
                  <div className='label'>
                    <label >Password</label>
                  </div>
                  <input
                    type="password"
                    value={registerPassword}
                    name="Password"
                    onChange={({ target }) => setRegisterPassword(target.value)}
                  />
                </div>
              </div>
              <button type="submit" className='btn-submit'>register</button>

            </div>
          </form>
        </section>
      </div>
    </div>
  )
}

export default RegisterForm
