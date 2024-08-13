
import React from 'react'
import '../App.css';
import logo from '../images/Logo.png'
export default function Intro() {
  return (
    <div className='intro'>
      <img src={logo} alt="logo" className='lotusLogo'/>
      <h2>Welcome to Taleszilla!</h2>
      <p>At Taleszilla, we're on a mission to nurture children's emotional intelligence through the power of storytelling. Each of our enchanting tales is designed to be a stepping stone towards shaping your child into a compassionate, kind-hearted individual.

But don’t worry—these aren’t the dull, lifeless stories you might remember from school (honestly, we thought they were pretty boring too). Our stories are brimming with magic, adventure, and fun. And at the heart of each narrative is a noble lesson, seamlessly woven into the plot.

So why wait? Dive into our collection and let the magic unfold. Discover stories that not only entertain but also inspire and educate. Join us on this magical journey towards building a brighter future, one story at a time.</p>
    </div>
  )
}
