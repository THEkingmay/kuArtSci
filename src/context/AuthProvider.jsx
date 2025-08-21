import { createContext , useContext, useEffect, useState } from "react";
import LoadingPage from "../components/LoadingPage";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext()

export default function AuthContextProvider({children}){
    const [user , setUser ] = useState(null)
    const [loading , setLoad] = useState(false)
    useEffect(()=>{
        //โหลดข้อมูลผู้ใช้ครั้งแรก
        // เอา token ไปตรวจสอบ
    },[])

    const login = async (email , password) =>{
        // login here
        // จัดเก็บ token JWT ด้วย
    }

    const logout = async () =>{
        setUser(null)
        // localStorage.removeItem(token)
    }

    const resetPassword = async (email) =>{

    }

    if(loading)return (<LoadingPage/>)    

    return(
        <AuthContext.Provider value={{ user, login, logout , resetPassword }}>
            {children}
        </AuthContext.Provider>
    )
}
export function useAuth(){
    return useContext(AuthContext)
}
