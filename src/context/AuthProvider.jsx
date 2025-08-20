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

    const login = async () =>{
        // login here
        setUser({gmail : 'test.com' , role : 'admin'})

        // จัดเก็บ token JWT ด้วย
    }

    const logout = async () =>{
        setUser(null)
        localStorage.removeItem(token)
    }

    if(loading)return (<LoadingPage/>)    

    return(
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
export function useAuth(){
    return useContext(AuthContext)
}
