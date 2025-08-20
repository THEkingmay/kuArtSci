import AdminNavbar from "../../components/admin/AdminNav"


export default function AdminMember(){
    return(
    <>
        <AdminNavbar/>
        <div className="container mx-auto p-5">
            <div className="text-center">
                หน้าจัดการการสมัครเข้าร่วมสมาคมศิษย์เก่า
            </div>
            <div>
                รายการการสมัคร
            </div>
        </div>
    </>
    )
}