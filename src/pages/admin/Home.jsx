import { useNavigate } from "react-router-dom"
import AdminNavbar from "../../components/admin/AdminNav"

export default function AdminHome(){
    const navigate = useNavigate()
    return(
        <>
        <AdminNavbar/>
        <div className="container mx-auto mt-6">
            <div className="text-center text-2xl font-bold underline">
                หน้าจัดการกิจกรรมฝั่งแอดมิน
            </div>
        </div>
        </>
    )
}