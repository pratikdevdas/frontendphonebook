import React from 'react'
// import Note from './Note'
const Person = ({ filterSearch,removePerson }) => {

  return (

    <div >
      <ul>

        {filterSearch.map(person =>
          <li key ={person.id}>
            {person.name} {person.number} <button onClick={() => removePerson(person.id, person.name)}>Delete</button>
          </li>
        )}
      </ul>
    </div>
  )
}

export default Person