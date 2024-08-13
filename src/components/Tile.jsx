import React from 'react'
import { useState } from 'react';
import '../App.css'
import Button from 'react-bootstrap/Button';
import { Navigate, useNavigate } from 'react-router-dom';
export default function Tile({entry,sdata,setSdata}) {
 const path='../src/assets'+`${entry.title_img}`;
 //console.log(path);
 const addLib1='../src/images/addLib.png';
 const addLib2='../src/images/addedLib.png';
 const [addLib,setAddLib]=useState(entry.isAdded==0?addLib1:addLib2);
// console.log("id is: ", id);
//console.log(entry);
const navigate=useNavigate();
 function handleClick()
  {
    //console.log("id is: ", id);
    setSdata(sdata.map((e)=>{
        if(entry.id==e.id)
        {
            return {...e, isAdded:!e.isAdded};
        }
        else return e;
    }))
    //console.log(sdata);
   if(addLib==addLib1) setAddLib(addLib2)
    else setAddLib(addLib1);

  } 

  function handleTileClick()
  {
    //console.log(entry.chNo);
     const str=`/story/${entry.id}/${entry.chNo}`;
     //console.log("path is: ", str);
     const newentry=entry;
    navigate(str,{state:{newentry}});
  }
 return (
    
    <div className='tile' >
            <img className='tileimg' src={path} alt="Tile" />  
      <div className="btn-ctn">    
        <Button variant="primary" style={{"height":"8vh","width":"50%"}} onClick={handleTileClick}>Start Reading</Button>
        <Button variant="primary" style={{"height":"8vh","width":"10vh"}}><img style={{"height":"6vh","width":"6vh","textAlign":"center","padding":"2px"}} src={`${addLib}`} onClick={handleClick}/></Button>
      </div>
    </div>
  )
}
