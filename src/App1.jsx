

import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar.jsx'
import Intro from './components/Intro.jsx'
import GlowButton from './components/GlowButton.jsx'
import Home from './Home.jsx'
import {  Route, BrowserRouter, Routes, Link} from 'react-router-dom';
import Stories from './Stories.jsx'
import lightIcon from './images/lightModeIcon.png'
import darkIcon from './images/darkModeIcon.png'
import logo from './images/Logo.png'
import data from './storiesData.json'
import Library from './Library.jsx'
import Motivation from './Motivation.jsx';
import PageNotFound from './PageNotFound.jsx';
import YourCandy from './YourCandy.jsx';
import Theme from './components/Theme.jsx';
import Chapter from './Chapter.jsx'
function App() {
const [sdata,setSdata]=useState(getInitialData);
function getInitialData() {
  // getting stored items
  const temp = localStorage.getItem('sdata');
  const savedTodos = JSON.parse(temp);
  if(!savedTodos) return data.map((entry)=>({...entry, isAdded:0, chNo:1 }));
  return savedTodos;
}
useEffect(() => {
  // storing todos items
  const temp = JSON.stringify(sdata);
  //console.log(sdata);
  localStorage.setItem('sdata', temp);
}, [sdata]);
//console.log(sdata);
const [bg,setBg]=useState('light');
function  handleClick()
{
  if(bg==='light')
  {
    setBg('dark');
  }
  else
  {
    setBg('light');
  }

}
  return (
    <div className={bg==='light'?'app bgLight':'app bgDark'}>
      <BrowserRouter>
      <Navbar theme={(bg==='dark')?'dark':'light'} bg={bg} handleClick={handleClick}/>
      <Routes>
      < Route path='/' element={<Home>
      
      <Intro/>
      <Link to='/stories' style={{"textDecoration":"none"}}><GlowButton bg={bg} /></Link>
      </Home>}/>
      <Route path='/stories' element={<Stories sdata={sdata} setSdata={setSdata}/>}/>
      <Route path='/library' element={<Library sdata={sdata} setSdata={setSdata}/>}/>
      <Route path='/story/:id/:ch' element={<Chapter sdata={sdata} setSdata={setSdata}/>}/>
      <Route path='/motivationCandy' element={<Motivation/>}>
      </Route>
      <Route path='/yourCandy' element={<YourCandy/>}/>
      <Route path='*' element={<PageNotFound/>}/>
      </Routes>
      </BrowserRouter> 
    </div>
  );
}

export default App;
