import styled from '@emotion/styled'
import './Navbar.css'
import { Button, Divider, Menu, MenuItem } from '@mui/material'

import { ArrowBackIosNewRounded, } from '@mui/icons-material'
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { HomeRounded, NoteAddRounded, InsertCommentRounded, FeedRounded, AddCircleRounded, LightModeRounded, FavoriteBorder, FavoriteIcon } from '@mui/icons-material'
import decode from "jwt-decode"

import React, { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { setMode } from '../../RTK/Slices/ModeSlice';
import toast from 'react-hot-toast';


export default function Navbar() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorEl2, setAnchorEl2] = useState(null);
    const [anchorEl3, setAnchorEl3] = useState(null);
    const open = Boolean(anchorEl);
    const open2 = Boolean(anchorEl2);
    const open3 = Boolean(anchorEl3)
    const [activeTab, setActiveTab] = useState('')
    const [dialogOpen, setDialogOpen] = useState(false)
    const [drawerOpen, setDrawerOpen] = useState(false);

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const token = localStorage.getItem("token")
    const user = JSON.parse(localStorage.getItem("user")) ?? { isAdmin: false }
    // const user = { token:"123456789", name:"salman",email:"hellosalman@gmail.com",isAdmin:true}
    const mode = useSelector(state => state.mode.mode);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/' && activeTab) {
            setActiveTab("Home")
        } else if (location.pathname === '/generate') {
            setActiveTab("Generate")
        } else if (location.pathname === '/allpapers') {
            setActiveTab('Allpapers')
        } else if (location.pathname === '/feeddata' || location.pathname === '/feedshortqtn' || location.pathname === '/feedlongqtn' || location.pathname === '/feedmcqs') {
            setActiveTab('feeddata')
        }
        //  else if (location.pathname === '/addprogram' || location.pathname === '/addsemester' || location.pathname === '/addpaper') {
        //     setActiveTab('details')
        // }
    }, [location])

    if (token) {
        const decodedToken = decode(token);
        if(decodedToken.exp*1000 < new Date().getTime()){
            localStorage.clear();
        }
    } 

    const handleClose = () => {
        setAnchorEl(null)
        setAnchorEl2(null)
        setAnchorEl3(null)
    }
    const handleMode = () => {
        dispatch(setMode())
    }

    const handleLogout = () => {
        localStorage.clear();
        toast(user.name + ' Logout Successfully');
        navigate('/login') 
    }
    return (
        <>
            <nav className='mynavbar' sx={mode === 'dark' ? { backgroundColor: '#001e3c', boxShadow: '0px 3px 15px white' } : { backgroundColor: '#fff' }} >
                <input type="checkbox" id="checkbox" />
                <label htmlFor="checkbox" className="toggle">
                    <div className="bars" id="bar1"></div>
                    <div className="bars" id="bar2"></div>
                    <div className="bars" id="bar3"></div>
                </label>
                <a href='/' className='h-full flex justify-start items-center'>
                    <p className='genLogo'>QPgenerator</p>
                </a>
                <div className='toolbar' style={mode === 'dark' ? { backgroundColor: '#001e3c', boxShadow: '0px 3px 15px white' } : { backgroundColor: '#fff' }}>
                    <div className='link-wrapper mr-4 '>
                        <NavLink style={{ color: "black", }} to='/'>
                            <p onClick={() => setActiveTab('Home')} className={activeTab === "Home" ? mode === 'dark' ? "active-dark" : "active-light" : 'link'} style={{ fontSize: '18px', color: mode === 'dark' ? '#fff' : 'black' }} > Home</p>
                            {/* <HomeRounded sx={{ marginRight: '-3px', marginBottom: '5px' }} /> */}
                        </NavLink>
                        <NavLink style={{ color: "black", }} to='/feeddata'>
                            <p onClick={() => setActiveTab('feeddata')} className={` ${activeTab === "feeddata" ? mode === 'dark' ? "active-dark" : "active-light" : 'link'}`} style={{ fontSize: '18px', color: mode === 'dark' ? '#fff' : 'black' }} >
                                 {/* <AddCircleRounded sx={{ marginRight: '-3px', marginBottom: '5px' }} /> */}
                             Feed Data</p>
                        </NavLink>
                        { 
                            token && (
                                <>
                                    <NavLink style={{ color: "black" }} to='/generate'>
                                        <p onClick={() => setActiveTab('Generate')} className={`${activeTab === "Generate" ? mode === 'dark' ? "active-dark" : "active-light" : 'link'}`} style={{ fontSize: '18px', color: mode === 'dark' ? '#fff' : 'black' }} >
                                            {/* <NoteAddRounded sx={{ marginRight: '-3px', marginBottom: '5px' }} /> */}
                                         Generate</p>
                                    </NavLink>
                                    {
                                        user?.superAdmin ?
                                            <NavLink style={{ color: "black" }} to='/dashboard'>
                                                <p onClick={() => setActiveTab('dashboard')} className={`${activeTab === "dashboard" ? mode === 'dark' ? "active-dark" : "active-light" : 'link'}`} style={{ fontSize: '18px', color: mode === 'dark' ? '#fff' : 'black' }} >
                                                    {/* <NoteAddRounded sx={{ marginRight: '-3px', marginBottom: '5px' }} /> */}
                                                     Dashboard</p>
                                            </NavLink>
                                            : ''
                                    }
                                    <NavLink style={{ color: "black", }} to='/allpapers'>
                                        <p onClick={() => setActiveTab('Allpapers')} className={`${activeTab === "Allpapers" ? mode === 'dark' ? "active-dark" : "active-light" : 'link'}`} style={{ fontSize: '18px', color: mode === 'dark' ? '#fff' : 'black' }} > 
                                        {/* <FeedRounded sx={{ marginRight: '-3px', marginBottom: '5px' }} />  */}
                                        All Papers</p>
                                    </NavLink>

                                </>

                            )
                        }
                    </div> {/* Link wrapper ends */}

                    <div className="register" >
                        <div >
                            <div className="toggle-theme cursor-pointer" onClick={() => handleMode()} >
                                {mode === 'dark' ? <LightModeRounded sx={{ color: '#ffffc3', position: 'absolute', margin: 'auto', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} /> : <DarkModeIcon sx={{ color: '#820092', position: 'absolute', margin: 'auto', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />}
                            </div>
                            <div className="res-mode" style={{ color: mode === 'dark' ? '#fff' : 'black' }}>Mode</div>
                        </div>

                        {token && token !== null ? 
                            <div className='username '>
                                <p title="Click to LogOut" onClick={(e) => { setAnchorEl3(e.currentTarget) }} aria-controls={open3 ? 'logout' : undefined} aria-haspopup='true' aria-expanded={open3 ? 'true' : undefined} style={{ height: "100%", textShadow: '5px 5px 10px #dc7dffa1', color: mode === 'dark' ? '#fff' : 'black', fontFamily: 'Poppins,cursive' }} className=' cursor-pointer inline-block hover:!bg-transparent'>Hi, {user.name}! </p>
                                <Menu id='logout' anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} transformOrigin={{ vertical: 'top', horizontal: 'right' }} anchorEl={anchorEl3} open={open3} MenuListProps={{ 'aria-labelledby': 'resources-button' }} onClose={handleClose} >
                                    <MenuItem onClick={() => { handleClose(); handleLogout(); }}>Logout</MenuItem>
                                </Menu>
                            </div>
                            :
                            <>
                                <NavLink style={{ background: mode === 'dark' ? '#8a00e7' : '#6900B0' }} className='login' to='/login' >Login</NavLink>
                                <NavLink style={{ background: mode === 'dark' ? '#8a00e7' : '#6900B0' }} className='signup' to='/signup' >Signup</NavLink>
                            </>
                        }
                    </div>
                </div> {/* toolbar class ends  */}
            </nav>
        </>
    )
}

