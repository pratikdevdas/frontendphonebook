import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Person from "./components/Person";
import Notification from "./components/Notification"
import herePerson from "./services/backend"
import loginServices from "./services/login";
import registerServices from "./services/register";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable"

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState(null);
  const [registerName, setRegisterName] = useState('');  
  const [registerUsername, setRegisterUsername] = useState('');  
  const [registerPassword, setRegisterPassword] = useState('');  
  // const [registerUser, setRegisterUser] = useState('');  
  const [username, setUsername] = useState('');  
  const [password, setPassword] = useState('');  
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log("effect");
   herePerson.getAll()
    .then(response => {
            setPersons(response);
            console.log(response)
    });
  }, []);

  // savingto browsers local storage
  useEffect(() => {
    const loggedPhonebookUserJSON = window.localStorage.getItem('phonebookUser')
    if(loggedPhonebookUserJSON){
      const user = JSON.parse(loggedPhonebookUserJSON)
      setUser(user)
      herePerson.setToken(user.token)
    }
  },[]);
  
  const handleLogin= async(event)=>{
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
      setMessage(`invalid info try again`)
      setTimeout(() => {
        setMessage(null)
      },5000)
      console.log('login error')
    }  
  }

  const handleRegister = (event) => {
    event.preventDefault()
    console.log('happening')
    const registerPerson = {
      username: registerUsername,
      name: registerName,
      password: registerPassword
    } 
    registerServices.create(registerPerson)
    setRegisterName("")
    setRegisterPassword("")
    setRegisterUsername("")
    setMessage("user created sucessfully")
  }

  // console.log("render", persons.length, "notes");
  const handleSearch = event => {
    setSearchTerm(event.target.value);
    //the event handler which that syncronizes the change made to input with component state
  };
  const handleNameChange = event => {
    // console.log(event.target.value);
    setNewName(event.target.value);
  };
  const handleNumberChange = event2 => {
    // console.log(event2.target.value);
    setNewNumber(event2.target.value);
  };

  const addName = event => {
    event.preventDefault();
    
    const checkPerson = persons.find(person => person.name === newName);
    console.log(checkPerson);
      
    if (!checkPerson) {
      const newPerson = {
        name: newName,
        number: newNumber,
                }
        const nameIsInvalid = newPerson.name.length > 4 && newPerson.number.toString().length > 8;
        console.log(!nameIsInvalid)//true
          if(!nameIsInvalid){
            // console.log("hi");
            setMessage(`shorter than allowed length`)
            setTimeout(() => {
            setMessage(null)
        }, 5000)
      }
       herePerson.create(newPerson)                 
          .then(response=>{          
         setPersons(persons.concat(response));
         setNewName("")
         setNewNumber("")
         setMessage(`${newName} has been added`)})
          .then(setTimeout(() => {
          setMessage(null)
        }, 5000)).catch((error)=>console.log(error))               
        }
        
        else {
          const cool = {name: checkPerson.name,
            number: newNumber};
            console.log(cool)
          if (window.confirm(`Update ${checkPerson.name}'s number to "${newNumber}"`))
          herePerson.update(checkPerson.id,cool)
          .then(response=>{ console.log(response)         
            setPersons(persons.map(p => p.name === response.name ? response : p))
            setNewName("");
            setNewNumber("");
            setMessage(
              `${checkPerson.name} has been updated`)
              setTimeout(() => {
                setMessage(null)
              }, 5000) })
              .catch(error=>{console.log('error')
              setMessage(`Information of ${checkPerson.name} has been already removed. Please refresh`)
              setTimeout(() => {
                setMessage(null)
              }, 5000)})
                       
          }
          };

         const removePerson = (id, name) => {
        if (window.confirm(`delete ${name}?`)) {
          herePerson.remove(id,name)
          .then(() => {
            setPersons(persons.filter(person => person.id !== id));
            });
        } 
      };
  
      const filterSearch = persons.filter(note => note.name.toLowerCase().includes(searchTerm.toLowerCase()));

     const registerForm = () => {
        return(
         <>
          <form onSubmit={handleRegister}>
          <h2>Register</h2>
          <div>
           username
        <input 
        type="text" 
        value={registerUsername} 
        name="Username" 
        onChange={({ target }) => setRegisterUsername(target.value)} 
        />
        </div>
        <div>
          name
        <input 
        type="text" 
        value={registerName} 
        name="Username" 
        onChange={({ target }) => setRegisterName(target.value)} 
        />
        </div>
        <div>
           password
        <input 
        type="password" 
        value={registerPassword} 
        name="Password" 
        onChange={({ target }) => setRegisterPassword(target.value)}
        />
        </div>
        <button type="submit">register</button>
          </form>
         </> 
        )
      }

      const loginForm = () => {
        return(
          <>
          {registerForm()}
        <LoginForm
        message={message}
        handleLogin={handleLogin}
        username={username}
        password={password}
        handleUsername={({target})=> setUsername(target.value)}
        handlePassword={({target})=> setPassword(target.value)}
        /></>)
      }

      if(user == null){
        return (<>{loginForm()}</>)
      }

      const logOut = () => {
        const handleLogout = (event) => {
          window.localStorage.clear()
          event.preventDefault()
          setUser(null)
        }
      return (
      <><button onClick={handleLogout}>logout</button></>
      )}

  return (
    <div>
      {user.name} logged-in.
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <Filter prop={searchTerm} prop2={handleSearch} />
      <h3>Add a new</h3>
      <Togglable buttonLabel="Add a new Number">
      <PersonForm
        prop1={addName}
        prop2={newName}
        prop3={handleNameChange}
        prop4={newNumber}
        prop5={handleNumberChange}
      />
    </Togglable>
      <h2>Numbers</h2>
      <Person filterSearch={filterSearch} removePerson={removePerson}/>
      {/* login form */}
     {logOut()}
    </div>
  );
};

export default App;
