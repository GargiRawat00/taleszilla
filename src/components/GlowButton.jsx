

import React from 'react'
import '../App.css'
export default function GlowButton({bg}) {
  return (
    <div className='btnglow'>
      <button className={bg==='dark'?'btn-dark':'btn-light'} style={{"textDecoration":"none"}}>Explore!</button>
    </div>
  )
}
