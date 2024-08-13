import React, { useState } from 'react'
import './App.css';
import { Navigate, useNavigate } from 'react-router-dom';
import pickYourOrder from '/assets/motivationCandy/pickYourOrder.png';
import hereIsYourOrder from '/assets/motivationCandy/hereIsYourOrder.png';
export default function Motivation() {
    //const pickYourOrder='../src/assets/motivationCandy/motivation/pickYourOrder.png';
    //const hereIsYourOrder='../src/assets/motivationCandy/motivation/hereIsYourOrder.png';
    const[motImg, setMotImg]=useState(pickYourOrder);
    const msg=motImg==pickYourOrder?"Tap to pick your Motivation Candy":"Here's your Order! Tap to reveal";
    const navigate=useNavigate();
    function handleClick()
    {
        if(motImg==pickYourOrder) setMotImg(hereIsYourOrder);
        else if(motImg==hereIsYourOrder)
        {
            navigate('/yourCandy');
        }
    }
    //console.log(motImg);
    return (
    <div>
        <p className='motmsg'>Hey kids! Imagine your mind is like a candy jar. Every time you say something nice to yourself, it's like putting a sweet treat into the jar. When you say things like "I am kind" or "I am smart," it's like adding yummy candy that makes you feel good and happy. Just like candy can make you smile, positive words make your heart feel strong and sweet. So, remember to fill your jar with lots of positive thoughts, and you'll feel awesome every day! 🍬😊</p>
      <div className="motImg">
        <img src={motImg} alt="" onClick={handleClick}/>
        <h2>{msg}</h2>
      </div>
    </div>
  )
}
