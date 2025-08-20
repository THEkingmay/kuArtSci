import { createContext , useContext, useEffect, useState } from "react";

const AuthContext = createContext()

export default function AuthContextProvider({children}){
    const [user , setUser ] = useState(null)
    const [loading , setLoad] = useState(false)
    useEffect(()=>{
        //โหลดข้อมูลผู้ใช้ครั้งแรก
        setLoad(true)
        setTimeout(()=>{

            setLoad(false)
        },[2000])
    },[])

    const login = async () =>{
        setUser({gmail : 'test.com' , role : 'admin'})
    }

    const logout = async () =>{
        setUser(null)
    }

    if(loading)return (<div>กำลังโหลด ...  </div>)    

    return(
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
export function useAuth(){
    return useContext(AuthContext)
}
