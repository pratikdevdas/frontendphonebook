import React from 'react'


const RegisterForm = ({
  registerName,
  handleRegister,
  registerUsername,
  registerPassword,
  handleName,
  handleUsername,
  handlePassword

}) => {
  return (
    <div>
      <section>
        <form onSubmit={handleRegister} className="form">
          <div className="form-header">
            <div className='logo'>
              <h2>SignUp </h2>
            </div>
            <div className='signup'>
              <a href="#">Log in</a>
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
                onChange={handleUsername}
              />

              <div>
                <div className='label'>
                  <label >Name</label>
                </div>
                <input
                  type="text"
                  value={registerName}
                  name="Name"
                  onChange={handleName}
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
                  onChange={handlePassword}
                />
              </div>
            </div>
            <button type="submit" className='btn-submit'>register</button>

          </div>
        </form>
      </section>
    </div>
  )
}

export default RegisterForm