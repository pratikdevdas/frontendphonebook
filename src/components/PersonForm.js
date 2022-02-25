import React,{ useState } from 'react'

const PersonForm = ({ createBlog }) => {

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState([])

  const handleNameChange = event => {
    // console.log(event.target.value);
    setNewName(event.target.value)
  }
  const handleNumberChange = event => {
    // console.log(event2.target.value);
    setNewNumber(event.target.value)
  }

  const addNote = (event) => {
    event.preventDefault()
    createBlog({
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