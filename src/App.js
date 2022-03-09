import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import PersonForm from './components/PersonForm'
import Person from './components/Person'
import Notification from './components/Notification'
import herePerson from './services/backend'
import loginServices from './services/login'
import registerServices from './services/register'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import './App.css'
import RegisterForm from './components/RegisterForm'

const App = () => {
  const [persons, setPersons] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [message, setMessage] = useState(null)
  // const [registerUser, setRegisterUser] = useState('');
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [toggleRegister, showToggleRegister] = useState(false)


  // savingto browsers local storage
  useEffect(() => {
    const loggedPhonebookUserJSON = window.localStorage.getItem('phonebookUser')
    if(loggedPhonebookUserJSON){
      const user = JSON.parse(loggedPhonebookUserJSON)
      setUser(user)
      herePerson.setToken(user.token)
    }
  },[])


  useEffect(() => {
    console.log('effect')
    herePerson.getSingle()
      .then(response => {
        setPersons(response)
        console.log(response)
      })
  }, [])



  const handleLogin= async(event) => {
    event.preventDefault()
    console.log('logging in with',username,password)

    try {
      const user = await loginServices.login({
        username,password
      })
      window.localStorage.setItem(
        'phonebookUser', JSON.stringify(user)
      )
      herePerson.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      console.log(user)

    } catch (exception) {
      setMessage('invalid info try again')
      setTimeout(() => {
        setMessage(null)
      },5000)
      console.log('login error')
    }
  }

  const handleRegister = (userObject) => {
    registerServices.create(userObject)
    setMessage('user created sucessfully')
    setTimeout(() => {
      setMessage(null)
    },5000)
  }

  // console.log("render", persons.length, "notes");
  const handleSearch = event => {
    setSearchTerm(event.target.value)
    //the event handler which that syncronizes the change made to input with component state
  }

  const addName = (blogObject) => {
    const checkPerson = persons.find(person => person.name === blogObject.name)
    if (!checkPerson) {
      const nameIsInvalid = blogObject.name.length > 4 && blogObject.number.toString().length > 8
      if(!nameIsInvalid){
        setMessage('shorter than allowed length')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      }
      herePerson.create(blogObject)
        .then(response => {
          setPersons(persons.concat(response))
        })
        .then(setTimeout(() => {
          setMessage(null)
        }, 5000)).catch((error) => console.log(error))
    }

    else {
      const cool = {
        name: checkPerson.name,
        number: blogObject.number
      }
      if (window.confirm(`Update ${checkPerson.name}'s number to "${blogObject.number}"`))
        herePerson.update(checkPerson.id,cool)
          .then(response => { console.log(response)
            setPersons(persons.map(p => p.name === response.name ? response : p))
            setMessage(
              `${checkPerson.name} has been updated`)
            setTimeout(() => {
              setMessage(null)
            }, 5000) }).catch(() => console.log('error'))
    }
  }

  const removePerson = (id, name) => {
    if (window.confirm(`delete ${name}?`)) {
      herePerson.remove(id,name)
        .then(console.log(id,name))
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          // console.log('happened')
        }).catch(() => console.log('error'))
    }
  }

  const filterSearch = persons.filter(note => note.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const signupForm = () => {
    const handleToggle = (event) => {
      event.preventDefault()
      showToggleRegister(!toggleRegister)
    }
    const loginForm = () => {
      return(<>
        <LoginForm
          handleToggle={handleToggle}
          message={message}
          handleLogin={handleLogin}
          username={username}
          password={password}
          handleUsername={({ target }) => setUsername(target.value)}
          handlePassword={({ target }) => setPassword(target.value)}
        /></>)
    }

    const registerForm = () => {
      return(
        <>
          <RegisterForm
            handleToggle={handleToggle}
            createNewUser={handleRegister}
          />
        </>
      )
    }

    if (toggleRegister === false){
      return (
        <>
          {registerForm()}
        </>
      )
    }
    return(
      <>
        {loginForm()}
      </>)
  }

  if(user === null){
    return (<>{signupForm()}</>)
  }

  const logOut = () => {
    const handleLogout = (event) => {
      window.localStorage.clear()
      event.preventDefault()
      setUser(null)
      setMessage('log out sucessful')
      setTimeout(() => {
        setMessage(null)
      },5000)
    }
    return (
      <><button onClick={handleLogout}>logout</button></>
    )}

  return (
    <div>
      <Navbar prop={searchTerm} prop2={handleSearch} />
      <div>

        {user.name} logged-in.
      </div>
      <h1 className="text-3xl font-bold underline" >
      Hello world!
      </h1>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <h3>Add a new</h3>
      <Togglable buttonLabel="Add a new Number">
        <PersonForm
          createBlog={addName}
        />
      </Togglable>
      <h2>Numbers</h2>
      <Person filterSearch={filterSearch} removePerson={removePerson}/>
      {/* login form */}
      {logOut()}
    </div>
  )
}

export default App
