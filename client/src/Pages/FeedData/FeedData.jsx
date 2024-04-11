import { Button, Menu, MenuItem } from '@mui/material';
import React from 'react'
import { NavLink } from 'react-router-dom';
import './feeddata.css'
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const initial={
    x: '-50vw'
}
const animate={ 
    x: 0,
}


const FeedData = () => {
    const mode = useSelector(state => state.mode.mode)
    const user = JSON.parse(localStorage.getItem("user"));

    const feedLink = {
        color: mode === 'dark' ? '#fff' : "black",
        textDecoration: 'none',
        fontSize:"21px",
        width:"100%",
        height:"100%", 
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }
 
    return (
        <div className='feeddata' style={{background:mode==='light'?'#eef8ff':'#011b35'}}>

            <div className='question-link' >
                <p style={mode==='dark'?{color:'#ff37ff'}:{color:'#6900B0'}} className='text-3xl font-medium'>Add Paper Data</p>
                <motion.div initial={initial} animate={animate} transition={{delay:0.4,duration:0.2}} className="f-d-link" >
                    <NavLink to='/feedshortqtn' style={feedLink}>Feed Short Questions </NavLink>
                </motion.div>
                <motion.div initial={initial} animate={animate} transition={{delay:0.2,duration:0.2}} className="f-d-link" >
                    <NavLink to='/feedlongqtn' style={feedLink}>Feed Long Questions</NavLink>
                </motion.div>
                <motion.div initial={initial} animate={animate} transition={{duration:0.2}} className="f-d-link" >
                    <NavLink to='/feedmcqs' style={feedLink}>Feed Mcq's</NavLink>
             </motion.div> 
            </div>
   
            <div className="p-detail-links" >
                <p style={mode==='dark'?{color:'#ff37ff'}:{color:'#6900B0'}} className='text-3xl '>Add Paper Details</p>
                <motion.div initial={{x:'50vw'}}  aria-disabled={true} animate={{x:0}} transition={{duration:0.2, delay:0.4}} className="f-d-link shadow-2xl" >
                    {
                        user.isAdmin?<NavLink to='/addprogram' style={feedLink}>Add Program</NavLink>
                        : <div style={feedLink} className='relative !text-white rounded-xl bg-black/30'>Add Program<span className='absolute bottom-1 left-3 text-base text-gray-300'>Admin Access Only</span></div>
                    }
                </motion.div>
                <motion.div initial={{x:'50vw'}} animate={{x:0}} transition={{duration:0.2, delay:0.2}} className="f-d-link shadow-2xl" >
                    {
                        user.isAdmin?
                        <NavLink to='/addsemester' style={feedLink} >Add Semester</NavLink>
                        : <div style={feedLink} className='relative rounded-xl !text-white bg-black/30'>Add Program<span className='absolute bottom-1 left-3 text-base text-gray-300'>Admin Access Only</span></div>
                    }
                </motion.div>
                <motion.div initial={{x:'50vw'}} animate={{x:0}} transition={{duration:0.2}} className="f-d-link shadow-2xl" >
                    {
                        user.isAdmin?
                        <NavLink to='/addpaper' style={feedLink}>Add Paper</NavLink>
                        : <div style={feedLink} className='relative rounded-xl !text-white bg-black/30'>Add Program<span className='absolute bottom-1 left-3 text-base text-gray-300'>Admin Access Only</span></div>
                    }
                </motion.div>
            </div> 
        </div>
    )
}

export {FeedData}
 