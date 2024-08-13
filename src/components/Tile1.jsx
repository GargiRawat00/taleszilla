import React from 'react'
import { useState } from 'react';
import '../App.css'
import Button from 'react-bootstrap/Button';
export default function Tile1({id,image,title,setLib,lib,isAdded,sdata,setSdata}) {
 const path='../src/assets'+`${image}`;
 const addLib1='../src/images/addLib.png';
 const addLib2='../src/images/addedLib.png';
 const [addLib,setAddLib]=useState(isAdded==0?addLib1:addLib2);
// console.log("id is: ", id);
 function handleClick()
  {
    //console.log("id is: ", id);
    if(lib.includes(id))
      {
        const t=lib.filter((ele)=>ele!=id);
        setLib(t);
        setAddLib(addLib1);
      }    
    else 
    {
      const t=[...lib,id]
      setLib(t);
      setAddLib(addLib2);
    }
   

  } 
 return (
    
    <div className='tile'>
      <img className='tileimg' src={path} alt="Tile" />  
      <div className="btn-ctn">    
        <Button variant="primary" style={{"height":"8vh","width":"50%"}}>Start Reading</Button>
        <Button variant="primary" style={{"height":"8vh","width":"10vh"}}><img style={{"height":"6vh","width":"6vh","textAlign":"center","padding":"2px"}} src={`${addLib}`} onClick={handleClick}/></Button>
      </div>
    </div>
  )
}
