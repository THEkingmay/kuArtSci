import { Route } from "react-router-dom";
import ProtectAdminRoute from "./ProtectAdminRoute";
import AdminHome from "../pages/admin/Home";
import AdminMember from "../pages/admin/Member";

export default function AdminRoute(){
    return(
        <>
            <Route path="/admin" element={
                 <ProtectAdminRoute>
                        <AdminHome/>
                    </ProtectAdminRoute>
            }/>
             <Route path="/admin/member" element={
                    <ProtectAdminRoute>
                        <AdminMember/>
                    </ProtectAdminRoute>
             }/>
            <Route path="/admin/*" element={
                 <ProtectAdminRoute>
                        <AdminHome/>
                    </ProtectAdminRoute>
            }/>
    
            
        </>
    )
}