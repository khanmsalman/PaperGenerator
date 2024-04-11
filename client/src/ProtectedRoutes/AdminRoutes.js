import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

export default function AdminRoutes() {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"))
    
  return (
      token && token !==null && user.isAdmin ? <Outlet/> : <Navigate replace to='/' />
  )
}
