import { useState } from "react";
import pb from "../lib/pocketbase";

export default function useLogout(){
  
    const [dummy, setDummy]  = useState(0)

    function logout (){
        console.log("lllllllllllllll");
        
        pb?.authStore?.clear()
        setDummy(Math.random())
    }

    return logout
}