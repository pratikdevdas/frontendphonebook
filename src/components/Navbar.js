import React from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'


const Navbar = ({ prop,prop2 }) => {

  return (<div className='flex justify-between h-16'>
    <GiHamburgerMenu className='h-6 w-6'/>
    <div>Google Contacts Lite</div>
    <input
      type="text"
      value={prop}
      placeholder="Search"
      onChange={prop2}
      className='bg-slate-400'
    />
    <div>
    Logged in Photo
    </div>
  </div>)}
export default Navbar
