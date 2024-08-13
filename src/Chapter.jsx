import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import './App.css'
import { Alert, Button } from 'react-bootstrap';
import AlertDismissibleExample from './components/DismissableAlert';
export default function Chapter({sdata,setSdata}) {
    const x=useParams();
    const id=x.id;
    const ch=x.ch;
    const location = useLocation();
    //console.log("location", location);
    const entry = location.state.newentry;
    //const entry=entry1[0];
     //console.log("entry1", entry1);
     //console.log("entry", entry);
    const chapterTxtURL=`${entry.base_url}/chapters/ch${entry.chNo}.txt`;
    const chapterImgURL=`${entry.base_url}/images/ch${entry.chNo}.png`;
    const [text,setText]=useState('');
    const [curr,setcurr]=useState(false);
    const navigate=useNavigate();
    //console.log(ch);
    //console.log(entry);
    function handlePrev()
    {
        const num=Number(ch)-1;
       
        if(num>0)
            {
                const str=`/story/${entry.id}/${num}`;
                const newdata=sdata.map((ele)=> ele.id==entry.id?{...ele, chNo: num}:ele);
                setSdata(newdata);
                //console.log('sdata is: ',sdata); 
                const nextentry=newdata.filter((ele)=>ele.id==entry.id);
                const newentry=nextentry[0];
                navigate(str,{state:{newentry}});
            }
            else
            {
                navigate('/stories');
            }
    }
    function handleNext()
    {
        const num=Number(ch)+1;
        if((Number(ch)+1)<=entry.chapters.length)
        {
            const str=`/story/${entry.id}/${num}`;
            const newdata=sdata.map((ele)=> ele.id==entry.id?{...ele, chNo: num}:ele);
            setSdata(newdata);
            //console.log('sdata is: ',sdata); 
            const nextentry=newdata.filter((ele)=>ele.id==entry.id);
            //console.log("new data is: ",newdata);
           
            const newentry=nextentry[0];
            //console.log("new entry is: ",newentry);
            navigate(str,{state:{newentry}});
        }
        else
        {
            setcurr(true);
        }
    }
  fetch(chapterTxtURL)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(data => {
      setText(data);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    })
    return (
    <div className='chapter'>
      <h1>Chapter- {ch}</h1>
      <h2>{entry.chapters[(Number(entry.chNo)-1)].chapter_name}</h2>
      <img src={chapterImgURL} alt="" className='chapterImg'/>
      <br/>
      <pre className={`chapterTxt josefin-sans-font`}>{text}</pre>
      <AlertDismissibleExample setcurr={setcurr} curr={curr} heading='Chapter under Progress' msg='Hey Champ! Glad that you have come this far. 
      We are working on this chapter and it will be updated soon'/>
      <div className="chBtns">
      <Button variant="primary" size="lg" className='chbtn' onClick={handlePrev}>
          Prev
        </Button>
        <Button variant="primary" size="lg" className='chbtn' onClick={handleNext}>
          Next
        </Button>
      </div>
    </div>
  )
}
