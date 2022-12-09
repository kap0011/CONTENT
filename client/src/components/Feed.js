import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Discovery from "./Discovery";
import Upload from "./Upload";
import Home from "./Home";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Feed() {
  const [showfield, setShowfield] = useState("discovery");

  const [user, setUser] = useState({firstName: '', lastName: '', bio: '', contactNo: '',});
  const getUserData = async () => {
    try{
        const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/user`);
        setUser(res.data.user);
    }catch(err){
        toast.error(err.response?.data.message || "Server Down!");
    }
  }

  useEffect(()=>{
    getUserData();
  },[]);

return (
    <>
      <ToastContainer />
      <Navbar showfield={showfield} setShowfield={setShowfield}/>
      {showfield==="discovery" && <Discovery user={user}/>}
      {showfield==="upload" && <Upload  user={user}/>}
      {showfield==="home" && <Home  user={user}/>}
    </>
  );
}

export default Feed;
