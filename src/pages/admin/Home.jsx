import { useNavigate } from "react-router-dom"
import AdminNavbar from "../../components/AdminNav"

export default function AdminHome(){
    const navigate = useNavigate()
    return(
        <div>
            <AdminNavbar/>
            <div className="text-center">
                หน้าจัดการกิจกรรมฝั่งแอดมิน
            </div>
        </div>
    )
}