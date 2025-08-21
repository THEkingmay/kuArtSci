import AdminNavbar from "../../components/admin/AdminNav"


export default function AdminMember(){
    return(
    <>
        <AdminNavbar/>
        <div className="container mx-auto px-5 mt-6">
            <div className="text-2xl font-bold underline text-center ">
                หน้าจัดการการสมัครเข้าร่วมสมาคมศิษย์เก่า
            </div>
            <div>
                รายการการสมัคร
            </div>
        </div>
    </>
    )
}