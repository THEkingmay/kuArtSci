import { createContext , useContext, useEffect, useState } from "react";
import LoadingPage from "../components/LoadingPage";

const AuthContext = createContext()
const API_URL = import.meta.env.VITE_API_URL;


export default function AuthContextProvider({children}){
    const [user , setUser ] = useState(null)
    const [loading , setLoad] = useState(true)
    useEffect( ()=>{
        const loginToken = async ()=>{
                //โหลดข้อมูลผู้ใช้ครั้งแรก
                // เอา token ไปตรวจสอบ
                const token = localStorage.getItem('token')
                if(!token){
                    setLoad(false)
                    throw new Error('ไม่มี token')
                } 
                try{
                    const res = await fetch(`${API_URL}/user/signinWithToken` ,{
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",   // แนะนำให้ใส่
                            Authorization: `Bearer ${token}` // ดึง token จาก localStorage
                        }
                    })
                    const data = await res.json()
                    console.log(data)
                    if(!res.ok) throw new Error(data.message)
                    setUser(data.user)
                }catch(err){
                    console.log(err)
                }finally{
                    setLoad(false)
                }
        }

        loginToken()
    },[])

    const login = async (email, password) => {
        try {
            const res = await fetch(`${API_URL}/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            console.log(data)
            if (!res.ok) throw new Error(data.message);
            // จัดเก็บ JWT และ payload
            localStorage.setItem('token', data.token);
            setUser(data.payload);

        } catch (err) {
            console.error(err);
            throw new Error(err.message || 'เกิดข้อผิดพลาด');
        }
        };

    const logout = async () =>{
        setUser(null)
        if(localStorage.getItem('token')) localStorage.removeItem('token')
    }

    const resetPassword = async (email) =>{

    }

    if(loading)return (<LoadingPage/>)    

    return(
        <AuthContext.Provider value={{ user, login, logout , resetPassword , API_URL}}>
            {children}
        </AuthContext.Provider>
    )
}
export function useAuth(){
    return useContext(AuthContext)
}
