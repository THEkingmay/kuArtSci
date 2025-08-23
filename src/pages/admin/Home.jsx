import { useNavigate } from "react-router-dom"
import AdminNavbar from "../../components/admin/AdminNav"

export default function AdminHome(){
    const navigate = useNavigate()
    return(
        <>
        <AdminNavbar/>
        <div className="container mx-auto mt-6">
             <div className="text-3xl  text-center underline text-gray-800 mb-6">
                หน้าจัดการกิจกรรมข่าวสาร
                </div>
        </div>
        </>
    )
}