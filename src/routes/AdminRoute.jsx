import { Route } from "react-router-dom";
import ProtectAdminRoute from "./ProtectAdminRoute";
import AdminMember from "../pages/admin/Member";

export default function AdminRoute(){
    return(
        <>
            <Route path="/admin" element={
                 <ProtectAdminRoute>
                        <AdminMember/>
                    </ProtectAdminRoute>
            }/>
             <Route path="/admin/member" element={
                    <ProtectAdminRoute>
                        <AdminMember/>
                    </ProtectAdminRoute>
             }/>
            <Route path="/admin/*" element={
                 <ProtectAdminRoute>
                        <AdminMember/>
                    </ProtectAdminRoute>
            }/>
    
            
        </>
    )
}