import React,{ useState } from 'react'

const PersonForm = ({ createPerson }) => {

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState([])

  const handleNameChange = event => {
    setNewName(event.target.value)
  }
  const handleNumberChange = event => {
    setNewNumber(event.target.value)
  }

  const addNote = (event) => {
    event.preventDefault()
    createPerson({
      name: newName,
      number: newNumber
    })
    setNewName('')
    setNewNumber('')
  }

  // https://fullstackopen.com/en/part5/props_children_and_proptypes#state-of-the-forms
  return (
    <><form onSubmit={addNote}>
      <div>
      name: <input value={newName} onChange={handleNameChange}/>
      </div>
      <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
      </div>
      <div>

        <button type="submit">add</button>
      </div>
    </form></>)}

export default PersonForm