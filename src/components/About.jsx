import React from 'react'
import { Link } from 'react-router-dom'
import GlowButton from './GlowButton'
import logo from '/images/Logo.png'
import '../App.css'
export default function About() {
    const text="Hello I am Gargi Rawat. Welcome to Taleszilla, where we’re passionate about nurturing emotional intelligence in children through captivating stories and empowering self-affirmations. Our mission is to create a dynamic, one-stop platform that helps children spend their time constructively and joyfully. Currently, we're excited to offer our foundational modules: a diverse range of engaging stories and uplifting motivational content. But this is just the beginning! We're constantly working on expanding our offerings to include even more interactive and enriching experiences. Thank you for joining us on this journey.";
  return (
    <div className='intro'>
      <img src={logo} alt="logo" className='lotusLogo'/>
      <h2>About Us</h2>
      <p>{text}</p>
    </div>
  )
}
