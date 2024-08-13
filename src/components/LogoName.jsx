

import React from 'react'
import bg from '/images/LogoName.png'
import "../App.css";
export default function LogoName({h}) {
  return (
    <div className='lname' style={{"--h": h}}>
      <img src={bg} alt='TalesZilla'/>
    </div>
  )
}
