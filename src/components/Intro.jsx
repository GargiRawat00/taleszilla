
import React, { useEffect, useState } from 'react'
import '../App.css';
import logo from '../images/Logo.png'
import { Link } from 'react-router-dom';
import GlowButton from './GlowButton';
export default function Intro({bg}) {
  const temp1="At Taleszilla, we're on a mission to nurture children's emotional intelligence through the power of storytelling. Each of our enchanting tales is designed to be a stepping stone towards shaping your child into a compassionate, kind-hearted individual. But don't worry—these aren't the dull, lifeless stories you might remember from school (honestly, we thought they were pretty boring too). Our stories are brimming with magic, adventure, and fun. And at the heart of each narrative is a noble lesson, seamlessly woven into the plot. So why wait? Dive into our collection and let the magic unfold. Discover stories that not only entertain but also inspire and educate. Join us on this magical journey towards building a brighter future, one story at a time."
  const temp2="'Motivation Candy' are delightful self-affirmation cards designed to inspire and uplift children. Each card is packed with positive, encouraging messages that boost confidence and brighten their day, like a sweet treat for their spirit! Perfect for daily motivation and a sprinkle of joy.";
  const [text,setText]=useState(temp1);
  const linked=text==temp1?'/stories':'/motivationCandy';
  useEffect(()=>{const intervalId= setInterval(function() {
    if(text==temp1) setText(temp2);
    else setText(temp1);
  }, 10000);
  return () => clearInterval(intervalId);
},[text])
  return (
    <div className='intro'>
      <img src={logo} alt="logo" className='lotusLogo'/>
      <h2>Welcome to Taleszilla!</h2>
      <p>{text}</p>
      <Link to={linked} style={{"textDecoration":"none"}}><GlowButton bg={bg} /></Link>
    </div>
  )
}
