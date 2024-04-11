import Navbar from '../components/navbar/Navbar'
import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedRoute() {
    const auth = localStorage.getItem("token");
  return (
   auth && auth !== null ?<> <Outlet/></> : <Navigate to='/login'/>
  )
}
