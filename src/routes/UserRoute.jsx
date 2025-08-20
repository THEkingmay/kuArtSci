import { Route } from "react-router-dom"
import UserHome from "../pages/user/Home"
import UserMember from "../pages/user/Member"
import ProtectUserRoute from "./ProtectUserRouter"

export default function UserRoutes(){
    return(
        <>
            <Route path="/" element={
                <ProtectUserRoute>
                     <UserHome/>
                </ProtectUserRoute>
                }/>
            <Route path="/member" element={
                <ProtectUserRoute>
                    <UserMember/>
                </ProtectUserRoute>
                }/>
            <Route path="/*" element={
                <ProtectUserRoute>
                    <UserHome/>
                </ProtectUserRoute>
                }/>
        </>
    )   
}