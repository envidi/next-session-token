"use client";

import { useEffect, useState } from "react";
import { sessionToken } from "@/lib/http";
import accountApiRequest from "../ApiRequest/account";

function Profile() {
  
  const [user, setUser] = useState<any>({
    name : '',
    email : ''
  })
  const [isClient, setIsClient] = useState(false);
  useEffect(()=>{
    const fetchRequest =async ()=>{
      try {
        const result = await accountApiRequest.meClient()
        setUser(result.payload.data)
      } catch (error:any) {
        throw new Error(error)
      }
    }
    fetchRequest()
  },[sessionToken])
  return <ul>
    <li><h1>Profile Page</h1></li>
    <li>session token : {sessionToken.value}</li>
    <li>name : {user?.name ||''}</li>
    <li>email : {user?.email ||''}</li>
  </ul>;
}

export default Profile;
