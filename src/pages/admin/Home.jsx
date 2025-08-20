import { useNavigate } from "react-router-dom"
import AdminNavbar from "../../components/admin/AdminNav"

export default function AdminHome(){
    const navigate = useNavigate()
    return(
        <>
        <AdminNavbar/>
        <div className="container mx-auto">
            <div className="text-center">
                หน้าจัดการกิจกรรมฝั่งแอดมิน
            </div>
        </div>
        </>
    )
}