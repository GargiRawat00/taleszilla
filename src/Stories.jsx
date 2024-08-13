



import React, { useEffect } from 'react'
//import data from './storiesData.json'
import Tile from './components/Tile';

export default function Stories({sdata,setSdata}) {
    //console.log(data);
    return (
    <div className='stories'>
      <h1 >Story time</h1>
      <div className="tiles">
        {/* {sdata.map((entry)=> <Tile  key={entry.id} id={entry.id} image={entry.title_img} title={entry.title} setLib={setLib} lib={lib} isAdded={entry.isAdded} sdata={sdata} setSdata={setSdata}/>)} */}
        {sdata.map((entry)=> <Tile  key={entry.id} entry={entry} sdata={sdata} setSdata={setSdata}/>)}
      </div>
    </div>
  )
}
