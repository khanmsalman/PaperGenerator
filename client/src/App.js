import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
// import {toast} from 'react-toastify';
// import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, FeedLongQtn, FeedShortQtn, FeedMcqs, Footer, FullPaper2 } from "./components";
import { Home, FeedData, AddPaper, AddProgram, AddSemester, GeneratePaper, Login, Signup, AllPapers, FullPaper } from './Pages'

import ProtectedRoute from "./ProtectedRoutes/ProtectedRoute";
import AdminRoutes from "./ProtectedRoutes/AdminRoutes";
import Register from "./Pages/Accounts/Register";
import Dashboard from "./Pages/Dashboard/Dashboard";
import AddUserSubjects from "./components/AddUserSubjects";
import { setLoginUser } from "./RTK/Slices/AuthSlice";
import { useEffect } from "react";

export default function App() {
  const mode = useSelector((state) => state.mode.mode);
  const dispatch = useDispatch();

  
  useEffect(()=>{
    const token = localStorage.getItem("token")
    const user = JSON.parse(localStorage.getItem("user"))
    dispatch(setLoginUser({token,user}))
  },[])

  return (
    <>
      <div
        style={{
          backgroundColor: mode === "light" ? "white" : "#001e3c",
          color: mode === "light" ? "black" : "white",
        }}
      >
        <Toaster />
        <Navbar />
        {/* <ToastContainer/> */}
        <Routes>
          <Route path="/login" element={<Register />} />
          <Route path="/signup" element={<Register />} />
          <Route index element={<Home />} />
          {/* protected routes */}
          <Route path="/" element={<ProtectedRoute />}>
            <Route path="/generate" element={<GeneratePaper />} />
            <Route path="/allpapers" element={<AllPapers />} />
            <Route path="/feeddata" element={<FeedData />} />

            <Route path="/addprogram" element={<AddProgram />} />
            <Route path="/addsemester" element={<AddSemester />} />
            <Route path="/addpaper" element={<AddPaper />} />
            {/* Admin Protected Routes  */}
 
            <Route path="/feedshortqtn" element={<FeedShortQtn />} />
            <Route path="/feedlongqtn" element={<FeedLongQtn />} />
            <Route path="/feedmcqs" element={<FeedMcqs />} />
            <Route path="/fullpaper/:id" element={<FullPaper />} />
            <Route path="/fullpaper2/:id" element={<FullPaper2 />} />
            <Route element={<AdminRoutes />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/addusersubjects/:id" element={<AddUserSubjects/>} />
            </Route>
          </Route>
        </Routes>
      </div>
      <Footer />
    </>
  );
}
