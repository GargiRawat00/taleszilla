import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import './App.css'
const BASE_URL='/assets/motivationCandy/motivation'
const y = Math.floor((Math.random() * 104) + 1);
export default function YourCandy() {
    const [newURL, setNewURL]=useState(BASE_URL+'/'+y+'.png');
    function pickRandomMsg()
    {
        let x = Math.floor((Math.random() * 104) + 1);
        setNewURL(BASE_URL+'/'+x+'.png');
    }

  return (
    <div className='motcard'>
      <img src={newURL}/>
      <div className="motright">
        <p>Hey bubs, try to inculcate these learnings in your life starting from today!!</p>
        <Button variant="primary" size="lg" onClick={pickRandomMsg}>One More Please</Button>
      </div>
     
    </div>
  )
}
