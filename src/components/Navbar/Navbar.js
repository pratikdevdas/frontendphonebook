import React,{ useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import Popper from './Popper'

const Navbar = ({ prop,prop2 }) => {

  const [pop, setPop] = useState(false)

  const popClick = () => {
    setPop(!pop)
    console.log(pop)
  }

  const popperToView = () => {
    return pop ? <><Popper/></> : <></>
  }

  return (
    <>
      <div className='flex justify-around items-center h-16'>
        <GiHamburgerMenu className='h-6 w-6 hover:cursor-pointer' onClick={popClick}/>
        <div className=''>Google Contacts Lite</div>
        <div className='bg-slate-400 basis-7/12 self-stretch'>
          <input
            type="text"
            value={prop}
            placeholder="Search"
            onChange={prop2}
          />
        </div>

        <div>
    Logged in Photo
        </div>
      </div>
      {popperToView()}
    </>
  )}
export default Navbar
