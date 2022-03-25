import React from 'react'
import Notification from './Notification'
import Togglable from '../Togglable'
import PersonForm from '../Login/PersonForm'
import Person from './Person'

const Body = ({ message,addName,filterSearch,removePerson }) => {
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <Togglable buttonLabel="Add a new Number">
        <PersonForm
          createPerson={addName}
        />
      </Togglable>
      <h2>Numbers</h2>
      <Person filterSearch={filterSearch} removePerson={removePerson}/>

    </div>
  )
}

export default Body