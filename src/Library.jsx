



import React, { useEffect } from 'react'
import Story from './components/Story';
//import data from './storiesData.json'
import Tile from './components/Tile';

export default function Stories({sdata,setSdata}) {
    //console.log(data);
    return (
    <div className='stories'>
      <h1>Your Library</h1>
      <div className="tiles">
        {sdata.map((e)=>{
            if(e.isAdded==true)
            {
                //console.log("yes");
                return (<Tile  key={e.id} entry={e} sdata={sdata} setSdata={setSdata}/>);
            }
        }
            )}
      </div>
    </div>
  )
}
