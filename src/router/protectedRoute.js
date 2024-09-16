import { Outlet, Navigate } from "react-router-dom";
import { supabase } from "../client";
import { useEffect, useState } from "react";

const ProtectedRoutes = () => {
  const [session, setSession] = useState(true);
  useEffect(() => {
    
  },[]);


  if(session !== null){
    console.log('in session')
    console.log(session)
    return <Outlet/> 
  }else{
    console.log(session)
    return <Navigate to="/login" />
  }
};

export default ProtectedRoutes;
