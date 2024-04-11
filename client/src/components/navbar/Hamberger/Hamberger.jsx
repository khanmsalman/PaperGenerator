import React, { useEffect } from 'react'
import './Hamberger.css'

export default function Hamberger({setOpenDrawer,drawerOpen}) {
useEffect(()=>{
  console.log(drawerOpen)
},[])
  const handleChange=()=>{
    if(drawerOpen){
      setOpenDrawer(false)
    }
    else{
      setOpenDrawer(true)
    }
  }
  return (
    <div  className='hamberger'>
      <input type="checkbox"   onChange={()=>handleChange()} id="checkbox"/>
    <label for="checkbox" class="toggle">
        <div class="bars" id="bar1"></div>
        <div class="bars" id="bar2"></div>
        <div class="bars" id="bar3"></div>
    </label>
    </div>
  )
}
