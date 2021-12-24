import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Person from "./components/Person";
import Notification from "./components/Notification"
import herePerson from "./services/backend"
import loginServices from "./services/login";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState(null);
  const [username, setUsername] = useState('');  
  const [password, setPassword] = useState('');  
  const [user, setUser] = useState(null);

  
  const handleLogin= async(event)=>{
    event.preventDefault()
    try {
      const user = await loginServices.login({username,password})
       window.localStorage.setItem(
         'phonebookUser', JSON.stringify({user})
         )
         herePerson.setToken(user.token)
         setUser(user)
         setUsername()
         setPassword()

    } catch (exception) {
      console.log('login error')
    }
    
  }

  useEffect(() => {
    console.log("effect");
   herePerson.getAll()
    .then(response => {
            setPersons(response);
            console.log(response)
    });
  }, []);
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
            console.log("hi");
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

      const loginForm = () => {
        return(
        <form onSubmit={handleLogin}>
          <h2>Login</h2>
              <div>
               username
            <input 
            type="text" 
            value={username} 
            name="Username" 
            onChange={({target})=> setUsername(target.value)} 
            />
            </div>
            <div>
               password
            <input 
            type="password" 
            value={password} 
            name="Password" 
            onChange={({target})=> setPassword(target.value)} 
            />
            </div>
            <button type="submit">login</button>
          </form>)
      }
      // if(user == null){
      //   return <>{loginForm()}</>
      // }
 
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <Filter prop={searchTerm} prop2={handleSearch} />
      <h3>Add a new</h3>
      <PersonForm
        prop1={addName}
        prop2={newName}
        prop3={handleNameChange}
        prop4={newNumber}
        prop5={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Person filterSearch={filterSearch} removePerson={removePerson}/>
      {/* login form */}
     {loginForm()}
    </div>
  );
};

export default App;