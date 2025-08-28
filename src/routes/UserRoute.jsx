import { Route } from "react-router-dom"
import UserMember from "../pages/user/Member"
import ProtectUserRoute from "./ProtectUserRouter"

export default function UserRoutes(){
    return(
        <>
            <Route path="/" element={
                <ProtectUserRoute>
                     <UserMember/>
                </ProtectUserRoute>
                }/>
            <Route path="/member" element={
                <ProtectUserRoute>
                    <UserMember/>
                </ProtectUserRoute>
                }/>
            <Route path="/*" element={
                <ProtectUserRoute>
                    <UserMember/>
                </ProtectUserRoute>
                }/>
        </>
    )   
}